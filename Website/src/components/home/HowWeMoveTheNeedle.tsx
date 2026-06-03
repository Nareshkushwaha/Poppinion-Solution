import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// 1. STATIC DATA (Ab ye database se nahi aayega, yahi par fix rahega)
// Maine Unsplash ki premium images lagayi hain taaki design turant sundar lage.
const staticCampaigns = [
  {
    id: 1,
    title: "Viral Social Hook",
    description: "Generated 2M+ organic impressions within 48 hours of launch.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    category: "Social Media"
  },
  {
    id: 2,
    title: "Performance Ad Creative",
    description: "Decreased Cost-Per-Acquisition (CPA) by 43% for a D2C brand.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Paid Ads"
  },
  {
    id: 3,
    title: "SEO Content Engine",
    description: "Scaled blog traffic from 0 to 50k monthly visitors in 6 months.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    category: "Organic Growth"
  },
  {
    id: 4,
    title: "High-Converting Landing Page",
    description: "Redesigned checkout flow increasing conversion rate by 2.4x.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    category: "UI/UX Design"
  },
  {
    id: 5,
    title: "Brand Identity Revamp",
    description: "Complete visual overhaul for a B2B SaaS raising their Series A.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    category: "Branding"
  },
  {
    id: 6,
    title: "Email Marketing Funnel",
    description: "Automated sequences that recovered 30% of abandoned carts.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    category: "Retention"
  }
];

export function HowWeMoveTheNeedle() {
  const [open, setOpen] = useState<number | null>(null);
  const item = open !== null ? staticCampaigns[open] : null;

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* LEFT SIDE: Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> How we move the needle
            </div>
            <h2 className="text-3xl font-bold leading-tight text-navy md:text-5xl">
              Campaigns Engineered For <span className="text-gradient-brand">Momentum</span>.
            </h2>
            <p className="mt-5 text-muted-foreground md:text-lg leading-relaxed">
              From hook to headline, every asset is built to capture attention and compound results. Click any compact tile to see the visual in full detail.
            </p>
          </motion.div>

          {/* RIGHT SIDE: Compact Image Grid with Staggered Animation */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {staticCampaigns.map((n, i) => (
                <motion.button
                  key={n.id}
                  onClick={() => setOpen(i)}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm hover:shadow-elegant transition-all h-36 md:h-44 w-full"
                >
                  <img 
                    src={n.image} 
                    alt={n.title} 
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                    loading="lazy" 
                  />
                  
                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-white/90 px-1.5 py-0.5 rounded backdrop-blur-sm mb-1 inline-block">
                      {n.category}
                    </span>
                    <h3 className="text-xs md:text-sm font-bold text-white line-clamp-1">{n.title}</h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* POPUP MODAL (Beautiful and Smooth) */}
      <AnimatePresence>
        {item && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-navy/80 p-4 backdrop-blur-md" 
            onClick={() => setOpen(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setOpen(null)} 
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative aspect-video w-full bg-muted overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-white">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">{item.category}</span>
                  <h3 className="text-2xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">{item.description}</p>
                </div>
                <div className="flex gap-3 mt-6 md:mt-0 shrink-0">
                  <button 
                    onClick={() => setOpen(((open ?? 0) - 1 + staticCampaigns.length) % staticCampaigns.length)} 
                    className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-secondary transition-colors text-navy"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setOpen(((open ?? 0) + 1) % staticCampaigns.length)} 
                    className="grid h-12 w-12 place-items-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}