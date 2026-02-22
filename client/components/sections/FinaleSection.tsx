import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Twitter, Phone, MapPin, HardHat, Instagram } from "lucide-react";
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
    <div className="space-y-24">
      {/* CTA Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center space-y-10"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <HardHat className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black tracking-[0.25em] uppercase text-amber-500/90">
              Ready to Build?
            </span>
          </div>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-8xl font-black text-foreground leading-[0.9] tracking-tighter"
        >
          {userRole === "customer"
            ? "Your Dream Project"
            : "Your Next Big Win"}
          <br />
          <span className="text-amber-500 italic font-heading">
            Starts Here.
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground/40 max-w-2xl mx-auto leading-relaxed font-medium px-4"
        >
          {userRole === "customer"
            ? "Join thousands of project owners who've found their perfect builder on CivilConnect."
            : "Access premium construction projects and scale your firm with CivilConnect."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-amber-500 text-black rounded-full font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Post Your Project" : "Browse Projects"}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="w-full sm:w-auto px-10 sm:px-14 py-5 sm:py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-foreground/70 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/10 hover:text-foreground transition-all"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Browse Builders" : "Your Dashboard"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <div className="pt-16 pb-8">
        {/* Construction stripe divider */}
        <div className="h-[2px] bg-[repeating-linear-gradient(90deg,rgba(245,158,11,0.3),rgba(245,158,11,0.3)_20px,transparent_20px,transparent_30px)] mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <HardHat className="w-5 h-5 text-amber-500" />
              </div>
              <span className="font-heading text-2xl font-black tracking-tighter text-foreground">
                Civil<span className="text-amber-500 italic">Connect</span>
              </span>
            </div>
            <p className="text-sm text-foreground/30 leading-relaxed max-w-xs">
              India's premier construction marketplace. Connecting project owners with verified builders since 2024.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Instagram, label: "Instagram" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: SocialIcon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground/30 hover:text-amber-500 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <SocialIcon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-foreground/50">Platform</h4>
            <div className="space-y-3">
              {["Post Project", "Find Builders", "Pricing", "How It Works"].map((item) => (
                <a key={item} href="#" className="block text-sm text-foreground/25 hover:text-amber-500 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-foreground/50">Company</h4>
            <div className="space-y-3">
              {["About Us", "Careers", "Blog", "Press Kit"].map((item) => (
                <a key={item} href="#" className="block text-sm text-foreground/25 hover:text-amber-500 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-foreground/50">Legal</h4>
            <div className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <a key={item} href="#" className="block text-sm text-foreground/25 hover:text-amber-500 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-black tracking-[0.2em] uppercase text-foreground/50">Contact</h4>
            <div className="space-y-3 text-sm text-foreground/25">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500/50" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500/50" />
                <span>hello@civilconnect.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500/50 mt-0.5 flex-shrink-0" />
                <span>Raipur, Chhattisgarh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/5">
          <p className="text-[10px] font-bold text-foreground/15 tracking-[0.3em] uppercase">
            © 2026 CivilConnect. Building India's Future.
          </p>
          <p className="text-[10px] text-foreground/10 tracking-wider">
            Made with 🧱 in India
          </p>
        </div>
      </div>
    </div>
  );
}
