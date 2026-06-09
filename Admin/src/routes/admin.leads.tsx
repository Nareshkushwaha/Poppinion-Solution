import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Eye, Trash2, Download, Search, Mail, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-store";
import { API_BASE_URL } from "@/config";

export interface DBLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: string;
}

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads — Poppinion Admin" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [view, setView] = useState<DBLead | null>(null);
  const [dbLeads, setDbLeads] = useState<DBLead[]>([]);
  
  const { token } = useAuth(); // NAYA: Store se token nikala

  // FETCH LEADS FROM DATABASE
  const fetchLeads = async () => {
    if (!token) return; // Agar token nahi hai toh API call mat karo
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setDbLeads(data.data);
      }
    } catch (error) {
      console.error("Fetch leads error:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [token]); // Token aate hi fetch karega

  const filtered = dbLeads.filter(l => {
    const m = !query || [l.name, l.email, l.phone, l.service].some(x => x?.toLowerCase().includes(query.toLowerCase()));
    const f = filter === "all" || l.status === filter;
    return m && f;
  });

  // UPDATE STATUS LOGIC
  const updateStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (data.success) {
        fetchLeads(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  // DELETE LEAD LOGIC
  const handleDelete = async (id: string) => {
    if (!token || !confirm("Delete this lead?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/leads/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Deleted");
        fetchLeads(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // EXPORT CSV LOGIC
  const exportCsv = () => {
    if(filtered.length === 0) {
        toast.error("No leads to export");
        return;
    }
    const rows = [
      ["Name", "Email", "Phone", "Service", "Message", "Status", "Date"],
      ...filtered.map(l => [l.name, l.email, l.phone, l.service, l.message, l.status, l.createdAt]),
    ];
    const csv = rows.map(r => r.map(x => `"${String(x || '').replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  return (
    <div>
      <PageHeader
        title="Leads"
        description="Inquiries received from the website contact form."
        action={<Button variant="outline" onClick={exportCsv}><Download className="size-4 mr-2" /> Export CSV</Button>}
      />

      <Card className="p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(l => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.name}</TableCell>
                  <TableCell>{l.email}</TableCell>
                  <TableCell>{l.phone}</TableCell>
                  <TableCell>{l.service}</TableCell>
                  <TableCell>{l.createdAt ? format(new Date(l.createdAt), "MMM d, yyyy") : "N/A"}</TableCell>
                  <TableCell>
                    <Badge className={l.status === "new" ? "bg-brand-accent text-white" : l.status === "replied" ? "bg-emerald-600 text-white" : ""}>
                      {l.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="icon" variant="ghost" onClick={() => { setView(l); if (l.status === "new") updateStatus(l.id, "read"); }}><Eye className="size-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { updateStatus(l.id, "read"); toast.success("Marked read"); }}><CheckCheck className="size-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { updateStatus(l.id, "replied"); toast.success("Marked replied"); }}><Mail className="size-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(l.id)}><Trash2 className="size-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No leads found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {view && (
        <Dialog open onOpenChange={() => setView(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle>{view.name}</DialogTitle></DialogHeader>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Email:</span> {view.email}</p>
              <p><span className="text-muted-foreground">Phone:</span> {view.phone}</p>
              <p><span className="text-muted-foreground">Service:</span> {view.service}</p>
              <p><span className="text-muted-foreground">Date:</span> {view.createdAt ? format(new Date(view.createdAt), "PPP p") : "N/A"}</p>
              <div className="pt-2">
                <p className="text-muted-foreground mb-1">Message:</p>
                <p className="p-3 bg-muted rounded-lg whitespace-pre-wrap">{view.message}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}