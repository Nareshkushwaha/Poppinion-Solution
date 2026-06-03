import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Briefcase, Clock, GraduationCap, Coffee, Globe, Heart, Sparkles, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — Poppinion Solutions" }, { name: "description", content: "Build the future of digital growth with us." }] }),
  component: CareersPage,
});

const why = [
  { Icon: GraduationCap, title: "Learning Culture", desc: "Quarterly stipend for courses, books, and conferences." },
  { Icon: Globe, title: "Remote Friendly", desc: "Work from anywhere, sync in the office when it matters." },
  { Icon: Coffee, title: "Flexible Hours", desc: "Outcomes over hours. We trust grown-ups to manage time." },
  { Icon: Sparkles, title: "Modern Stack", desc: "Latest tools, premium hardware, zero red tape." },
];

const benefits = [
  "Performance Bonuses",
  "Paid Training & Courses",
  "Premium Health Insurance",
  "Annual Team Retreats",
  "MacBook + Setup Budget",
  "Career Growth Path",
];

export function CareersPage() {
  const [jobsList, setJobsList] = useState<any[]>([]);

  // Database se Jobs fetch karne ka logic
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/careers`);
        const data = await res.json();
        if (data.success) {
          // Sirf published jobs dikhayenge
          const published = data.data.filter((j: any) => j.status === 'published');
          setJobsList(published);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <>
      {/* 1. CUSTOM HERO WITH BACKGROUND IMAGE */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border">
        <div className="absolute inset-0 z-0">
          {/* Ye image tumhare public/uploads folder se aayegi */}
          <img src="/uploads/careers-bg.jpg" alt="Careers Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Careers</p>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-navy md:text-5xl capitalize leading-tight">
            Join <span className="text-gradient-brand">Poppinion</span>.<br className="hidden md:block" /> Build The Future Of Growth.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-sm md:text-base text-muted-foreground capitalize max-w-2xl mx-auto">
            We're A Senior Team Shipping Premium Work For Ambitious Brands. Come Build With Us.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
            <a href="#openings" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5">
              View Open Positions <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY JOIN US (Blue Hover Animation) */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-navy md:text-3xl capitalize">A Place To Do Your Best Work</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w, i) => (
              <motion.div 
                key={w.title} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }} 
                className="group rounded-2xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md cursor-pointer"
              >
                {/* Hover par Icon background blue aur text white hoga */}
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <w.Icon className="h-5 w-5" />
                </div>
                {/* Hover par Title blue hoga */}
                <h3 className="mt-4 text-sm font-bold text-navy transition-colors duration-300 group-hover:text-primary">{w.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENEFITS (Fixed Alignment and Image Size) */}
      <section className="bg-white py-16 md:py-24 border-y border-border">
        {/* items-center class lagayi hai taaki text aur image ki height match kare */}
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Benefits</p>
            <h2 className="text-2xl font-bold text-navy md:text-3xl capitalize">Real Perks. Zero Fluff.</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-2 text-xs font-medium text-navy/80 group">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Heart className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative mx-auto w-full max-w-sm order-1 md:order-2">
            <div className="absolute -inset-2 -z-10 rounded-2xl bg-gradient-brand opacity-20 blur-xl" />
            {/* Image size ko chota (aspect-square) aur center kiya hai */}
            <img src="/uploads/benefits.jpg" alt="Team Benefits" className="aspect-square w-full rounded-2xl object-cover shadow-elegant border border-border bg-slate-50 p-1" />
          </motion.div>
        </div>
      </section>

      {/* 4. DYNAMIC OPEN POSITIONS */}
      <section id="openings" className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Open Positions</p>
            <h2 className="text-2xl font-bold text-navy md:text-3xl capitalize">We're Hiring</h2>
          </div>
          
          <div className="space-y-4">
            {jobsList.map((j, i) => (
              <motion.div 
                key={j.slug || j.id} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.05 }} 
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border bg-white p-5 shadow-sm transition hover:border-primary hover:shadow-md"
              >
                <div>
                  <h3 className="text-base font-bold text-navy group-hover:text-primary transition-colors">{j.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-medium text-muted-foreground">
                    <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded"><Briefcase className="h-3 w-3" /> {j.department}</span>
                    <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded"><MapPin className="h-3 w-3" /> {j.location}</span>
                    <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded"><Clock className="h-3 w-3" /> {j.type}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">{j.experience}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-xs text-muted-foreground line-clamp-2">{j.description}</p>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2 text-xs font-semibold text-white shadow-sm transition group-hover:bg-primary shrink-0 w-max mt-2 md:mt-0">
                  Apply Now <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            ))}

            {jobsList.length === 0 && (
              <div className="text-center bg-white border border-border rounded-xl p-10">
                <p className="text-muted-foreground">No open positions right now, but we are always looking for great talent!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-brand p-10 text-center text-white shadow-glow mx-6">
          <h3 className="text-2xl font-bold md:text-3xl">Don't see your role?</h3>
          <p className="mt-2 text-white/80 text-sm">Send us a note — we love meeting great people.</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:scale-105 transition-transform">Get in touch</Link>
        </div>
      </section>
    </>
  );
}