import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  Menu, X, Mail, Phone, Facebook, Instagram, Linkedin, Youtube, ChevronDown, 
  Search, Megaphone, Share2, Monitor, Layers, FileText, MousePointerClick, Store, ShoppingCart, Smartphone 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config"; 

// Naya 2-Column aur 10 Services wala structure Icons ke sath
const servicesColumns = [
  [
    { name: "SEO (Search Engine Optimization)", icon: Search },
    { name: "SMO (Social Media Optimization)", icon: Megaphone },
    { name: "SMM (Social Media Marketing)", icon: Share2 },
    { name: "Website Design Services", icon: Monitor },
    { name: "UI & UX Design Services", icon: Layers },
  ],
  [
    { name: "Content Marketing Services", icon: FileText },
    { name: "Google Ads Services", icon: MousePointerClick },
    { name: "GMB (Google My Business)", icon: Store },
    { name: "ECommerce Web Designing", icon: ShoppingCart },
    { name: "App Development", icon: Smartphone },
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

  // Check function to match service name with DB
  const getMatchedServiceSlug = (itemName: string) => {
    // Basic match check ignoring brackets for better DB matching
    const cleanItemName = itemName.split('(')[0].trim().toLowerCase();
    const match = dbServices.find(s => s.title.toLowerCase().trim().includes(cleanItemName));
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

            {/* SERVICES DROPDOWN WRAPPER */}
            <li 
              className="h-full flex items-center relative"
              onMouseEnter={() => setIsMegaMenuHovered(true)}
              onMouseLeave={() => setIsMegaMenuHovered(false)}
            >
              <div className={`cursor-pointer rounded-full px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${isMegaMenuHovered ? 'text-primary' : 'text-foreground/80 hover:text-primary'}`}>
                Our Services <ChevronDown className={`size-4 transition-transform duration-300 ${isMegaMenuHovered ? 'rotate-180' : ''}`} />
              </div>

              {/* NEW COMPACT 2-COLUMN MEGA MENU */}
              <AnimatePresence>
                {isMegaMenuHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[700px] bg-white border border-border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-xl overflow-hidden z-50"
                  >
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-x-12">
                        {servicesColumns.map((column, colIdx) => (
                          <div key={colIdx} className="flex flex-col">
                            {column.map((service, itemIdx) => {
                              const slug = getMatchedServiceSlug(service.name);
                              const isLast = itemIdx === column.length - 1;
                              const Icon = service.icon;

                              return (
                                <div key={itemIdx} className={`py-4 ${!isLast ? 'border-b border-border/60' : ''}`}>
                                  {slug ? (
                                    <Link 
                                      to="/service/$slug" 
                                      params={{ slug }} 
                                      className="group flex items-center gap-4 w-full text-left"
                                    >
                                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                                        <Icon className="h-5 w-5" />
                                      </div>
                                      <span className="text-[13px] font-bold text-navy group-hover:text-primary transition-colors">
                                        {service.name}
                                      </span>
                                    </Link>
                                  ) : (
                                    <button 
                                      onClick={handleNotAvailable} 
                                      className="group flex items-center gap-4 w-full text-left cursor-not-allowed opacity-60 hover:opacity-80 transition-opacity"
                                    >
                                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                                        <Icon className="h-5 w-5" />
                                      </div>
                                      <span className="text-[13px] font-bold text-muted-foreground">
                                        {service.name}
                                      </span>
                                    </button>
                                  )}
                                </div>
                              );
                            })}
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
                        <div className="p-2 space-y-1">
                          {/* Mobile ke liye dono columns ko ek sath render karenge */}
                          {servicesColumns.flat().map((service, itemIdx) => {
                            const slug = getMatchedServiceSlug(service.name);
                            const Icon = service.icon;
                            return (
                              <div key={itemIdx}>
                                {slug ? (
                                  <Link to="/service/$slug" params={{ slug }} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-navy/80 hover:bg-white hover:text-primary transition-colors">
                                    <Icon className="h-4 w-4 text-primary" />
                                    {service.name}
                                  </Link>
                                ) : (
                                  <button onClick={handleAdminNotAvailable} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground/60 text-left hover:bg-white transition-colors">
                                    <Icon className="h-4 w-4" />
                                    {service.name} <span className="text-[9px] ml-auto opacity-50 bg-muted px-1.5 py-0.5 rounded uppercase tracking-wider">Soon</span>
                                  </button>
                                )}
                              </div>
                            );
                          })}
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