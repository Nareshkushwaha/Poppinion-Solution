import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "Profile — Poppinion Admin" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    bio: "",
    photo: ""
  });

  // FETCH PROFILE DATA FROM DATABASE
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profile');
      const data = await res.json();
      if (data.success && data.data) {
        setV({
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || "",
          designation: data.data.designation || "",
          bio: data.data.bio || "",
          photo: data.data.photo || ""
        });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    }
  };

  // Run only once when the page loads
  useEffect(() => {
    fetchProfile();
  }, []);

  // SAVE PROFILE TO DATABASE
  const save = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v)
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server connect nahi ho raha.");
    }
  };

  return (
    <div>
      <PageHeader title="Profile Settings" description="Manage your admin profile."
        action={<Button onClick={save} className="gradient-brand text-white border-0"><Save className="size-4 mr-2" /> Save Profile</Button>}
      />
      <Card className="p-6 max-w-3xl space-y-4">
        <ImageUpload label="Profile Photo" value={v.photo} onChange={(x) => setV({ ...v, photo: x })} />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-2"><Label>Name</Label><Input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} /></div>
          <div className="space-y-2"><Label>Email</Label><Input value={v.email} onChange={(e) => setV({ ...v, email: e.target.value })} /></div>
          <div className="space-y-2"><Label>Phone</Label><Input value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} /></div>
          <div className="space-y-2"><Label>Designation</Label><Input value={v.designation} onChange={(e) => setV({ ...v, designation: e.target.value })} /></div>
        </div>
        <div className="space-y-2"><Label>Bio</Label><Textarea rows={4} value={v.bio} onChange={(e) => setV({ ...v, bio: e.target.value })} /></div>
      </Card>
    </div>
  );
}