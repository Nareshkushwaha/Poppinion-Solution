import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Image, FileText, Users, Inbox, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Poppinion Admin" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [counts, setCounts] = useState({ services: 0, projects: 0, blogs: 0, jobs: 0, leads: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    try {
      // 1. Local storage se token nikalo (Chaabi)
      const token = localStorage.getItem("token"); 
      
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };

      // 2. SMART FETCH FUNCTION: Agar ek API fail ho, toh baki crash na ho
      const safeFetch = async (url: string, name: string) => {
        try {
          const res = await fetch(url, { headers });
          const data = await res.json();
          if (!data.success) {
            console.error(`❌ Backend Error in ${name}:`, data.message);
            return [];
          }
          return data.data || [];
        } catch (error) {
          console.error(`⚠️ Network Error in ${name}:`, error);
          return [];
        }
      };

      // 3. Sabko alag-alag safely fetch karo
      const [servicesData, portfolioData, blogsData, careersData, leadsData] = await Promise.all([
        safeFetch('http://localhost:5000/api/services', 'Services'),
        safeFetch('http://localhost:5000/api/portfolio', 'Portfolio'),
        safeFetch('http://localhost:5000/api/blogs', 'Blogs'),
        safeFetch('http://localhost:5000/api/careers', 'Careers'),
        safeFetch('http://localhost:5000/api/leads', 'Leads')
      ]);

      // 4. Data set karo (Jo API chalegi, uska data dikhega)
      setCounts({
        services: servicesData.length,
        projects: portfolioData.length,
        blogs: blogsData.length,
        jobs: careersData.length,
        leads: leadsData.length,
      });

      setRecentLeads(leadsData.slice(0, 5));
      setRecentProjects(portfolioData.slice(0, 5));
      
    } catch (error) {
      console.error("Dashboard general error:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Total Services", value: counts.services, icon: Briefcase, color: "from-brand to-brand-dark", href: "/admin/services" },
    { label: "Portfolio Projects", value: counts.projects, icon: Image, color: "from-brand-accent to-orange-600", href: "/admin/portfolio" },
    { label: "Total Blogs", value: counts.blogs, icon: FileText, color: "from-emerald-500 to-emerald-700", href: "/admin/blog" }, 
    { label: "Total Careers", value: counts.jobs, icon: Users, color: "from-purple-500 to-purple-700", href: "/admin/careers" },
    { label: "Total Leads", value: counts.leads, icon: Inbox, color: "from-pink-500 to-pink-700", href: "/admin/leads" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Here is the summary of your website content.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={s.href}>
                <Card className="p-5 hover:shadow-lg transition-all hover:-translate-y-0.5 group">
                  <div className={`size-10 rounded-lg bg-gradient-to-br ${s.color} grid place-items-center text-white mb-3`}>
                    <Icon className="size-5" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight">{s.value}</p>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <SectionHeader title="Recent Leads" href="/admin/leads" />
          <div className="mt-4 divide-y">
            {recentLeads.map((l: any) => (
              <div key={l.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-sm">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.email} · {l.service}</p>
                </div>
                <Badge variant={l.status === "new" ? "default" : "secondary"}>
                  {l.status || "New"}
                </Badge>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">No leads yet.</p>}
          </div>
        </Card>

        <Card className="p-6">
          <SectionHeader title="Recent Projects" href="/admin/portfolio" />
          <div className="mt-4 space-y-3">
            {recentProjects.map((p: any) => (
              <div key={p.id} className="rounded-lg border p-4 hover:border-brand/40 transition">
                <p className="font-medium text-sm">{p.name || p.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.client} · {p.category}</p>
              </div>
            ))}
            {recentProjects.length === 0 && <p className="text-sm text-muted-foreground py-6 text-center">No projects yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-semibold">{title}</h3>
      {href && (
        <Link to={href} className="text-xs text-brand font-medium hover:underline inline-flex items-center gap-1">
          View all <ArrowUpRight className="size-3" />
        </Link>
      )}
    </div>
  );
}