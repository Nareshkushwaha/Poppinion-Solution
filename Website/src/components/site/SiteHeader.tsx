import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Mail, Phone, Facebook, Instagram, Linkedin, Youtube, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config"; 

const megaMenuColumns = [
  [
    {
      title: "Website Designing",
      items: ["Static Website Designing", "Dynamic Website Designing", "Ecommerce Website Designing", "Custom Website Designing", "Wordpress Website Designing", "Landing Page Designing", "MLM Website Designing", "News Website Designing", "Business Website Design"]
    }
  ],
  [
    {
      title: "Website Development",
      items: ["PHP Website Development", "Ecommerce Website Development", "Wordpress Website Development", "Custom Website Development", "MLM Software Development", "Payment Gateway Integration", "Multi Vendor Ecommerce Website", "CMS Web Development", "Web Portal Development", "CRM Software Development", "News Portal Development"]
    }
  ],
  [
    {
      title: "Mobile App Development",
      items: ["Android App Development", "IOS App Development", "Native App Development", "Hybrid App Development"]
    },
    {
      title: "Graphic Designing",
      items: ["Business Explainer Video", "Logo Designing", "Social Media Post Design"]
    }
  ],
  [
    {
      title: "Digital Marketing",
      items: ["Search Engine Optimization", "Google My Business Service", "Local SEO", "E-Commerce SEO", "Google Ads", "Google Promotion", "Online Reputation Management", "Performance Marketing", "Facebook Marketing", "Instagram Marketing", "Email Marketing", "Social Media Marketing", "Social Media Optimization", "Lead Generation"]
    }
  ]
];

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); 
  const [isMegaMenuHovered, setIsMegaMenuHovered] = useState(false); 
  const [dbServices, setDbServices] = useState<any[]>([]); 
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { 
    setOpen(false); 
    setServicesOpen(false);
    setIsMegaMenuHovered(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/services`);
        const data = await res.json();
        if (data.success) {
          setDbServices(data.data.filter((s: any) => s.status === 'published'));
        }
      } catch (error) {
        console.error("Failed to fetch services for nav", error);
      }
    };
    fetchServices();
  }, []);

  const getMatchedServiceSlug = (itemName: string) => {
    const match = dbServices.find(s => s.title.toLowerCase().trim() === itemName.toLowerCase().trim());
    return match ? match.slug : null;
  };

  const handleNotAvailable = () => {
    toast.info("This service is currently not available.", {
      description: "Please check back later or contact us directly."
    });
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-navy text-white/90 md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+919999999999" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="h-3.5 w-3.5" /> +91 99999 99999</a>
            <a href="mailto:hello@poppinion.com" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail className="h-3.5 w-3.5" /> hello@poppinion.com</a>
          </div>
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Instagram, href: "https://instagram.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Youtube, href: "https://youtube.com" },
            ].map(({ Icon, href }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" className="opacity-80 transition hover:opacity-100 hover:text-accent-orange">
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled || isMegaMenuHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          boxShadow: scrolled || isMegaMenuHovered ? "0 4px 20px -4px rgba(0,26,114,0.1)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className={`${scrolled || isMegaMenuHovered ? "backdrop-blur-md" : ""}`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 relative">
          <Link to="/" className="flex items-center gap-2 font-bold text-navy">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white shadow-elegant">P</div>
            <span className="text-lg tracking-tight">Poppinion <span className="text-primary">Solutions</span></span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden items-center gap-1 lg:flex h-full">
            <li>
              <Link to="/" className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold text-primary" }} activeOptions={{ exact: true }}>Home</Link>
            </li>
            <li>
              <Link to="/about" className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold text-primary" }}>About</Link>
            </li>

            {/* RELATIVE CLASS ADD KIYA YAHAN */}
            <li 
              className="h-full flex items-center relative"
              onMouseEnter={() => setIsMegaMenuHovered(true)}
              onMouseLeave={() => setIsMegaMenuHovered(false)}
            >
              <div className={`cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${isMegaMenuHovered ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
                Our Services <ChevronDown className={`size-4 transition-transform duration-300 ${isMegaMenuHovered ? 'rotate-180' : ''}`} />
              </div>

              {/* COMPACT FLOATING MEGA MENU */}
              <AnimatePresence>
                {isMegaMenuHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    // YE HAI MAGIC LINE: Fix width (850px), centered, heavy shadow
                    className="absolute left-1/2 -translate-x-[45%] top-full w-[850px] bg-white border border-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden z-50"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-6">
                        {megaMenuColumns.map((col, colIdx) => (
                          <div key={colIdx} className="space-y-4">
                            {col.map((category, catIdx) => (
                              <div key={catIdx}>
                                <h3 className="text-[13px] font-bold text-primary mb-2 pb-1 border-b border-primary/10 inline-block">
                                  {category.title}
                                </h3>
                                <ul className="space-y-1.5">
                                  {category.items.map((item, itemIdx) => {
                                    const slug = getMatchedServiceSlug(item);
                                    return (
                                      <li key={itemIdx}>
                                        {slug ? (
                                          <Link to="/service/$slug" params={{ slug }} className="text-[12px] font-medium text-navy/80 hover:text-primary transition-colors flex items-center gap-1.5 group">
                                            <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                            {item}
                                          </Link>
                                        ) : (
                                          <button onClick={handleNotAvailable} className="text-[12px] font-medium text-muted-foreground/60 hover:text-muted-foreground transition-colors flex items-center gap-1.5 text-left cursor-not-allowed">
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                                            {item}
                                          </button>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {navLinks.slice(2).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "rounded-full px-3 py-2 text-sm font-semibold text-primary" }}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:shadow-glow">
              Get Free Consultation
            </Link>
          </div>

          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-full bg-secondary lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-y-auto max-h-[calc(100vh-80px)] border-t border-border bg-white lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                <li><Link to="/" className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary" activeProps={{ className: "block rounded-lg px-3 py-3 text-base font-semibold bg-secondary text-primary" }} activeOptions={{ exact: true }}>Home</Link></li>
                <li><Link to="/about" className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary" activeProps={{ className: "block rounded-lg px-3 py-3 text-base font-semibold bg-secondary text-primary" }}>About</Link></li>
                
                <li>
                  <button onClick={() => setServicesOpen(!servicesOpen)} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary text-navy">
                    Our Services <ChevronDown className={`size-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-muted/30 rounded-lg mx-2 mb-2">
                        <div className="p-4 space-y-6">
                          {megaMenuColumns.flat().map((category, catIdx) => (
                            <div key={catIdx}>
                              <h3 className="font-bold text-primary mb-2 text-sm">{category.title}</h3>
                              <ul className="space-y-3 pl-2">
                                {category.items.map((item, itemIdx) => {
                                  const slug = getMatchedServiceSlug(item);
                                  return (
                                    <li key={itemIdx}>
                                      {slug ? (
                                        <Link to="/service/$slug" params={{ slug }} className="text-sm font-medium text-navy/80 hover:text-primary block">
                                          {item}
                                        </Link>
                                      ) : (
                                        <button onClick={handleAdminNotAvailable} className="text-sm font-medium text-muted-foreground/60 text-left w-full block">
                                          {item} <span className="text-[10px] ml-1 opacity-50">(Soon)</span>
                                        </button>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {navLinks.slice(2).map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary" activeProps={{ className: "block rounded-lg px-3 py-3 text-base font-semibold bg-secondary text-primary" }}>{l.label}</Link>
                  </li>
                ))}
                <li className="pt-2"><Link to="/contact" className="block rounded-full bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-primary-foreground">Get Free Consultation</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}

function handleAdminNotAvailable() {
  toast.info("This service is currently not available.", {
    description: "Please check back later or contact us directly."
  });
}