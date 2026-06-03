import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { Icon: Facebook, href: "https://facebook.com", color: "bg-[#1877F2]" },
  { Icon: Instagram, href: "https://instagram.com", color: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
  { Icon: Linkedin, href: "https://linkedin.com", color: "bg-[#0A66C2]" },
  { Icon: Youtube, href: "https://youtube.com", color: "bg-[#FF0000]" },
];

export function FloatingSocial() {
  return (
    <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {items.map(({ Icon, href, color }, i) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.15, x: -4 }}
          className={`grid h-11 w-11 place-items-center rounded-full text-white shadow-elegant ${color}`}
        >
          <Icon className="h-4 w-4" />
        </motion.a>
      ))}
    </div>
  );
}
