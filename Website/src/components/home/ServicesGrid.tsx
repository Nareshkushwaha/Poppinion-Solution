import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layout } from "lucide-react"; // Default icon 'Layout' import kiya
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export function ServicesGrid() {
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        if (data.success) {
          // Sirf wahi services dikhani hain jo "published" hain
          const published = data.data.filter((s: any) => s.status === 'published');
          // Home page par limit laga sakte ho, let's say max 8 services (grid_cols_4 hai toh 2 rows)
          setDbServices(published.slice(0, 8)); 
        }
      } catch (error) {
        console.error("Failed to fetch services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="What we do" title={<>Services that <span className="text-gradient-brand">scale</span> brands</>} subtitle="Hover any card to flip it and see what's inside." />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dbServices.map((s, i) => (
            <motion.div
              key={s.slug || s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group perspective-1000 h-72"
            >
              <div className="relative h-full w-full preserve-3d transition-transform duration-700 group-hover:[transform:rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
                  <div className="relative h-40 overflow-hidden">
                    {/* Database ka featuredImage */}
                    {s.featuredImage ? (
                      <img src={s.featuredImage} alt={s.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-brand/20 to-brand/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                    <div className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-primary shadow">
                      {/* Default icon lagaya hai kyunki DB me icon nahi hota */}
                      <Layout className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    {/* Database ka title aur shortDescription */}
                    <h3 className="text-base font-bold text-navy line-clamp-1">{s.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.shortDescription}</p>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden overflow-hidden rounded-2xl bg-gradient-brand p-6 text-white shadow-elegant">
                  <Layout className="h-7 w-7" />
                  <h3 className="mt-3 text-lg font-bold line-clamp-1">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/85 line-clamp-3">{s.shortDescription}</p>
                  <Link to="/service/$slug" params={{ slug: s.slug }} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-4 hover:underline">
                    View Details <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>}
      <h2 className="text-3xl font-bold leading-tight text-navy md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}