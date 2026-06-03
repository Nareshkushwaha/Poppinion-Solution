import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-store";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create Account — Poppinion Admin" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    login(form.email);
    toast.success("Account created");
    navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      <div className="flex items-center justify-center p-6 sm:p-12 order-2 lg:order-1">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="size-9 rounded-lg gradient-brand grid place-items-center text-white font-bold">P</div>
            <span className="font-semibold">Poppinion Admin</span>
          </div>
          <h2 className="text-2xl font-bold">Create account</h2>
          <p className="text-sm text-muted-foreground mt-1">Join the Poppinion admin team</p>

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
            <Button type="submit" className="w-full h-11 gradient-brand text-white border-0">
              Create Account <ArrowRight className="size-4 ml-2" />
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-brand font-medium hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex relative overflow-hidden gradient-brand text-white p-12 flex-col justify-between order-1 lg:order-2">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-white/20 backdrop-blur grid place-items-center font-bold text-xl">P</div>
          <span className="text-lg font-semibold">Poppinion Solutions</span>
        </div>
        <div>
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Join the team behind the website.
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Get full access to manage content, leads, and brand assets.
          </p>
        </div>
        <div className="text-sm text-white/60">© 2026 Poppinion Solutions</div>
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  );
}
