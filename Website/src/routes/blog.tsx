import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config"; // LIVE READY URL

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — Poppinion Solutions" }, { name: "description", content: "Playbooks, frameworks, and lessons from scaling brands." }] }),
  component: BlogPage,
});

function BlogPage() {
  const [blogsList, setBlogsList] = useState<any[]>([]);

  // Database se Blogs fetch karne ka logic
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/blogs`);
        const data = await res.json();
        if (data.success) {
          // Sirf wo blogs dikhayenge jo admin ne 'published' kiye hain
          const published = data.data.filter((b: any) => b.status === 'published');
          setBlogsList(published);
        }
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      {/* CUSTOM HERO WITH BACKGROUND IMAGE & ANIMATION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border">
        <div className="absolute inset-0 z-0">
          {/* Ye image tumhare public/uploads folder se aayegi */}
          <img src="public/uploads/blog-bg.jpg" alt="Blog Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Blog</p>
          
          {/* Capitalize class se har word ka pehla letter bada ho jayega */}
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-navy md:text-4xl capitalize">
            Playbooks From The <span className="text-gradient-brand">Field</span>.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-sm md:text-base text-muted-foreground capitalize">
            Frameworks, Tactics, And Lessons We Use Every Day.
          </motion.p>
        </div>
      </section>

      {/* DYNAMIC BLOG CARDS SECTION */}
      <section className="pb-20 pt-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogsList.map((b, i) => (
            <motion.div key={b.slug || b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <Link to="/blog/$slug" params={{ slug: b.slug }} className="group block overflow-hidden rounded-xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                
                {/* 16:9 Aspect Ratio for Blog Cover Image */}
                <div className="aspect-[16/9] overflow-hidden bg-muted">
                  {b.coverImage ? (
                    <img src={b.coverImage} alt={b.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary capitalize">
                      {b.category || "General"}
                    </span>
                    {/* Agar admin ne date daali hai toh dikhegi, warna aaj ki date ya static text */}
                    <span>•</span>
                    <span>{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recently"}</span>
                  </div>
                  
                  {/* Title and Excerpt */}
                  <h3 className="mt-2 text-sm font-bold leading-snug text-navy line-clamp-2 capitalize">{b.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground capitalize">{b.excerpt || b.shortDescription || "Click to read more about this topic."}</p>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

        {/* Agar koi blog nahi hai toh ye message dikhega */}
        {blogsList.length === 0 && (
          <div className="text-center text-muted-foreground py-10">
            <p>No blogs published yet. Check back soon!</p>
          </div>
        )}
      </section>
    </>
  );
}