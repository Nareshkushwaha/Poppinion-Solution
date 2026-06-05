import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export const Route = createFileRoute("/service/$slug")({
  // Loader ab backend se data uthayega URL (slug) match karke
  loader: async ({ params }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      if (data.success) {
        // Sirf published service hi match karega
        const service = data.data.find((x: any) => x.slug === params.slug && x.status === 'published');
        if (!service) throw notFound();
        return service;
      }
      throw notFound();
    } catch (error) {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({ 
    meta: [
      { title: `${loaderData?.title ?? "Service"} — Poppinion Solutions` }, 
      { name: "description", content: loaderData?.seoDescription ?? loaderData?.shortDescription ?? "" }
    ] 
  }),
  notFoundComponent: () => <div className="grid min-h-screen place-items-center"><Link to="/" className="text-primary hover:underline">← Back to Home</Link></div>,
  component: ServiceDetail,
});

function ServiceDetail() {
  const s = Route.useLoaderData();
  
  // Database se arrays nikalna (safety ke sath)
  const benefits = Array.isArray(s.benefits) ? s.benefits : [];
  const features = Array.isArray(s.features) ? s.features : [];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20 border-b border-border bg-white">
        <div className="absolute inset-0 z-0">
          <img src="/uploads/service-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-white/95 backdrop-blur-[1px]" />
        </div>
        
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-widest">
                Our Service
              </span>
            </div>
            <h1 className="text-4xl font-bold text-navy md:text-5xl capitalize leading-tight">{s.title}</h1>
            <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">{s.shortDescription}</p>
            <div className="mt-8 flex gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:shadow-glow transition-all hover:-translate-y-0.5">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>

            </div>
             </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-brand opacity-20 blur-2xl" />
            {s.featuredImage ? (
              <img src={s.featuredImage} alt={s.title} className="aspect-square w-full rounded-2xl object-cover shadow-elegant border border-border p-2 bg-white" />
            ) : (
              <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-border shadow-soft" />
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. FULL DESCRIPTION (RICH TEXT FROM ADMIN) */}
      {s.fullDescription && (
        <section className="py-16 bg-white border-b border-border">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-2xl font-bold text-navy mb-6 capitalize">Overview</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: s.fullDescription }} />
          </div>
        </section>
      )}

      {/* 3. FEATURES & BENEFITS GRID */}
      {(features.length > 0 || benefits.length > 0) && (
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
            
            {/* Features Box */}
            {features.length > 0 && (
              <div className="rounded-2xl border border-border bg-white p-8 shadow-soft transition hover:shadow-elegant">
                <h2 className="text-2xl font-bold text-navy capitalize">What's Included</h2>
                <ul className="mt-6 space-y-4">
                  {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/10 text-primary mt-0.5"><Check className="h-3.5 w-3.5" /></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits Box */}
            {benefits.length > 0 && (
              <div className="rounded-2xl bg-gradient-brand p-8 text-white shadow-elegant transition hover:shadow-glow">
                <h2 className="text-2xl font-bold capitalize">Benefits</h2>
                <ul className="mt-6 space-y-4">
                  {benefits.map((b: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-white/90">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/20 mt-0.5"><Check className="h-3.5 w-3.5" /></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 4. CALL TO ACTION */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-navy p-10 text-center text-white shadow-glow mx-6">
          <h3 className="text-3xl font-bold capitalize">Let's talk about your goals.</h3>
          <p className="mt-3 text-white/70">Ready to scale your brand with our expert team?</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-navy hover:scale-105 transition-transform">Book a consult</Link>
        </div>
      </section>
    </div>
  );
}