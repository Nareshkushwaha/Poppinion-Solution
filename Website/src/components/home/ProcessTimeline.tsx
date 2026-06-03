import { motion } from "framer-motion";
import { process } from "@/lib/site-data";

export function ProcessTimeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Timeline of momentum</p>
          <h2 className="text-3xl font-bold text-navy md:text-5xl">A proven 4-step process</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">From the first call to compounding growth — we run the same battle-tested system across every engagement.</p>
        </motion.div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block" />
          {process.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="relative rounded-2xl border border-border bg-white p-6 shadow-soft transition hover:shadow-elegant"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-lg font-bold text-white shadow-elegant"
              >
                {p.step}
              </motion.div>
              <h3 className="text-lg font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}