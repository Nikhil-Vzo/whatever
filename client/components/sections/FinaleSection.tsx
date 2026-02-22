import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Twitter } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface FinaleSectionProps {
  userRole?: UserRole;
}

export default function FinaleSection({ userRole = "customer" }: FinaleSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="space-y-32">
      {/* Main message */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center space-y-12"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm font-black uppercase tracking-[0.5em] text-primary"
        >
          The Pinnacle of Construction
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-7xl lg:text-9xl font-black text-foreground leading-[0.9] sm:leading-[0.85] tracking-tighter"
        >
          {userRole === "customer"
            ? "Your Vision, Refined."
            : "Your Next Legacy Awaits."}
          <br />
          <motion.span
            className="text-primary italic font-heading"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            on CivilConnect
          </motion.span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground/40 max-w-2xl mx-auto leading-relaxed font-medium px-4"
        >
          {userRole === "customer"
            ? "Join an elite network of project owners who demand nothing less than architectural perfection."
            : "Collaborate on India's most prestigious projects and define the landscape of tomorrow."}
        </motion.p>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center px-4"
      >
        <motion.button
          variants={itemVariants}
          className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(184,134,11,0.25)] flex items-center justify-center"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {userRole === "customer" ? "Initiate Your Project" : "Access Projects"}
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2" />
        </motion.button>

        <motion.button
          variants={itemVariants}
          className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-white/5 backdrop-blur-3xl border border-white/5 text-foreground/60 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center"
          whileHover={{ scale: 1.05, y: -4, color: "white" }}
          whileTap={{ scale: 0.95 }}
        >
          {userRole === "customer" ? "Elite Builders" : "Your Portfolio"}
        </motion.button>
      </motion.div>

      {/* Footer Meta */}
      <div className="pt-24 pb-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 py-12 border-t border-primary/10 text-center md:text-left">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="CivilConnect Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="font-heading text-2xl sm:text-3xl font-black tracking-tighter text-foreground">
              Civil<span className="text-primary italic">Connect</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-[9px] sm:text-[10px] font-black tracking-[0.2em] sm:tracking-[0.3em] text-foreground/30 uppercase">
            {["About", "Portfolio", "Firms", "Inquiry"].map((item) => (
              <a key={item} href="#" className="hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex gap-5">
            {[Mail, Linkedin, Twitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            ))}
          </div>
        </div>
        <p className="text-center text-[9px] sm:text-[10px] font-black text-foreground/10 tracking-[0.3em] sm:tracking-[0.5em] uppercase">
          © 2024 CivilConnect. A Legacy in the Making.
        </p>
      </div>
    </div>

  );
}
