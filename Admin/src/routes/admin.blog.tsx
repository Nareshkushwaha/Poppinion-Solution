import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, Copy } from "lucide-react";
import { useAdminStore, type BlogPost, newId, nowIso } from "@/lib/admin-store";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ListEditor } from "./admin.services";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-store";
import { API_BASE_URL } from "@/config";

export const Route = createFileRoute("/admin/blog")({
  head: () => ({ meta: [{ title: "Blog — Poppinion Admin" }] }),
  component: BlogPage,
});

const empty = (): BlogPost => ({
  id: newId(), title: "", slug: "", category: "", tags: [],
  featuredImage: "", content: "",
  metaTitle: "", metaDescription: "", keywords: "",
  status: "draft", createdAt: nowIso(),
});

function BlogPage() {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [preview, setPreview] = useState<BlogPost | null>(null);
  const [dbBlogs, setDbBlogs] = useState<BlogPost[]>([]);
  
  // Naya: Store se token direct nikala taaki hamesha fresh rahe
  const { token } = useAuth(); 

  const fetchBlogs = async () => {
    if (!token) return; // Agar token nahi hai toh api call mat karo

    try {
      const res = await fetch(`${API_BASE_URL}/blogs`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        const formattedData = data.data.map((item: any) => ({
          ...item,
          tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags || [],
        }));
        setDbBlogs(formattedData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]); // Jab bhi token aaye, data le aao

  const handleSaveToDatabase = async (blogData: BlogPost, isDraft: boolean) => {
    if (!token) return;
    try {
      const isExisting = dbBlogs.some(b => b.id === blogData.id);
      const url = isExisting ? `${API_BASE_URL}/blogs/${blogData.id}` : `${API_BASE_URL}/blogs`;
      const method = isExisting ? 'PUT' : 'POST';

      const finalStatus = isDraft ? "draft" : blogData.status;

      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          title: blogData.title,
          slug: blogData.slug,
          category: blogData.category,
          tags: blogData.tags,
          featuredImage: blogData.featuredImage,
          content: blogData.content,
          metaTitle: blogData.metaTitle,
          metaDescription: blogData.metaDescription,
          keywords: blogData.keywords,
          status: finalStatus
        })
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setEditing(null);
        fetchBlogs();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Blog delete ho gaya! 🗑️");
        fetchBlogs();
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  const handleDuplicate = async (b: BlogPost) => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const duplicatedBlog = {
        ...b,
        id: newId(),
        title: b.title + " (Copy)",
        slug: b.slug + "-copy-" + randomString,
        status: "draft" as "draft",
        createdAt: nowIso()
    };
    await handleSaveToDatabase(duplicatedBlog, true);
  };

  const togglePublishStatus = async (b: BlogPost) => {
    const newStatus = b.status === "published" ? "draft" : "published";
    await handleSaveToDatabase({ ...b, status: newStatus }, false);
  };

  return (
    <div>
      <PageHeader
        title="Blog Management"
        description="Write and publish blog posts with a full rich text editor."
        action={<Button onClick={() => setEditing(empty())} className="gradient-brand text-white border-0"><Plus className="size-4 mr-2" /> New Post</Button>}
      />

      <div className="grid gap-3">
        {dbBlogs.map((b) => (
          <Card key={b.id} className="p-4 flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-32 aspect-video shrink-0 rounded-lg overflow-hidden bg-muted">
              {b.featuredImage ? <img src={b.featuredImage} alt={b.title} className="size-full object-cover" /> : <div className="size-full gradient-brand opacity-80" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{b.title || "Untitled"}</h3>
                  <p className="text-sm text-muted-foreground">{b.category} {b.tags.length > 0 && `· ${b.tags.join(", ")}`}</p>
                </div>
                <Badge variant={b.status === "published" ? "default" : "secondary"}>{b.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                <Button size="sm" variant="outline" onClick={() => setEditing(b)}><Pencil className="size-3.5 mr-1" /> Edit</Button>
                <Button size="sm" variant="outline" onClick={() => setPreview(b)}><Eye className="size-3.5 mr-1" /> Preview</Button>
                <Button size="sm" variant="outline" onClick={() => handleDuplicate(b)}><Copy className="size-3.5 mr-1" /> Duplicate</Button>
                <Button size="sm" variant="outline" onClick={() => togglePublishStatus(b)}>
                  {b.status === "published" ? "Unpublish" : "Publish"}
                </Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => handleDelete(b.id)}><Trash2 className="size-3.5" /></Button>
              </div>
            </div>
          </Card>
        ))}
        {dbBlogs.length === 0 && <Card className="p-12 text-center"><p className="text-muted-foreground">No posts yet.</p></Card>}
      </div>

      {editing && <BlogForm value={editing} onClose={() => setEditing(null)} onSave={handleSaveToDatabase} />}
      
      {preview && (
        <Dialog open onOpenChange={() => setPreview(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{preview.title}</DialogTitle></DialogHeader>
            {preview.featuredImage && <img src={preview.featuredImage} className="w-full aspect-video object-cover rounded-lg mb-4" />}
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: preview.content }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function BlogForm({ value, onClose, onSave }: { value: BlogPost; onClose: () => void; onSave: (v: BlogPost, asDraft: boolean) => void }) {
  const [v, setV] = useState(value);
  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{value.title ? "Edit Post" : "New Post"}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value, slug: v.slug || slugify(e.target.value) })} />
            </div>
            <div className="space-y-2"><Label>Slug</Label><Input value={v.slug} onChange={(e) => setV({ ...v, slug: e.target.value })} /></div>
            <div className="space-y-2"><Label>Category</Label><Input value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={v.status} onValueChange={(x: "published" | "draft") => setV({ ...v, status: x })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="draft">Draft</SelectItem><SelectItem value="published">Published</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <ListEditor label="Tags" values={v.tags} onChange={(x) => setV({ ...v, tags: x })} />
          <ImageUpload value={v.featuredImage} onChange={(x) => setV({ ...v, featuredImage: x })} label="Featured Image" />
          <div className="space-y-2">
            <Label>Content (Rich Text)</Label>
            <RichTextEditor value={v.content} onChange={(c) => setV({ ...v, content: c })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="space-y-2"><Label>Meta Title</Label><Input value={v.metaTitle} onChange={(e) => setV({ ...v, metaTitle: e.target.value })} /></div>
            <div className="space-y-2"><Label>Keywords</Label><Input value={v.keywords} onChange={(e) => setV({ ...v, keywords: e.target.value })} /></div>
          </div>
          <div className="space-y-2"><Label>Meta Description</Label><Input value={v.metaDescription} onChange={(e) => setV({ ...v, metaDescription: e.target.value })} /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={() => onSave(v, true)}>Save Draft</Button>
          <Button className="gradient-brand text-white border-0" onClick={() => onSave({ ...v, status: "published" }, false)}>Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}