import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "published" | "draft";

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  galleryImages: string[];
  benefits: string[];
  features: string[];
  faq: { q: string; a: string }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  status: Status;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  client: string;
  shortDescription: string;
  caseStudy: string;
  coverImage: string;
  galleryImages: string[];
  results: string;
  seoTitle: string;
  seoDescription: string;
  status: Status;
  order: number;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  featuredImage: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  status: Status;
  createdAt: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: string;
  shortDescription: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationEmail: string;
  featuredImage: string;
  status: Status;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  date: string;
}

export interface MediaItem {
  id: string;
  name: string;
  folder: string;
  url: string;
  uploadedAt: string;
}

export interface Activity {
  id: string;
  type: string;
  message: string;
  date: string;
}

export interface HomeContent {
  hero: { title: string; subtitle: string; primaryCta: string; secondaryCta: string; image: string };
  trustedBrands: { id: string; name: string; logo: string }[];
  needle: { id: string; title: string; description: string }[];
  timeline: { id: string; year: string; title: string; description: string }[];
  faqs: { id: string; q: string; a: string }[];
  cta: { title: string; subtitle: string; buttonLabel: string };
  footerCta: { title: string; subtitle: string };
}

export interface AboutContent {
  story: string;
  mission: string;
  vision: string;
  founderMessage: string;
  images: string[];
  stats: { id: string; label: string; value: string }[];
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  robots: string;
  sitemapEnabled: boolean;
}

export interface HeaderSettings {
  phone: string;
  email: string;
  logo: string;
  menu: { id: string; label: string; url: string }[];
  ctaLabel: string;
  ctaUrl: string;
  socials: { id: string; platform: string; url: string }[];
}

export interface FooterSettings {
  footerText: string;
  address: string;
  email: string;
  phone: string;
  quickLinks: { id: string; label: string; url: string }[];
  socials: { id: string; platform: string; url: string }[];
  copyright: string;
}

export interface ProfileSettings {
  name: string;
  email: string;
  phone: string;
  photo: string;
  designation: string;
  bio: string;
}

