import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogs } from "@/lib/site-data";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const b = blogs.find((x) => x.slug === params.slug);
    if (!b) throw notFound();
    return b;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Post"} — Poppinion Solutions` }, { name: "description", content: loaderData?.excerpt ?? "" }] }),
  notFoundComponent: () => <div className="grid min-h-screen place-items-center"><Link to="/blog" className="text-primary">← Back</Link></div>,
  component: BlogPost,
});

function BlogPost() {
  const b = Route.useLoaderData();
  return (
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" /> All posts</Link>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">{b.category}</span><span>•</span><span>{b.date}</span>
        </div>
        <h1 className="mt-3 text-4xl font-bold text-navy md:text-5xl">{b.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{b.excerpt}</p>
      </div>
      <div className="mx-auto mt-8 max-w-5xl px-6">
        <img src={b.image} alt={b.title} className="aspect-[16/9] w-full rounded-3xl object-cover shadow-elegant" />
      </div>
      <div className="mx-auto mt-12 max-w-3xl px-6 pb-20 text-base leading-relaxed text-foreground/85">
        <p>{b.content}</p>
        <p className="mt-4">More content coming soon — this is a starter article that the team can extend through the editor.</p>
      </div>
    </article>
  );
}
