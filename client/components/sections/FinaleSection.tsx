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
    <div className="space-y-20">
      {/* Main message */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center space-y-8"
      >
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-300"
        >
          Where ambitious projects meet exceptional builders
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          {userRole === "customer"
            ? "Your Vision, Built Right"
            : "Your Next Project Awaits"}
          <br />
          <motion.span
            className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            on CivilConnect
          </motion.span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed"
        >
          {userRole === "customer"
            ? "Connect with top-tier builders and firms to bring your construction dreams to life with quality and precision."
            : "Access high-quality projects, compete fairly, and grow your construction business on India's leading platform."}
        </motion.p>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <motion.button
          variants={itemVariants}
          className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold flex items-center gap-2 hover:bg-slate-100 transition-colors"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {userRole === "customer" ? "Post Your First Project" : "Browse Available Bids"}
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.button
          variants={itemVariants}
          className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {userRole === "customer" ? "Find Builders" : "View My Proposals"}
        </motion.button>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent"
      />

      {/* Footer */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {/* Links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 sm:gap-8 text-slate-300"
        >
          {[
            { label: "About", href: "#" },
            { label: "Features", href: "#" },
            { label: "Builders", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Privacy", href: "#" },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative group"
              whileHover={{ x: 2 }}
            >
              {link.label}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gold-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Mail, href: "#" },
            { icon: Linkedin, href: "#" },
            { icon: Twitter, href: "#" },
          ].map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.href}
                className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center text-slate-300 hover:text-white hover:border-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Copyright */}
        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-slate-500"
        >
          © 2024 CivilConnect. Building the future together.
        </motion.p>
      </motion.div>
    </div>
  );
}
