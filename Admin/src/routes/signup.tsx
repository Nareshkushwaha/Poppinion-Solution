import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Setup Admin — Poppinion Solutions" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { login, isAuthed } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Security Check: Kya pehle se admin hai?
  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/check-admins`);
        const data = await res.json();
        
        if (data.success && data.exists) {
          // Agar pehle se admin hai, toh signup block karo aur login par bhejo
          toast.info("Admin account already exists. Please login.");
          navigate({ to: "/login", replace: true });
        } else {
          setChecking(false);
        }
      } catch (error) {
        setChecking(false);
      }
    };

    if (isAuthed) {
      navigate({ to: "/admin", replace: true });
    } else {
      checkSetup();
    }
  }, [isAuthed, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success("Account created successfully!");
        login(data.token); 
        navigate({ to: "/admin" });
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <div className="min-h-screen flex items-center justify-center bg-surface"><Loader2 className="size-8 animate-spin text-primary" /></div>;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="size-9 rounded-lg gradient-brand grid place-items-center text-white font-bold">P</div>
            <span className="font-semibold">Poppinion Admin</span>
          </div>
          <h2 className="text-2xl font-bold">First-time Setup</h2>
          <p className="text-sm text-muted-foreground mt-1">Create the master admin account for your website</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="confirm" type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="pl-9" />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 gradient-brand text-white border-0 mt-6">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <><span className="mr-2">Complete Setup</span> <ArrowRight className="size-4" /></>}
            </Button>
          </form>

        </motion.div>
      </div>

      <div className="hidden lg:flex relative overflow-hidden gradient-brand text-white p-12 flex-col justify-between order-1 lg:order-2">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-white/20 backdrop-blur grid place-items-center font-bold text-xl">P</div>
          <span className="text-lg font-semibold">Poppinion Solutions</span>
        </div>
        <div>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Welcome to your new digital headquarters.
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            This is a one-time setup to secure your admin panel. Ensure you use a strong password.
          </p>
        </div>
        <div className="text-sm text-white/60">© 2026 Poppinion Solutions</div>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
}