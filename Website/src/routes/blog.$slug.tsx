import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      // API_BASE_URL ki jagah direct url lagaya hai safety ke liye
      const res = await fetch(`http://localhost:5000/api/blogs`);
      const data = await res.json();
      
      if (data.success) {
        // Slug match karo aur sirf published dikhao
        const b = data.data.find((x: any) => x.slug === params.slug && x.status === 'published');
        
        if (b) {
          return b; // Blog mil gaya!
        }
      }
      // Agar nahi mila toh console mein bata dega
      console.log("Error: Ya toh slug match nahi hua ya blog published nahi hai.");
      throw notFound();
    } catch (error) {
      console.error("Blog fetch karne mein error:", error);
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Post"} — Poppinion Solutions` }, { name: "description", content: loaderData?.metaDescription ?? "" }] }),
  notFoundComponent: () => <div className="grid min-h-screen place-items-center"><Link to="/blog" className="text-primary hover:underline">← Back to Blogs</Link></div>,
  component: BlogPost,
});

function BlogPost() {
  const b = Route.useLoaderData();
  
  return (
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> All posts</Link>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">{b.category || "General"}</span>
          <span>•</span>
          <span>{b.createdAt ? new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently"}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold text-navy md:text-5xl">{b.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{b.metaDescription}</p>
      </div>
      
      <div className="mx-auto mt-8 max-w-5xl px-6">
        {b.featuredImage && (
          <img src={b.featuredImage} alt={b.title} className="aspect-[16/9] w-full rounded-3xl object-cover shadow-elegant" />
        )}
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-6 pb-20 text-base leading-relaxed text-foreground/85">
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: b.content }} />
      </div>
    </article>
  );
}