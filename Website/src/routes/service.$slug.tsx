import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { services } from "@/lib/site-data";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/service/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Service"} — Poppinion Solutions` }, { name: "description", content: loaderData?.description ?? "" }] }),
  notFoundComponent: () => <div className="grid min-h-screen place-items-center"><Link to="/services" className="text-primary">← Back to services</Link></div>,
  component: ServiceDetail,
});

function ServiceDetail() {
  const s = Route.useLoaderData();
  const benefits = ["Tailored strategy for your stage", "Senior-led execution", "Weekly reporting cadence", "Outcome-aligned pricing"];
  const features = ["Audit & roadmap", "Creative production", "Campaign management", "Optimization sprints"];

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-12 md:pt-40">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <s.icon className="h-3.5 w-3.5" /> Service
            </div>
            <h1 className="text-4xl font-bold text-navy md:text-5xl">{s.name}</h1>
            <p className="mt-4 text-muted-foreground md:text-lg">{s.description}</p>
            <div className="mt-6 flex gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-elegant">Get started <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/services" className="inline-flex items-center rounded-full border border-input bg-white px-5 py-2.5 text-sm font-semibold text-navy">All services</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-brand opacity-30 blur-2xl" />
            <img src={s.image} alt={s.name} className="aspect-square w-full rounded-2xl object-cover shadow-elegant" />
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-navy">What's included</h2>
            <ul className="mt-5 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary"><Check className="h-3.5 w-3.5" /></span>{f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-brand p-8 text-white shadow-elegant">
            <h2 className="text-2xl font-bold">Benefits</h2>
            <ul className="mt-5 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/20"><Check className="h-3.5 w-3.5" /></span>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-navy p-10 text-center text-white shadow-glow">
          <h3 className="text-3xl font-bold">Let's talk about your goals.</h3>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy">Book a consult</Link>
        </div>
      </section>
    </>
  );
}
