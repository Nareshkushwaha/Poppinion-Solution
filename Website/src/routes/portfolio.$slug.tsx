import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export const Route = createFileRoute("/portfolio/$slug")({
  // Loader ab backend se data uthayega URL (slug) match karke
  loader: async ({ params }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`);
      const data = await res.json();
      if (data.success) {
        const project = data.data.find((x: any) => x.slug === params.slug);
        if (!project) throw notFound();
        return project;
      }
      throw notFound();
    } catch (error) {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name || loaderData?.title || "Project"} — Poppinion Solutions` }] }),
  notFoundComponent: () => <div className="grid min-h-screen place-items-center"><Link to="/portfolio" className="text-primary hover:underline">← Back to Portfolio</Link></div>,
  component: PortfolioDetail,
});

function PortfolioDetail() {
  const p = Route.useLoaderData();
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Safety checks (Agar admin ne koi field khaali chhod di toh error na aaye)
  const title = p.name || p.title;
  // Agar gallery nahi hai, toh main image ko hi array bana do
  const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : (p.coverImage ? [p.coverImage] : []); 
  const results = p.results || [];

  return (
    <>
      <section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <Link to="/portfolio" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> Back to portfolio</Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{p.category}</span>
            <h1 className="mt-4 text-4xl font-bold text-navy md:text-6xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">Client: <span className="font-semibold text-navy">{p.client}</span></p>
            {/* HTML Content (agar tum summernote wagera use karte ho description ke liye) */}
            <div className="mt-5 max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: p.description || p.shortDescription }} />
          </motion.div>

          {results.length > 0 && (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {results.map((r: string, idx: number) => (
                <div key={idx} className="rounded-2xl bg-gradient-brand p-5 text-white shadow-elegant">
                  <p className="text-xl md:text-2xl font-bold">{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-6 md:grid-cols-2">
            {gallery.map((g: string, i: number) => (
              <motion.button
                key={i}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-2xl shadow-soft ${i === 0 && gallery.length > 1 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"}`}
              >
                <img src={g} alt={`${title} image ${i + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </motion.button>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-4 backdrop-blur">
            <button onClick={() => setLightbox(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"><X className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(((lightbox ?? 0) - 1 + gallery.length) % gallery.length); }} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(((lightbox ?? 0) + 1) % gallery.length); }} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"><ChevronRight className="h-5 w-5" /></button>
            <motion.img key={lightbox} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={gallery[lightbox]} alt="" onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-brand p-10 text-center text-white shadow-glow mx-6">
          <h3 className="text-3xl font-bold">Want results like these?</h3>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-navy hover:scale-105 transition-transform">Start a project</Link>
        </div>
      </section>
    </>
  );
}