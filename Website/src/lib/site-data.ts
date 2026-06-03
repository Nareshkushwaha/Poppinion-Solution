import { Search, Megaphone, Target, Code, Palette, Video, FileText, Sparkles } from "lucide-react";

export const services = [
  { slug: "seo", name: "SEO", icon: Search, image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80", short: "Rank higher, get found faster.", description: "Technical SEO, on-page, and authority building that compounds traffic month over month." },
  { slug: "google-ads", name: "Google Ads", icon: Target, image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80", short: "Performance ads built to convert.", description: "Search, Display, Shopping & YouTube Ads engineered for ROAS." },
  { slug: "social-media", name: "Social Media Marketing", icon: Megaphone, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80", short: "Scroll-stopping social campaigns.", description: "Content, community, and paid social that build real brand love." },
  { slug: "web-development", name: "Website Development", icon: Code, image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80", short: "Sites that load fast and sell faster.", description: "Modern websites & web apps engineered for performance and conversions." },
  { slug: "branding", name: "Branding", icon: Palette, image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80", short: "Identity systems that stand out.", description: "Strategy, visual identity, and brand guidelines that scale." },
  { slug: "video-editing", name: "Video Editing", icon: Video, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80", short: "Reels, ads, and brand films.", description: "Cinematic editing for ads, reels, podcasts, and brand films." },
  { slug: "content-marketing", name: "Content Marketing", icon: FileText, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80", short: "Content that ranks & converts.", description: "Blogs, scripts, and thought leadership built on SEO + storytelling." },
  { slug: "public-opinion", name: "Public Opinion Marketing", icon: Sparkles, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80", short: "Shape narratives at scale.", description: "Reputation, PR, and influence campaigns that move the needle." },
];

export const portfolio = [
  { slug: "fintech-launch", title: "Fintech Launch Campaign", client: "Vault Pay", category: "Performance Marketing", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1600&q=80"], description: "12x ROAS on a launch campaign across Google and Meta with a 40% CAC reduction.", results: ["12x ROAS", "40% lower CAC", "2.3M reach"] },
  { slug: "dtc-skincare", title: "DTC Skincare Rebrand", client: "Glow Lab", category: "Branding & Web", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80", "https://images.unsplash.com/photo-1522335789203-aaa2f6e74e25?w=1600&q=80", "https://images.unsplash.com/photo-1607602132700-068258431c6c?w=1600&q=80"], description: "Full rebrand + Shopify build that lifted conversion rate by 3.2x.", results: ["+320% CVR", "+180% AOV", "Sold out launch"] },
  { slug: "saas-seo", title: "SaaS SEO Growth", client: "Linkflow", category: "SEO", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"], description: "From 4k to 180k organic visitors/mo through technical SEO + content velocity.", results: ["45x traffic", "Top 3 on 220 keywords", "$1.2M ARR sourced"] },
  { slug: "creator-launch", title: "Creator IP Launch", client: "Studio 9", category: "Social + Video", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80", "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1600&q=80"], description: "Reel-led launch that drove 18M views in 30 days.", results: ["18M views", "+220k followers", "Brand deals secured"] },
  { slug: "edtech-app", title: "EdTech App Growth", client: "Learnly", category: "Web + Ads", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"], description: "App install campaign that scaled to 250k installs at $0.42 CPI.", results: ["250k installs", "$0.42 CPI", "4.8 store rating"] },
  { slug: "d2c-fashion", title: "D2C Fashion Scale", client: "North & Co.", category: "Performance", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80", gallery: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"], description: "Scaled spend 8x while improving ROAS by 60% in 6 months.", results: ["8x spend", "+60% ROAS", "Category leader"] },
];

export const blogs = [
  { slug: "seo-2026-trends", title: "SEO in 2026: What Actually Moves Rankings", date: "May 2026", category: "SEO", image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80", excerpt: "The signals that compound, the tactics that don't, and a playbook to win the year.", content: "AI overviews, topical authority, and entity SEO are reshaping the game. Here's the playbook teams are using to win in 2026..." },
  { slug: "meta-ads-creative", title: "The Meta Ads Creative Formula That Just Works", date: "Apr 2026", category: "Ads", image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&q=80", excerpt: "Creative is the new targeting. Here's the framework we use across $20M+ in ad spend.", content: "Hook in 3s, value in 9s, CTA in 15s. The formula that converts cold traffic..." },
  { slug: "brand-system", title: "Why Your Brand Needs a System, Not a Logo", date: "Mar 2026", category: "Branding", image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80", excerpt: "A logo is a logo. A brand system scales. Here's how to build one.", content: "Color, type, motion, voice — a true brand system makes every touchpoint compound..." },
  { slug: "shorts-strategy", title: "A Reels & Shorts Strategy That Compounds", date: "Feb 2026", category: "Social", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80", excerpt: "Volume + iteration + format mastery. Here's the cadence that works.", content: "5 posts/week, 3 formats, 1 hook test. The cadence that builds reach..." },
];

export const jobs = [
  { slug: "performance-marketer", title: "Performance Marketer", department: "Marketing", location: "Remote / Delhi", type: "Full-time", experience: "3-5 years", description: "Own paid media strategy across Google & Meta for D2C and SaaS brands." },
  { slug: "senior-frontend", title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time", experience: "4+ years", description: "Build delightful, fast web experiences with React, Tailwind, and Framer Motion." },
  { slug: "brand-designer", title: "Brand Designer", department: "Design", location: "Delhi", type: "Full-time", experience: "2-4 years", description: "Craft identity systems and campaign visuals for ambitious brands." },
  { slug: "video-editor", title: "Video Editor", department: "Creative", location: "Delhi", type: "Full-time", experience: "2+ years", description: "Edit short-form video and ads that stop the scroll." },
  { slug: "seo-strategist", title: "SEO Strategist", department: "Marketing", location: "Remote", type: "Full-time", experience: "3+ years", description: "Drive organic growth through technical SEO, content, and authority building." },
];

export const testimonials = [
  { name: "Aarav Mehta", role: "Founder, Vault Pay", quote: "Poppinion didn't just run ads — they built our growth engine. ROAS went from 2x to 12x in 90 days.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Priya Sharma", role: "CMO, Glow Lab", quote: "The rebrand and Shopify build paid for itself in week one. Premium work, premium team.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "Rohan Kapoor", role: "CEO, Linkflow", quote: "45x organic growth in 12 months. They are the partner every SaaS founder wishes they had.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
];

export const stats = [
  { label: "Brands scaled", value: 120, suffix: "+" },
  { label: "Avg ROAS", value: 8, suffix: "x" },
  { label: "Revenue driven", value: 50, suffix: "M+" },
  { label: "Years of craft", value: 7, suffix: "" },
];

export const process = [
  { step: "01", title: "Research", description: "We dive deep into your market, audience, and competitive landscape to find unfair advantages." },
  { step: "02", title: "Strategy", description: "Channel mix, messaging, funnels, and KPIs — engineered around your business model." },
  { step: "03", title: "Execution", description: "Production-grade creative, full-funnel campaigns, and a website built to convert." },
  { step: "04", title: "Growth", description: "Iterate weekly. Compound monthly. We obsess over the numbers so you can focus on building." },
];

export const needle = [
  { title: "Video Advertising", description: "Hook-led video that performs across platforms.", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80" },
  { title: "Reels & Shorts", description: "Short-form content built for reach and retention.", image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80" },
  { title: "Podcast Promotions", description: "Be where conversations and trust happen.", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80" },
  { title: "Media Bytes", description: "PR, mentions, and earned media coverage.", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
  { title: "Creative Posters", description: "Static creative that stops the scroll.", image: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=800&q=80" },
  { title: "Sponsored Campaigns", description: "Creator and influencer-led campaigns.", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80" },
  { title: "Viral Marketing", description: "Engineered moments designed to spread.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80" },
];

export const faqs = [
  { q: "What does Poppinion Solutions do?", a: "We're a full-stack growth partner — performance marketing, SEO, branding, web & app development, and creative production." },
  { q: "How quickly can we start?", a: "Most engagements kick off within 1 week of discovery. For urgent launches we can move faster." },
  { q: "Do you work with startups or enterprises?", a: "Both — from seed-stage D2C brands to global SaaS companies. The playbook adapts to your stage." },
  { q: "What does pricing look like?", a: "Project, retainer, or performance-based — depending on scope. Book a free consult and we'll tailor it." },
  { q: "Do you offer reporting?", a: "Weekly dashboards, monthly strategy reviews, and direct Slack access. You always know what's happening." },
];

export const brands = ["NORTH&CO", "VAULT PAY", "GLOW LAB", "LINKFLOW", "LEARNLY", "STUDIO 9", "ATLAS", "NIMBUS", "ORBIT"];
