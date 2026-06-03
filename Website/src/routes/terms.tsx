import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Poppinion Solutions" }] }),
  component: () => (
    <>
      <PageHero title="Terms & Conditions" subtitle="The rules for using our website and services." />
      <article className="mx-auto max-w-3xl px-6 pb-20 text-sm leading-relaxed text-foreground/80">
        <p>By using this website you agree to these terms. Please read them carefully.</p>
        <h2 className="mt-8 text-xl font-bold text-navy">Use of services</h2>
        <p className="mt-2">Services are provided under engagement-specific scopes and proposals signed between you and Poppinion Solutions.</p>
        <h2 className="mt-6 text-xl font-bold text-navy">Intellectual property</h2>
        <p className="mt-2">All content on this site is owned by Poppinion Solutions unless otherwise noted.</p>
        <h2 className="mt-6 text-xl font-bold text-navy">Contact</h2>
        <p className="mt-2">Questions? Email hello@poppinion.com.</p>
      </article>
    </>
  ),
});
