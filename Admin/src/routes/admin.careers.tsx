import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Copy } from "lucide-react";
import { useAdminStore, type Job, newId, nowIso } from "@/lib/admin-store";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ListEditor } from "./admin.services";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/careers")({
  head: () => ({ meta: [{ title: "Careers — Poppinion Admin" }] }),
  component: CareersPage,
});

const empty = (): Job => ({
  id: newId(), title: "", department: "", location: "", employmentType: "Full-time",
  experience: "", salary: "", shortDescription: "", fullDescription: "",
  responsibilities: [], requirements: [], benefits: [],
  applicationEmail: "careers@poppinion.com", featuredImage: "",
  status: "draft", createdAt: nowIso(),
});

function CareersPage() {
  const [editing, setEditing] = useState<Job | null>(null);
  const [preview, setPreview] = useState<Job | null>(null);
  const [dbJobs, setDbJobs] = useState<Job[]>([]);

  // FETCH JOBS FROM DATABASE
  const fetchJobs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/careers');
      const data = await res.json();
      if (data.success) {
        const formattedData = data.data.map((item: any) => ({
          ...item,
          responsibilities: typeof item.responsibilities === 'string' ? JSON.parse(item.responsibilities) : item.responsibilities || [],
          requirements: typeof item.requirements === 'string' ? JSON.parse(item.requirements) : item.requirements || [],
          benefits: typeof item.benefits === 'string' ? JSON.parse(item.benefits) : item.benefits || [],
        }));
        setDbJobs(formattedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // SAVE OR UPDATE JOB IN DATABASE
  const handleSaveToDatabase = async (jobData: Job) => {
    try {
      const isExisting = dbJobs.some(j => j.id === jobData.id);
      const url = isExisting ? `http://localhost:5000/api/careers/${jobData.id}` : 'http://localhost:5000/api/careers';
      const method = isExisting ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData)
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setEditing(null);
        fetchJobs();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server connect nahi ho raha yr.");
    }
  };

  // DELETE JOB FUNCTION
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/careers/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        toast.success("Job delete ho gayi! 🗑️");
        fetchJobs();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  // DUPLICATE JOB FUNCTION
  const handleDuplicate = async (j: Job) => {
    const duplicatedJob = {
        ...j,
        id: newId(),
        title: j.title + " (Copy)",
        status: "draft" as "draft",
        createdAt: nowIso()
    };
    await handleSaveToDatabase(duplicatedJob);
  };

  // QUICK TOGGLE PUBLISH/UNPUBLISH
  const togglePublishStatus = async (j: Job) => {
    const newStatus = j.status === "published" ? "draft" : "published";
    await handleSaveToDatabase({ ...j, status: newStatus });
  };

  return (
    <div>
      <PageHeader
        title="Career Management"
        description="Post and manage job openings shown on the Careers page."
        action={<Button onClick={() => setEditing(empty())} className="gradient-brand text-white border-0"><Plus className="size-4 mr-2" /> Add Job</Button>}
      />

      <div className="grid gap-3">
        {dbJobs.map((j) => (
          <Card key={j.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{j.title}</h3>
                  <Badge variant={j.status === "published" ? "default" : "secondary"}>{j.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {j.department} · {j.location} · {j.employmentType} · {j.experience}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{j.shortDescription}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                <Button size="sm" variant="outline" onClick={() => setEditing(j)}><Pencil className="size-3.5 mr-1" /> Edit</Button>
                <Button size="sm" variant="outline" onClick={() => setPreview(j)}><Eye className="size-3.5 mr-1" /> Preview</Button>
                <Button size="sm" variant="outline" onClick={() => handleDuplicate(j)}><Copy className="size-3.5" /></Button>
                <Button size="sm" variant="outline" onClick={() => togglePublishStatus(j)}>
                  {j.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(j.id)}><Trash2 className="size-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
        {dbJobs.length === 0 && <Card className="p-12 text-center"><p className="text-muted-foreground">No jobs posted yet.</p></Card>}
      </div>

      {editing && <JobForm value={editing} onClose={() => setEditing(null)} onSave={handleSaveToDatabase} />}
      {preview && (
        <Dialog open onOpenChange={() => setPreview(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{preview.title}</DialogTitle></DialogHeader>
            <p className="text-sm text-muted-foreground">{preview.department} · {preview.location} · {preview.employmentType}</p>
            <p className="whitespace-pre-wrap">{preview.fullDescription}</p>
            {preview.responsibilities.length > 0 && <div><h4 className="font-semibold mt-2">Responsibilities</h4><ul className="list-disc pl-5">{preview.responsibilities.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
            {preview.requirements.length > 0 && <div><h4 className="font-semibold mt-2">Requirements</h4><ul className="list-disc pl-5">{preview.requirements.map((r, i) => <li key={i}>{r}</li>)}</ul></div>}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function JobForm({ value, onClose, onSave }: { value: Job; onClose: () => void; onSave: (v: Job) => void }) {
  const [v, setV] = useState(value);
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{value.title ? "Edit Job" : "New Job"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Job Title</Label><Input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} /></div>
            <div className="space-y-2"><Label>Department</Label><Input value={v.department} onChange={(e) => setV({ ...v, department: e.target.value })} /></div>
            <div className="space-y-2"><Label>Location</Label><Input value={v.location} onChange={(e) => setV({ ...v, location: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Employment Type</Label>
              <Select value={v.employmentType} onValueChange={(x) => setV({ ...v, employmentType: x })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Full-time", "Part-time", "Contract", "Internship", "Freelance"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><Label>Experience</Label><Input value={v.experience} onChange={(e) => setV({ ...v, experience: e.target.value })} /></div>
            <div className="space-y-2"><Label>Salary</Label><Input value={v.salary} onChange={(e) => setV({ ...v, salary: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Short Description</Label><Textarea rows={2} value={v.shortDescription} onChange={(e) => setV({ ...v, shortDescription: e.target.value })} /></div>
          <div className="space-y-2"><Label>Full Description</Label><Textarea rows={5} value={v.fullDescription} onChange={(e) => setV({ ...v, fullDescription: e.target.value })} /></div>
          <ListEditor label="Responsibilities" values={v.responsibilities} onChange={(x) => setV({ ...v, responsibilities: x })} />
          <ListEditor label="Requirements" values={v.requirements} onChange={(x) => setV({ ...v, requirements: x })} />
          <ListEditor label="Benefits" values={v.benefits} onChange={(x) => setV({ ...v, benefits: x })} />
          <div className="space-y-2"><Label>Application Email</Label><Input type="email" value={v.applicationEmail} onChange={(e) => setV({ ...v, applicationEmail: e.target.value })} /></div>
          <ImageUpload value={v.featuredImage} onChange={(x) => setV({ ...v, featuredImage: x })} label="Featured Image (Optional)" />
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={v.status} onValueChange={(x: "published" | "draft") => setV({ ...v, status: x })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="gradient-brand text-white border-0" onClick={() => onSave(v)}>Save Job</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}