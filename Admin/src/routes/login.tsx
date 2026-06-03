import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth-store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Poppinion Admin" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { login, isAuthed } = useAuth();
  const [email, setEmail] = useState("admin@poppinion.com");
  const [password, setPassword] = useState("password");

  useEffect(() => {
    if (isAuthed) navigate({ to: "/admin" });
  }, [isAuthed, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <div className="hidden lg:flex relative overflow-hidden gradient-brand text-white p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-white/20 backdrop-blur grid place-items-center font-bold text-xl">P</div>
          <span className="text-lg font-semibold">Poppinion Solutions</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
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
            <Button type="submit" className="w-full h-11 gradient-brand text-white border-0">
              Sign In <ArrowRight className="size-4 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-brand font-medium hover:underline">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
