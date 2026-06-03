import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — Poppinion Solutions" }] }),
  component: AboutPage,
});

// Timeline ka data photo ke hisaab se
const timeline = [
  { title: "Analysis", desc: "The best way to make sure you get your point across is to do some research in advance. You can also plan out what you want to cover and make sure your project flows well." },
  { title: "Design", desc: "Analysis is the process of gathering and comparing information about the web and its operation and use in order to improve the web's overall quality and to identify problem areas." },
  { title: "Development", desc: "Based on the data and result, we come up with a design mockup of your website and keep on working on it until you get that right." },
  { title: "Testing", desc: "After the design mocks up has been approved our developers start building the site." },
  { title: "Live", desc: "We continuously offer our support to ensure that the Project is Delivered." }
];

function AboutPage() {
  return (
    <div className="overflow-hidden bg-white">
      
      {/* 1. TOP BACKGROUND HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-border">
        <div className="absolute inset-0 z-0">
          {/* Yahan uploads folder se image aayegi */}
          <img src="public/uploads/about-hero.jpg" alt="About Background" className="w-full h-full object-cover" />
          {/* Background image ke upar halka sa white/blue blur taaki text clear dikhe */}
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" /> 
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-navy md:text-5xl">
            About us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-4 text-sm font-bold text-navy/70">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link> / <span className="text-primary">About us</span>
          </motion.p>
        </div>
      </section>

      {/* 2. SECTION: TEXT LEFT, IMAGE RIGHT */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-navy md:text-4xl leading-tight">Poppinion Solutions - <br />Your True Digital Partner!</h2>
            <div className="w-12 h-1 bg-primary mt-4 mb-6" />
            <div className="space-y-4 text-[13px] md:text-sm text-muted-foreground leading-relaxed">
              <p>Poppinion Solutions was built to cater to all client requirements with 100% accuracy, efficiency, and productivity. We provide a wider spectrum of Information Technology business solutions that meets every entrepreneur's custom requirements.</p>
              <p>Our 360-degree IT business solutions include everything that you, being the most concerned and responsible person of your business, could reckon of. We serve value to you in the form of potent web development, UI/UX designing, graphic designing, digital marketing, and many more worthwhile IT business services.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            {/* Uploads folder se Image 1 */}
            <img src="public/uploads/about-1.jpg" alt="Digital Partner" className="w-full rounded-xl shadow-elegant object-cover aspect-video md:aspect-[4/3] border border-border p-2 bg-slate-50" />
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION: IMAGE LEFT, TEXT RIGHT */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 relative">
            {/* Uploads folder se Vision Image */}
            <img src="public/uploads/vision.jpg" alt="Our Vision" className="w-full rounded-xl shadow-elegant object-cover aspect-video md:aspect-[4/3] border border-border bg-white p-2" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 text-left md:pl-8">
            <h2 className="text-2xl font-bold text-navy md:text-4xl">Our Vision</h2>
            <div className="w-12 h-1 bg-primary mt-4 mb-6" />
            <p className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">
              We all know the importance of flexibility in today's time, so we persistently strive for software development up-gradation along with innovative digital marketing & promotional approaches. We closely understand all possible concerns of our clients and thus, attempt to content them by providing 360-degree assistance before, during, and even after the completion of their projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. HOVER TO BLUE TIMELINE SECTION */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="relative">
            {/* Center Dashed Line */}
            <div className="absolute left-[15px] md:left-1/2 top-4 bottom-4 w-0 border-l-2 border-dashed border-border md:-translate-x-1/2" />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-12 md:mb-16 last:mb-0 pl-12 md:pl-0"
              >
                {/* Center Hover Dot */}
                <div className="absolute left-[15px] md:left-1/2 -translate-x-1/2 mt-1.5 md:mt-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-border group-hover:bg-primary group-hover:ring-4 group-hover:ring-primary/20 transition-all duration-300 z-10" />

                {/* Alternating Layout Logic */}
                {i % 2 === 0 ? (
                  <>
                    <div className="w-full md:w-[45%] md:pr-12 text-left md:text-right order-2 md:order-1">
                      <div className="p-5 border border-border bg-white rounded-xl shadow-sm group-hover:border-primary group-hover:shadow-md transition-all duration-300 relative inline-block w-full">
                        <p className="text-[13px] text-muted-foreground group-hover:text-navy transition-colors">{item.desc}</p>
                        {/* Desktop Arrow Right */}
                        <div className="hidden md:block absolute top-1/2 -right-[6px] -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-border group-hover:border-primary rotate-45 transition-colors" />
                        {/* Mobile Arrow Left */}
                        <div className="md:hidden absolute top-[20px] -left-[6px] -translate-y-1/2 w-3 h-3 bg-white border-b border-l border-border group-hover:border-primary rotate-45 transition-colors" />
                      </div>
                    </div>
                    <div className="w-full md:w-[45%] md:pl-12 text-left order-1 md:order-2 mb-3 md:mb-0">
                      <h4 className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full md:w-[45%] md:pl-12 text-left order-2 md:order-2">
                      <div className="p-5 border border-border bg-white rounded-xl shadow-sm group-hover:border-primary group-hover:shadow-md transition-all duration-300 relative inline-block w-full">
                        <p className="text-[13px] text-muted-foreground group-hover:text-navy transition-colors">{item.desc}</p>
                        {/* Desktop & Mobile Arrow Left */}
                        <div className="absolute top-[20px] md:top-1/2 -left-[6px] -translate-y-1/2 w-3 h-3 bg-white border-b border-l border-border group-hover:border-primary rotate-45 transition-colors" />
                      </div>
                    </div>
                    <div className="w-full md:w-[45%] md:pr-12 text-left md:text-right order-1 md:order-1 mb-3 md:mb-0">
                      <h4 className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-brand p-10 text-center text-white shadow-glow mx-6">
          <Users className="mx-auto mb-4 h-10 w-10" />
          <h2 className="text-3xl font-bold md:text-4xl">Let's build something worth talking about.</h2>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-navy hover:scale-105 transition-transform">Start a project</Link>
        </div>
      </section>

    </div>
  );
}