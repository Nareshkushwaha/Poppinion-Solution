import { brands } from "@/lib/site-data";

export function TrustedBrands() {
  const items = [...brands, ...brands];
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Trusted by ambitious brands</p>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee gap-12">
            {items.map((b, i) => (
              <span key={i} className="whitespace-nowrap text-xl font-bold tracking-widest text-navy/30 transition hover:text-primary md:text-2xl">{b}</span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
