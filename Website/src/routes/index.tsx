import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
// Dekho yahan se TrustedBrands ka import hata diya gaya hai
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { HowWeMoveTheNeedle } from "@/components/home/HowWeMoveTheNeedle";
import { PortfolioPreview, WhyChooseUs, FAQ } from "@/components/home/Sections"; 
import { ProcessTimeline } from "@/components/home/ProcessTimeline";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poppinion Solutions — Building Public Opinion Digitally" },
      { name: "description", content: "Premium digital marketing & growth agency. SEO, performance ads, branding, web development. We move the needle for ambitious brands." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col space-y-4 md:space-y-8 pb-10 overflow-x-hidden">
      <Hero />
      <ServicesGrid />
      <HowWeMoveTheNeedle />
      <PortfolioPreview />
      <WhyChooseUs />
      <ProcessTimeline />
      <FAQ />
    </div>
  );
}