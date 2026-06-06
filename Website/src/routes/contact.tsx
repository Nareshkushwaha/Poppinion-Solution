import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "@/config"; 
import { toast } from "sonner"; // Agar notification ke liye sonner use kar rahe ho

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Poppinion Solutions" }, { name: "description", content: "Book a free consult or send us a note." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Backend ke "leads" ya "contacts" endpoint par POST request
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setSent(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        toast.success("Message sent successfully!");
        // 5 second baad success message hata denge
        setTimeout(() => setSent(false), 5000);
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Form submit error", error);
      toast.error("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="overflow-hidden bg-slate-50 min-h-screen">
      {/* CUSTOM HERO WITH BACKGROUND IMAGE */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-border bg-white">
        <div className="absolute inset-0 z-0">
          {/* Ye image tumhare public/uploads folder se aayegi */}
          <img src="/uploads/contact-bg.jpg" alt="Contact Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">Contact Us</p>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-navy md:text-4xl capitalize">
            Let's <span className="text-gradient-brand">Build</span> Together.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 text-sm md:text-base text-muted-foreground capitalize">
            Tell Us About Your Goals — We'll Get Back Within 24 Hours.
          </motion.p>
        </div>
      </section>

      <section className="pb-20 pt-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.2fr_1fr]">
          
          {/* DYNAMIC FORM */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-white p-6 shadow-soft md:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" value={formData.name} onChange={handleChange} required />
              <Field label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <Field label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
              <Field label="Service interested in" name="service" value={formData.service} onChange={handleChange} />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-xs font-semibold text-navy">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5} 
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
                placeholder="Tell us about your project..." 
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant transition hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : (
                <><Send className="h-4 w-4" /> Send Message</>
              )}
            </button>
            
            {sent && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                <p className="text-sm font-medium text-green-700">Thanks — we've received your message and will be in touch shortly.</p>
              </motion.div>
            )}
          </motion.form>

          {/* CONTACT INFO */}
          <div className="space-y-4">
            {[
              { Icon: Phone, title: "Call Us", value: "+919654786026" },
              { Icon: Mail, title: "Email Us", value: "popinionsolutions@gmail.com" },
              { Icon: MapPin, title: "Visit Us", value: "Jaipur Rajasthan, India" },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft transition hover:shadow-md hover:border-primary/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><c.Icon className="h-5 w-5" /></div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{c.title}</p>
                  <p className="text-sm font-bold text-navy mt-0.5">{c.value}</p>
                </div>
              </div>
            ))}
            <div className="rounded-2xl bg-gradient-brand p-6 text-white shadow-elegant">
              <h3 className="text-lg font-bold">Office Hours</h3>
              <p className="mt-2 text-sm text-white/80">Mon – Fri, 10:00 – 19:00 IST</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// Custom Field Component (with onChange & value)
function Field({ label, name, type = "text", value, onChange, required = false }: { label: string; name: string; type?: string; value: string; onChange: any; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-navy">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        name={name} 
        type={type} 
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-shadow" 
      />
    </div>
  );
}