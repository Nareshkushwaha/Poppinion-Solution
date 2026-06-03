import { motion } from "framer-motion";
import { testimonials, stats, faqs, portfolio } from "@/lib/site-data";
import { Star, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react"; // useEffect add kiya
import { API_BASE_URL } from "@/config"; // LIVE READY URL add kiya

export function Testimonials() {
  return (
    <section className="bg-gradient-soft py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="text-3xl font-bold text-navy md:text-5xl">Founders love working with us</h2>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="mb-3 flex gap-1 text-accent-orange">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <img src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-gradient-brand p-8 text-white shadow-glow md:grid-cols-4 md:p-12">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="text-4xl font-bold md:text-5xl">{s.value}{s.suffix}</div>
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const items = [
    { title: "Senior-only team", desc: "No junior account managers. You work with operators who've scaled brands." },
    { title: "Performance obsessed", desc: "Every decision is measured. We optimize for outcomes, not vanity metrics." },
    { title: "Full-stack capability", desc: "Strategy, creative, code, and ads — under one roof." },
    { title: "Weekly cadence", desc: "Weekly reviews, monthly strategy sessions, transparent reporting." },
    { title: "Speed of execution", desc: "Most campaigns ship in 2 weeks. We move at startup speed." },
    { title: "Long-term partner", desc: "We're builders. We stick around to compound results." },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Why Poppinion</p>
          <h2 className="text-3xl font-bold text-navy md:text-5xl">Built different. On purpose.</h2>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><Check className="h-5 w-5" /></div>
              <h3 className="text-lg font-bold text-navy">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="text-3xl font-bold text-navy md:text-5xl">Questions, answered.</h2>
        </motion.div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-white">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="font-semibold text-navy">{f.q}</span>
                <span className={`grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary transition ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// YAHAN SE CHANGE KIYA HAI: Dynamic Portfolio Preview (Sirf published, chote boxes)
export function PortfolioPreview() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio`);
        const data = await res.json();
        if (data.success) {
          const published = data.data.filter((p: any) => p.status === 'published');
          // Home page par max 8 projects dikhayenge
          setProjects(published.slice(0, 8)); 
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      }
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null; // Agar project nahi hai toh section hide rahega

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Portfolio</p>
            <h2 className="text-2xl font-bold text-navy md:text-3xl">Recent projects</h2>
          </div>
          <Link to="/portfolio" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        
        {/* Naye chote boxes: grid-cols-2 aur md:grid-cols-4 */}
        <div className="mt-10 grid gap-4 grid-cols-2 md:grid-cols-4">
          {projects.map((p, i) => (
            <motion.div key={p.slug || p.id} initial={{ opacity: 0, scale: 0.9, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
              <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-elegant relative aspect-square">
                {p.coverImage ? (
                  <img src={p.coverImage} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                ) : (
                  <div className="size-full bg-gradient-to-br from-primary/20 to-primary/5" />
                )}
                
                {/* Hover Text Animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
                  <span className="mb-2 inline-block rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary w-max">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-white text-sm sm:text-base line-clamp-1">{p.name}</h3>
                  <p className="mt-1 text-xs text-white/80 truncate">{p.client}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}