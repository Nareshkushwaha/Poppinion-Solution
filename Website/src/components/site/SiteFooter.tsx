import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy text-white">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <motion.div animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-20 right-0 h-96 w-96 rounded-full bg-accent-orange/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12"
        >
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-3xl font-bold md:text-4xl">Ready to <span className="text-accent-orange">scale</span> your brand?</h3>
              <p className="mt-2 text-white/70">Let's craft a growth story worth talking about.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 font-semibold text-navy transition hover:gap-3">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white">P</div>
              <span>Poppinion Solutions</span>
            </Link>
            <p className="mt-4 text-sm text-white/70">Building public opinion digitally — premium digital marketing, web & app development, and branding.</p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-primary hover:scale-110"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
              <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/service/$slug" params={{ slug: "seo" }} className="hover:text-white">SEO</Link></li>
              <li><Link to="/service/$slug" params={{ slug: "google-ads" }} className="hover:text-white">Google Ads</Link></li>
              <li><Link to="/service/$slug" params={{ slug: "social-media" }} className="hover:text-white">Social Media</Link></li>
              <li><Link to="/service/$slug" params={{ slug: "web-development" }} className="hover:text-white">Web Development</Link></li>
              <li><Link to="/service/$slug" params={{ slug: "branding" }} className="hover:text-white">Branding</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">Get in touch</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-accent-orange" /> +91 99999 99999</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-accent-orange" /> hello@poppinion.com</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-accent-orange" /> New Delhi, India</li>
            </ul>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex overflow-hidden rounded-full border border-white/15 bg-white/5">
              <input type="email" placeholder="Your email" className="flex-1 bg-transparent px-4 py-2 text-sm placeholder:text-white/40 focus:outline-none" />
              <button className="bg-primary px-4 text-sm font-semibold transition hover:bg-accent-orange"><ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Poppinion Solutions. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
