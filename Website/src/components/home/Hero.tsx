import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Play } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-40">
      <div className="absolute inset-0 bg-gradient-hero" />
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-primary/30"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-24 text-center md:pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" /> Building Public Opinion Digitally
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          className="mx-auto max-w-5xl text-4xl font-bold leading-[1.08] tracking-tight text-navy md:text-6xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            className="block text-2xl font-semibold tracking-tight text-primary md:text-3xl"
          >
            Building Public Opinion Digitally
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            className="mt-3 block"
          >
            Growth, Engineered.
          </motion.span>
          <motion.span
            variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}
            className="block text-gradient-brand"
          >
            Brands, Amplified.
          </motion.span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }} className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground md:text-base">
          We're a premium digital agency turning ambitious brands into category leaders — through performance marketing, content, and design that actually moves the needle.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.85 }} className="mt-8 flex flex-wrap items-center justify-center gap-3 pb-8">
          <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:shadow-glow">
            Get Free Consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full border border-input bg-white/80 px-6 py-3 text-sm font-semibold text-navy backdrop-blur transition hover:bg-white">
            <Play className="h-4 w-4 text-primary" /> View Portfolio
          </Link>
        </motion.div>

      </div>
    </section>
  );
}