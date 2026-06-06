import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Copy, ArrowUp, ArrowDown } from "lucide-react";
import { useAdminStore, type Project, newId, nowIso } from "@/lib/admin-store";
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
import { toast } from "sonner";
import { RichTextEditor } from "@/components/admin/RichTextEditor"; 
import { useAuth } from "@/lib/auth-store"; // NAYA: Token laane ke liye

export const Route = createFileRoute("/admin/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — Poppinion Admin" }] }),
  component: PortfolioPage,
});

const empty = (): Project => ({
  id: newId(), name: "", slug: "", category: "", client: "",
  shortDescription: "", caseStudy: "", coverImage: "", galleryImages: [],
  results: "", seoTitle: "", seoDescription: "", status: "draft", order: 0, createdAt: nowIso(),
});

function PortfolioPage() {
  const [editing, setEditing] = useState<Project | null>(null);
  const [preview, setPreview] = useState<Project | null>(null); 
  
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  
  const { token } = useAuth(); // NAYA: Store se token nikala

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/portfolio'); // Public API
      const data = await res.json();
      if (data.success) {
        const formattedData = data.data.map((item: any) => ({
          ...item,
          order: item.projectOrder,
          galleryImages: typeof item.galleryImages === 'string' ? JSON.parse(item.galleryImages) : item.galleryImages || [],
        }));
        setDbProjects(formattedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const sorted = [...dbProjects].sort((a, b) => a.order - b.order);

  const move = (id: string, dir: -1 | 1) => {
    toast.info("Reordering abhi database ke liye setup karni baaki hai.");
  };

  const handleSaveToDatabase = async (projectData: Project) => {
    if (!token) {
        toast.error("Bhai pehle login toh karo!");
        return;
    }

    try {
      const isExistingProject = dbProjects.some(p => p.id === projectData.id);
      
      const url = isExistingProject 
        ? `http://localhost:5000/api/portfolio/${projectData.id}` 
        : 'http://localhost:5000/api/portfolio';
      
      const method = isExistingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // NAYA: Backend ko chaabi (Token) di
        },
        body: JSON.stringify({
          name: projectData.name,
          slug: projectData.slug,
          category: projectData.category,
          client: projectData.client,
          shortDescription: projectData.shortDescription,
          caseStudy: projectData.caseStudy,
          coverImage: projectData.coverImage,
          galleryImages: projectData.galleryImages,
          results: projectData.results,
          seoTitle: projectData.seoTitle,
          seoDescription: projectData.seoDescription,
          status: projectData.status,
          order: projectData.order
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setEditing(null);
        fetchProjects(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  const handleDuplicate = async (p: Project) => {
      const randomString = Math.random().toString(36).substring(2, 7); 
      const duplicatedProject = {
          ...p,
          id: newId(), 
          name: p.name + " (Copy)",
          slug: p.slug + "-copy-" + randomString, 
          status: "draft" as "draft", 
          order: dbProjects.length,
          createdAt: nowIso()
      };
      
      await handleSaveToDatabase(duplicatedProject);
  };

  const handleDelete = async (id: string) => {
    if (!token) return toast.error("Please login!");
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // NAYA: Backend ko chaabi di
        }
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success("Project delete ho gaya! 🗑️");
        fetchProjects(); 
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };


  return (
    <div>
      <PageHeader
        title="Portfolio"
        description="Manage portfolio projects displayed on your website."
        action={<Button onClick={() => setEditing({ ...empty(), order: dbProjects.length })} className="gradient-brand text-white border-0"><Plus className="size-4 mr-2" /> Add Project</Button>}
      />

      <div className="grid gap-4">
        {sorted.map((p, i) => (
          <Card key={p.id || i} className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-40 aspect-video shrink-0 bg-muted rounded-lg overflow-hidden">
              {p.coverImage ? <img src={p.coverImage} alt={p.name} className="size-full object-cover" /> : <div className="size-full gradient-brand opacity-80" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="text-sm text-muted-foreground">{p.client} · {p.category}</p>
                </div>
                <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{p.shortDescription}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                <Button size="sm" variant="outline" onClick={() => move(p.id, -1)} disabled={i === 0}><ArrowUp className="size-3.5" /></Button>
                <Button size="sm" variant="outline" onClick={() => move(p.id, 1)} disabled={i === sorted.length - 1}><ArrowDown className="size-3.5" /></Button>
                <Button size="sm" variant="outline" onClick={() => setEditing(p)}><Pencil className="size-3.5 mr-1" /> Edit</Button>
                <Button size="sm" variant="outline" onClick={() => handleDuplicate(p)}><Copy className="size-3.5 mr-1" /> Duplicate</Button>
                <Button size="sm" variant="outline" onClick={() => setPreview(p)}><Eye className="size-3.5 mr-1" /> Preview</Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 className="size-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
        {sorted.length === 0 && <Card className="p-12 text-center"><p className="text-muted-foreground">No projects yet.</p></Card>}
      </div>

      {editing && <ProjectForm value={editing} onClose={() => setEditing(null)} onSave={handleSaveToDatabase} />}
      {preview && <PreviewDialog project={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}

function ProjectForm({ value, onClose, onSave }: { value: Project; onClose: () => void; onSave: (v: Project) => void }) {
  const [v, setV] = useState(value);
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{value.name ? "Edit Project" : "New Project"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value, slug: v.slug || slugify(e.target.value) })} />
            </div>
            <div className="space-y-2"><Label>Slug</Label><Input value={v.slug} onChange={(e) => setV({ ...v, slug: e.target.value })} /></div>
            <div className="space-y-2"><Label>Category</Label><Input value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })} /></div>
            <div className="space-y-2"><Label>Client</Label><Input value={v.client} onChange={(e) => setV({ ...v, client: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Short Description</Label><Textarea rows={2} value={v.shortDescription} onChange={(e) => setV({ ...v, shortDescription: e.target.value })} /></div>
          
          <div className="space-y-2"><Label>Full Case Study</Label>
            <RichTextEditor value={v.caseStudy} onChange={(val) => setV({ ...v, caseStudy: val })} />
          </div>
          
          <ImageUpload value={v.coverImage} onChange={(x) => setV({ ...v, coverImage: x })} label="Cover Image" />
          <div className="space-y-2"><Label>Gallery Images</Label><MultiImageUpload values={v.galleryImages} onChange={(x) => setV({ ...v, galleryImages: x })} /></div>
          <div className="space-y-2"><Label>Project Results</Label><Textarea rows={3} value={v.results} onChange={(e) => setV({ ...v, results: e.target.value })} /></div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2"><Label>SEO Title</Label><Input value={v.seoTitle} onChange={(e) => setV({ ...v, seoTitle: e.target.value })} /></div>
            <div className="space-y-2"><Label>SEO Description</Label><Input value={v.seoDescription} onChange={(e) => setV({ ...v, seoDescription: e.target.value })} /></div>
          </div>
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
          <Button className="gradient-brand text-white border-0" onClick={() => onSave(v)}>Save Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PreviewDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Preview: {project.name}</DialogTitle></DialogHeader>
        
        {project.coverImage && <img src={project.coverImage} alt="" className="w-full rounded-lg aspect-video object-cover mb-4" />}
        <div className="flex gap-2 mb-4">
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline">Client: {project.client}</Badge>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
        <p className="text-muted-foreground text-lg mb-6">{project.shortDescription}</p>
        
        <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Case Study</h3>
            <div className="whitespace-pre-wrap prose max-w-none" dangerouslySetInnerHTML={{ __html: project.caseStudy }} />
        </div>

        {project.results && (
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Results</h3>
                <p className="whitespace-pre-wrap">{project.results}</p>
            </div>
        )}

      </DialogContent>
    </Dialog>
  );
}