export interface Notification {
  id: string;
  type: "lead" | "blog" | "career" | "change";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface AdminState {
  services: Service[];
  projects: Project[];
  blogs: BlogPost[];
  jobs: Job[];
  leads: Lead[];
  media: MediaItem[];
  activity: Activity[];
  notifications: Notification[];
  home: HomeContent;
  about: AboutContent;
  seo: SeoSettings;
  header: HeaderSettings;
  footer: FooterSettings;
  profile: ProfileSettings;

  // generic CRUD
  upsertService: (s: Service) => void;
  deleteService: (id: string) => void;
  upsertProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (ids: string[]) => void;
  upsertBlog: (b: BlogPost) => void;
  deleteBlog: (id: string) => void;
  upsertJob: (j: Job) => void;
  deleteJob: (id: string) => void;
  updateLead: (id: string, patch: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addMedia: (m: MediaItem) => void;
  deleteMedia: (id: string) => void;

  updateHome: (h: Partial<HomeContent>) => void;
  updateAbout: (a: Partial<AboutContent>) => void;
  updateSeo: (s: Partial<SeoSettings>) => void;
  updateHeader: (h: Partial<HeaderSettings>) => void;
  updateFooter: (f: Partial<FooterSettings>) => void;
  updateProfile: (p: Partial<ProfileSettings>) => void;

  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  logActivity: (type: string, message: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

const seedServices: Service[] = [
  {
    id: uid(), title: "Web Development", slug: "web-development",
    shortDescription: "Modern responsive websites built for performance.",
    fullDescription: "We craft cutting-edge web experiences using the latest frameworks.",
    featuredImage: "", galleryImages: [],
    benefits: ["SEO optimized", "Lightning fast", "Mobile first"],
    features: ["React", "Next.js", "TypeScript"],
    faq: [{ q: "How long does it take?", a: "Typically 4-8 weeks." }],
    seoTitle: "Web Development Services", seoDescription: "", seoKeywords: "",
    status: "published", createdAt: now(),
  },
  {
    id: uid(), title: "Digital Marketing", slug: "digital-marketing",
    shortDescription: "Data-driven marketing strategies that convert.",
    fullDescription: "Comprehensive marketing across all channels.",
    featuredImage: "", galleryImages: [],
    benefits: ["Higher ROI", "Targeted reach"], features: ["SEO", "PPC", "Social"],
    faq: [], seoTitle: "", seoDescription: "", seoKeywords: "",
    status: "published", createdAt: now(),
  },
];

const seedProjects: Project[] = [
  {
    id: uid(), name: "FinTech Platform Redesign", slug: "fintech-redesign",
    category: "Web Design", client: "Acme Finance",
    shortDescription: "Complete overhaul of a banking dashboard.",
    caseStudy: "We rebuilt the experience from the ground up.",
    coverImage: "", galleryImages: [], results: "3x conversions",
    seoTitle: "", seoDescription: "", status: "published", order: 0, createdAt: now(),
  },
];

const seedBlogs: BlogPost[] = [
  {
    id: uid(), title: "Why React Server Components Matter", slug: "rsc-matter",
    category: "Engineering", tags: ["react", "performance"],
    featuredImage: "",
    content: "<h2>Introduction</h2><p>Server components are a paradigm shift...</p>",
    metaTitle: "", metaDescription: "", keywords: "",
    status: "published", createdAt: now(),
  },
];

const seedJobs: Job[] = [
  {
    id: uid(), title: "Senior Frontend Engineer", department: "Engineering",
    location: "Remote", employmentType: "Full-time", experience: "4+ years",
    salary: "Competitive",
    shortDescription: "Build the future of our web platform.",
    fullDescription: "Join our engineering team to ship world-class products.",
    responsibilities: ["Build features", "Review code", "Mentor juniors"],
    requirements: ["React expert", "TypeScript", "5y experience"],
    benefits: ["Remote", "Stock options", "Health"],
    applicationEmail: "careers@poppinion.com", featuredImage: "",
    status: "published", createdAt: now(),
  },
];

const seedLeads: Lead[] = [
  { id: uid(), name: "John Smith", phone: "+1 555 0100", email: "john@example.com", service: "Web Development", message: "Need a quote.", status: "new", date: now() },
  { id: uid(), name: "Sarah Lee", phone: "+1 555 0101", email: "sarah@example.com", service: "Digital Marketing", message: "Interested in SEO.", status: "read", date: now() },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      services: seedServices,
      projects: seedProjects,
      blogs: seedBlogs,
      jobs: seedJobs,
      leads: seedLeads,
      media: [],
      activity: [
        { id: uid(), type: "system", message: "Admin panel initialized", date: now() },
      ],
      notifications: [
        { id: uid(), type: "lead", title: "New lead received", message: "John Smith requested a quote", date: now(), read: false },
      ],
      home: {
        hero: { title: "Solutions That Move The Needle", subtitle: "Premium digital experiences for modern brands", primaryCta: "Get Started", secondaryCta: "View Work", image: "" },
        trustedBrands: [],
        needle: [
          { id: uid(), title: "Strategy", description: "Data-driven decision making" },
          { id: uid(), title: "Design", description: "Premium visual experiences" },
          { id: uid(), title: "Engineering", description: "Robust, scalable systems" },
        ],
        timeline: [
          { id: uid(), year: "2020", title: "Founded", description: "Poppinion was born" },
          { id: uid(), year: "2023", title: "Scale", description: "Crossed 100 clients" },
        ],
        faqs: [
          { id: uid(), q: "How do we start?", a: "Book a discovery call." },
        ],
        cta: { title: "Ready to grow?", subtitle: "Let's talk.", buttonLabel: "Contact Us" },
        footerCta: { title: "Let's build something great.", subtitle: "Reach out today." },
      },
      about: {
        story: "Poppinion Solutions began with a simple mission: deliver world-class digital outcomes.",
        mission: "Empower brands with premium digital experiences.",
        vision: "Be the most trusted partner for ambitious companies.",
        founderMessage: "We obsess over craft and results.",
        images: [],
        stats: [
          { id: uid(), label: "Clients", value: "120+" },
          { id: uid(), label: "Projects", value: "300+" },
          { id: uid(), label: "Years", value: "5+" },
        ],
      },
      seo: { metaTitle: "Poppinion Solutions", metaDescription: "Premium digital solutions", keywords: "web, marketing", ogImage: "", robots: "index, follow", sitemapEnabled: true },
      header: {
        phone: "+1 (555) 010-0000", email: "hello@poppinion.com", logo: "",
        menu: [
          { id: uid(), label: "Home", url: "/" },
          { id: uid(), label: "Services", url: "/services" },
          { id: uid(), label: "Portfolio", url: "/portfolio" },
          { id: uid(), label: "Blog", url: "/blog" },
          { id: uid(), label: "Careers", url: "/careers" },
          { id: uid(), label: "Contact", url: "/contact" },
        ],
        ctaLabel: "Get Started", ctaUrl: "/contact",
        socials: [
          { id: uid(), platform: "LinkedIn", url: "#" },
          { id: uid(), platform: "Twitter", url: "#" },
        ],
      },
      footer: {
        footerText: "Crafting premium digital experiences since 2020.",
        address: "123 Market St, San Francisco, CA",
        email: "hello@poppinion.com", phone: "+1 (555) 010-0000",
        quickLinks: [
          { id: uid(), label: "About", url: "/about" },
          { id: uid(), label: "Services", url: "/services" },
          { id: uid(), label: "Contact", url: "/contact" },
        ],
        socials: [
          { id: uid(), platform: "LinkedIn", url: "#" },
          { id: uid(), platform: "Twitter", url: "#" },
        ],
        copyright: "© 2026 Poppinion Solutions. All rights reserved.",
      },
      profile: {
        name: "Admin User", email: "admin@poppinion.com", phone: "+1 (555) 010-0000",
        photo: "", designation: "Administrator", bio: "Managing the Poppinion digital presence.",
      },

      upsertService: (s) => set((st) => {
        const exists = st.services.some((x) => x.id === s.id);
        const services = exists ? st.services.map((x) => x.id === s.id ? s : x) : [s, ...st.services];
        return { services, activity: [{ id: uid(), type: "service", message: `${exists ? "Updated" : "Created"} service: ${s.title}`, date: now() }, ...st.activity].slice(0, 50) };
      }),
      deleteService: (id) => set((st) => ({ services: st.services.filter((x) => x.id !== id), activity: [{ id: uid(), type: "service", message: "Deleted service", date: now() }, ...st.activity].slice(0, 50) })),

      upsertProject: (p) => set((st) => {
        const exists = st.projects.some((x) => x.id === p.id);
        const projects = exists ? st.projects.map((x) => x.id === p.id ? p : x) : [p, ...st.projects];
        return { projects, activity: [{ id: uid(), type: "project", message: `${exists ? "Updated" : "Created"} project: ${p.name}`, date: now() }, ...st.activity].slice(0, 50) };
      }),
      deleteProject: (id) => set((st) => ({ projects: st.projects.filter((x) => x.id !== id) })),
      reorderProjects: (ids) => set((st) => ({ projects: ids.map((id, i) => ({ ...st.projects.find((p) => p.id === id)!, order: i })) })),

      upsertBlog: (b) => set((st) => {
        const exists = st.blogs.some((x) => x.id === b.id);
        const blogs = exists ? st.blogs.map((x) => x.id === b.id ? b : x) : [b, ...st.blogs];
        const notif: Notification | null = !exists && b.status === "published"
          ? { id: uid(), type: "blog", title: "Blog published", message: b.title, date: now(), read: false }
          : null;
        return {
          blogs,
          notifications: notif ? [notif, ...st.notifications] : st.notifications,
          activity: [{ id: uid(), type: "blog", message: `${exists ? "Updated" : "Created"} blog: ${b.title}`, date: now() }, ...st.activity].slice(0, 50),
        };
      }),
      deleteBlog: (id) => set((st) => ({ blogs: st.blogs.filter((x) => x.id !== id) })),

      upsertJob: (j) => set((st) => {
        const exists = st.jobs.some((x) => x.id === j.id);
        const jobs = exists ? st.jobs.map((x) => x.id === j.id ? j : x) : [j, ...st.jobs];
        const notif: Notification | null = !exists
          ? { id: uid(), type: "career", title: "New career posted", message: j.title, date: now(), read: false }
          : null;
        return {
          jobs,
          notifications: notif ? [notif, ...st.notifications] : st.notifications,
          activity: [{ id: uid(), type: "job", message: `${exists ? "Updated" : "Created"} job: ${j.title}`, date: now() }, ...st.activity].slice(0, 50),
        };
      }),
      deleteJob: (id) => set((st) => ({ jobs: st.jobs.filter((x) => x.id !== id) })),

      updateLead: (id, patch) => set((st) => ({ leads: st.leads.map((l) => l.id === id ? { ...l, ...patch } : l) })),
      deleteLead: (id) => set((st) => ({ leads: st.leads.filter((l) => l.id !== id) })),

      addMedia: (m) => set((st) => ({ media: [m, ...st.media] })),
      deleteMedia: (id) => set((st) => ({ media: st.media.filter((m) => m.id !== id) })),

      updateHome: (h) => set((st) => ({ home: { ...st.home, ...h }, activity: [{ id: uid(), type: "home", message: "Updated home content", date: now() }, ...st.activity].slice(0, 50) })),
      updateAbout: (a) => set((st) => ({ about: { ...st.about, ...a } })),
      updateSeo: (s) => set((st) => ({ seo: { ...st.seo, ...s } })),
      updateHeader: (h) => set((st) => ({ header: { ...st.header, ...h } })),
      updateFooter: (f) => set((st) => ({ footer: { ...st.footer, ...f } })),
      updateProfile: (p) => set((st) => ({ profile: { ...st.profile, ...p } })),

      markNotificationRead: (id) => set((st) => ({ notifications: st.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
      clearNotifications: () => set({ notifications: [] }),
      logActivity: (type, message) => set((st) => ({ activity: [{ id: uid(), type, message, date: now() }, ...st.activity].slice(0, 50) })),
    }),
    { name: "poppinion-admin", version: 1 }
  )
);

export const newId = uid;
export const nowIso = now;
