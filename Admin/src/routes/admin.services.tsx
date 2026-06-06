import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react"; 
import { Plus, Pencil, Trash2, Eye, Copy, Search } from "lucide-react";
import { useAdminStore, type Service, newId, nowIso } from "@/lib/admin-store";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload, MultiImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor"; 
import { toast } from "sonner";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/config";
import { useAuth } from "@/lib/auth-store"; // NAYA: Token laane ke liye

export const Route = createFileRoute("/admin/services")({
  head: () => ({ meta: [{ title: "Services — Poppinion Admin" }] }),
  component: ServicesPage,
});

const empty = (): Service => ({
  id: newId(), title: "", slug: "", shortDescription: "", fullDescription: "",
  featuredImage: "", galleryImages: [], benefits: [], features: [], faq: [],
  seoTitle: "", seoDescription: "", seoKeywords: "", status: "draft", createdAt: nowIso(),
});

function ServicesPage() {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Service | null>(null);
  const [preview, setPreview] = useState<Service | null>(null);
  const [dbServices, setDbServices] = useState<Service[]>([]);
  
  const { token } = useAuth(); // NAYA: Token nikala

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`); // Public hai, token nahi chahiye
      const data = await res.json();
      if (data.success) {
        const formattedData = data.data.map((item: any) => ({
          ...item,
          galleryImages: typeof item.galleryImages === 'string' ? JSON.parse(item.galleryImages) : item.galleryImages || [],
          benefits: typeof item.benefits === 'string' ? JSON.parse(item.benefits) : item.benefits || [],
          features: typeof item.features === 'string' ? JSON.parse(item.features) : item.features || [],
          faq: typeof item.faq === 'string' ? JSON.parse(item.faq) : item.faq || [],
        }));
        setDbServices(formattedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = dbServices.filter(s => s.title.toLowerCase().includes(query.toLowerCase()));

  const handleSaveToDatabase = async (serviceData: Service) => {
    if (!token) {
        toast.error("Please login to save!");
        return;
    }
    
    try {
      const isExistingService = dbServices.some(s => s.id === serviceData.id);
      const url = isExistingService ? `${API_BASE_URL}/services/${serviceData.id}` : `${API_BASE_URL}/services`;
      const method = isExistingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // NAYA: Backend ko chaabi di
        },
        body: JSON.stringify(serviceData) // Direct bhej sakte ho agar format theek hai
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEditing(null); 
        fetchServices(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server se connect nahi ho pa raha yr!");
    }
  };

  const handleDuplicate = async (s: Service) => {
      const randomString = Math.random().toString(36).substring(2, 7); 
      const duplicatedService = {
          ...s,
          id: newId(), 
          title: s.title + " (Copy)",
          slug: s.slug + "-copy-" + randomString, 
          status: "draft" as "draft", 
          createdAt: nowIso()
      };
      await handleSaveToDatabase(duplicatedService);
  };

  const handleDelete = async (id: string) => {
    if (!token) return toast.error("Please login!");
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/services/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // NAYA: Backend ko chaabi di
        }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Service delete ho gayi! 🗑️");
        fetchServices(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

// ... BAAKI KA CODE WAHI RAHEGA (Render function wagera)
  return (
    <div>
      <PageHeader
        title="Services"
        description="Manage all services displayed on your website."
        action={<Button onClick={() => setEditing(empty())} className="gradient-brand text-white border-0"><Plus className="size-4 mr-2" /> Add Service</Button>}
      />

      <div className="mb-4 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input placeholder="Search services..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s, i) => (
          <motion.div key={s.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <Card className="overflow-hidden hover:shadow-lg transition">
              <div className="aspect-video bg-muted relative">
                {s.featuredImage ? (
                  <img src={s.featuredImage} alt={s.title} className="size-full object-cover" />
                ) : (
                  <div className="size-full gradient-brand opacity-90" />
                )}
                <Badge className="absolute top-3 right-3" variant={s.status === "published" ? "default" : "secondary"}>
                  {s.status}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{s.title || "Untitled"}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{s.shortDescription}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  <Button size="sm" variant="outline" onClick={() => setEditing(s)}><Pencil className="size-3.5" /></Button>
                  <Button size="sm" variant="outline" onClick={() => setPreview(s)}><Eye className="size-3.5" /></Button>
                  <Button size="sm" variant="outline" onClick={() => handleDuplicate(s)}><Copy className="size-3.5" /></Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(s.id)}><Trash2 className="size-3.5" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <Card className="p-12 text-center sm:col-span-2 lg:col-span-3">
            <p className="text-muted-foreground">Koi service nahi mili. Click "Add Service" to create one.</p>
          </Card>
        )}
      </div>

      {editing && <ServiceForm value={editing} onClose={() => setEditing(null)} onSave={handleSaveToDatabase} />}
      {preview && <PreviewDialog service={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

// ... FaqEditor, ListEditor aur baaki component aise hi rahenge jo tumne diye hain ...
function ServiceForm({ value, onClose, onSave }: { value: Service; onClose: () => void; onSave: (s: Service) => void }) {
  const [v, setV] = useState(value);
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{value.title ? "Edit Service" : "New Service"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value, slug: v.slug || slugify(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={v.slug} onChange={(e) => setV({ ...v, slug: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Short Description</Label>
            <Textarea rows={2} value={v.shortDescription} onChange={(e) => setV({ ...v, shortDescription: e.target.value })} />
          </div>
          
          <div className="space-y-2">
            <Label>Full Description</Label>
            <RichTextEditor value={v.fullDescription} onChange={(val) => setV({ ...v, fullDescription: val })} />
          </div>

          <ImageUpload value={v.featuredImage} onChange={(x) => setV({ ...v, featuredImage: x })} label="Featured Image" />
          <div className="space-y-2">
            <Label>Gallery Images</Label>
            <MultiImageUpload values={v.galleryImages} onChange={(x) => setV({ ...v, galleryImages: x })} />
          </div>
          <ListEditor label="Benefits" values={v.benefits} onChange={(x) => setV({ ...v, benefits: x })} />
          <ListEditor label="Features" values={v.features} onChange={(x) => setV({ ...v, features: x })} />
          <FaqEditor values={v.faq} onChange={(x) => setV({ ...v, faq: x })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>SEO Title</Label>
              <Input value={v.seoTitle} onChange={(e) => setV({ ...v, seoTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>SEO Keywords</Label>
              <Input value={v.seoKeywords} onChange={(e) => setV({ ...v, seoKeywords: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>SEO Description</Label>
            <Textarea rows={2} value={v.seoDescription} onChange={(e) => setV({ ...v, seoDescription: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={v.status} onValueChange={(x: "published" | "draft") => setV({ ...v, status: x })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="gradient-brand text-white border-0" onClick={() => onSave(v)}>Save Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ListEditor({ label, values, onChange }: { label: string; values: string[]; onChange: (x: string[]) => void }) {
  const [draft, setDraft] = useState("");
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={`Add ${label.toLowerCase()}`} onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); if (draft.trim()) { onChange([...values, draft.trim()]); setDraft(""); } }
        }} />
        <Button type="button" variant="outline" onClick={() => { if (draft.trim()) { onChange([...values, draft.trim()]); setDraft(""); } }}>Add</Button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((v, i) => (
            <Badge key={i} variant="secondary" className="gap-2 pl-3 pr-1 py-1">
              {v}
              <button onClick={() => onChange(values.filter((_, idx) => idx !== i))} className="ml-1 hover:text-destructive">×</button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function FaqEditor({ values, onChange }: { values: { q: string; a: string }[]; onChange: (x: { q: string; a: string }[]) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>FAQ</Label>
        <Button type="button" size="sm" variant="outline" onClick={() => onChange([...values, { q: "", a: "" }])}>
          <Plus className="size-3.5 mr-1" /> Add FAQ
        </Button>
      </div>
      <div className="space-y-3">
        {values.map((f, i) => (
          <div key={i} className="p-3 border rounded-lg space-y-2 bg-muted/30">
            <Input placeholder="Question" value={f.q} onChange={(e) => onChange(values.map((x, idx) => idx === i ? { ...x, q: e.target.value } : x))} />
            <Textarea placeholder="Answer" rows={2} value={f.a} onChange={(e) => onChange(values.map((x, idx) => idx === i ? { ...x, a: e.target.value } : x))} />
            <Button type="button" size="sm" variant="ghost" className="text-destructive" onClick={() => onChange(values.filter((_, idx) => idx !== i))}>Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewDialog({ service, onClose }: { service: Service; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Preview</DialogTitle></DialogHeader>
        {service.featuredImage && <img src={service.featuredImage} alt="" className="w-full rounded-lg aspect-video object-cover" />}
        <h2 className="text-2xl font-bold">{service.title}</h2>
        <p className="text-muted-foreground">{service.shortDescription}</p>
        <div className="whitespace-pre-wrap prose" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
        {service.benefits.length > 0 && (
          <div><h4 className="font-semibold mb-2">Benefits</h4><ul className="list-disc pl-5">{service.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
        )}
      </DialogContent>
    </Dialog>
  );
}