import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config";
import { useAuth } from "@/lib/auth-store"; 

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "Profile — Poppinion Admin" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { userEmail, token } = useAuth(); // Token bhi nikala
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [v, setV] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    bio: "",
    photo: ""
  });

  // 1. DATABASE SE DATA MANGWANA (Token de kar)
  const fetchProfile = async () => {
    if (!token) {
        setFetching(false);
        return;
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/admin/profile`, {
          headers: {
            // NAYA: Token bhej rahe hain taaki backend ko pata chale kaun hai
            'Authorization': `Bearer ${token}` 
          }
      });
      const data = await res.json();
      
      if (data.success && data.data) {
        setV({
          name: data.data.name || "",
          email: data.data.email || userEmail, // Login wala email dikhayenge
          phone: data.data.phone || "",
          designation: data.data.designation || "",
          bio: data.data.bio || "",
          photo: data.data.photo || ""
        });
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]); // Token aane pe update

  // 2. CHANGES KO DATABASE MEIN SAVE KARNA
  const save = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/admin/profile`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Token zaroori hai update karne ke liye
        },
        body: JSON.stringify({
            name: v.name,
            phone: v.phone,
            designation: v.designation,
            bio: v.bio,
            photo: v.photo
        }) 
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Backend server se connect nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-brand size-8" /></div>;

  return (
    <div>
      <PageHeader title="Profile Settings" description="Manage your admin profile."
        action={
          <Button onClick={save} disabled={loading} className="gradient-brand text-white border-0">
            {loading ? <Loader2 className="size-4 mr-2 animate-spin" /> : <Save className="size-4 mr-2" />} 
            Save Profile
          </Button>
        }
      />
      <Card className="p-6 max-w-3xl space-y-4">
        <ImageUpload label="Profile Photo" value={v.photo} onChange={(x) => setV({ ...v, photo: x })} />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={v.email} disabled className="bg-muted cursor-not-allowed" title="Email cannot be changed" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={v.phone} onChange={(e) => setV({ ...v, phone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Designation</Label>
            <Input value={v.designation} onChange={(e) => setV({ ...v, designation: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Bio</Label>
          <Textarea rows={4} value={v.bio} onChange={(e) => setV({ ...v, bio: e.target.value })} />
        </div>
      </Card>
    </div>
  );
}