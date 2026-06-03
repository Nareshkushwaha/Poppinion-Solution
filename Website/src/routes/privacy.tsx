import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Poppinion Solutions" }] }),
  component: () => (
    <>
      <PageHero title="Privacy Policy" subtitle="How we handle your information." />
      <article className="mx-auto max-w-3xl px-6 pb-20 text-sm leading-relaxed text-foreground/80">
        <p>We respect your privacy. This policy explains what data we collect, how we use it, and the choices you have.</p>
        <h2 className="mt-8 text-xl font-bold text-navy">Information we collect</h2>
        <p className="mt-2">Contact details you submit through forms, and basic analytics about how visitors use our site.</p>
        <h2 className="mt-6 text-xl font-bold text-navy">How we use it</h2>
        <p className="mt-2">To respond to enquiries, deliver services, and improve our website. We never sell your data.</p>
        <h2 className="mt-6 text-xl font-bold text-navy">Your choices</h2>
        <p className="mt-2">You can request access, correction, or deletion of your data at any time by emailing hello@poppinion.com.</p>
      </article>
    </>
  ),
});
