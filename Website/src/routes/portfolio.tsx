import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export const Route = createFileRoute("/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — Poppinion Solutions" }, { name: "description", content: "Selected work and case studies." }] }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filter, setFilter] = useState("All");

  // Database se data laane ka logic
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/portfolio`);
        const data = await res.json();
        if (data.success) {
          const published = data.data.filter((p: any) => p.status === 'published');
          setProjects(published);
          // Unique categories nikalna
          const cats = ["All", ...Array.from(new Set(published.map((p: any) => p.category)))];
          setCategories(cats as string[]);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio", error);
      }
    };
    fetchProjects();
  }, []);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* CUSTOM HERO WITH BACKGROUND IMAGE */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border">
        <div className="absolute inset-0 z-0">
          {/* IMAGE FIX: 'public/' hata diya hai, sirf '/' lagaya hai */}
          <img src="/uploads/portfolio-bg.jpg" alt="Portfolio Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Portfolio</p>
          
          {/* HEADING FIX: Text chota kiya (text-3xl md:text-4xl) aur Har Word ka First Letter Capital kiya */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-navy md:text-4xl capitalize">
            Work We're <span className="text-gradient-brand">Proud Of</span>.
          </motion.h1>
          
          {/* SUBHEADING FIX: Text size chota kiya */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-sm md:text-base text-muted-foreground capitalize">
            Brands We've Helped Scale, Launch, And Reinvent.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`rounded-full px-4 py-1.5 text-xs font-medium transition capitalize ${filter === c ? "bg-gradient-brand text-white shadow-elegant" : "border border-input bg-white text-navy hover:bg-secondary"}`}>
                {c}
              </button>
            ))}
          </div>

          {/* CHOTE BOXES */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((p, i) => (
              <motion.div key={p.slug || p.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block overflow-hidden rounded-xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.coverImage} alt={p.name || p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary capitalize">{p.category}</span>
                  </div>
                  <div className="p-3">
                    {/* TITLE aur CLIENT mein bhi capitalize laga diya */}
                    <h3 className="text-xs font-bold text-navy line-clamp-1 capitalize">{p.name || p.title}</h3>
                    <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1 capitalize">{p.client}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-10">No projects found in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}