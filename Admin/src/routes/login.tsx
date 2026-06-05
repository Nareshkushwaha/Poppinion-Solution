import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Poppinion Admin" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login, isAuthed } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Security Check: Kya database mein koi admin hai?
  useEffect(() => {
    const checkSetup = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/check-admins`);
        const data = await res.json();
        
        if (data.success && !data.exists) {
          // Agar koi admin nahi hai, toh setup (signup) par bhejo
          toast.info("Welcome! Please create the first admin account.");
          navigate({ to: "/signup", replace: true });
        } else {
          setChecking(false);
        }
      } catch (error) {
        setChecking(false); // Error aaye toh form dikha do
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
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        toast.success("Login Successful!");
        login(data.token); 
        navigate({ to: "/admin" });
      } else {
        toast.error(data.message || "Invalid credentials");
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
      <div className="hidden lg:flex relative overflow-hidden gradient-brand text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-white/20 backdrop-blur grid place-items-center font-bold text-xl">P</div>
          <span className="text-lg font-semibold">Poppinion Solutions</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Manage your entire digital presence from one place.
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Premium admin experience for the Poppinion website. Control content, leads, and SEO with confidence.
          </p>
        </motion.div>
        <div className="text-sm text-white/60">© 2026 Poppinion Solutions</div>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-20 -left-20 size-80 rounded-full bg-brand-accent/30 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="size-9 rounded-lg gradient-brand grid place-items-center text-white font-bold">P</div>
            <span className="font-semibold">Poppinion Admin</span>
          </div>
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your admin account</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox /> Remember me
              </label>
              <button type="button" className="text-sm text-brand hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 gradient-brand text-white border-0">
              {loading ? <Loader2 className="size-4 animate-spin" /> : <><span className="mr-2">Sign In</span> <ArrowRight className="size-4" /></>}
            </Button>
          </form>

        </motion.div>
      </div>
    </div>
  );
}