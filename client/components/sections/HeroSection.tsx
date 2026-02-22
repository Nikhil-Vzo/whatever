import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, HardHat, Building2, Ruler, ShieldCheck } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface HeroSectionProps {
  userRole?: UserRole;
}

const stats = [
  { value: "500+", label: "Projects Delivered", icon: Building2 },
  { value: "98%", label: "Client Satisfaction", icon: ShieldCheck },
  { value: "150+", label: "Verified Builders", icon: HardHat },
  { value: "₹200Cr+", label: "Project Value", icon: Ruler },
];

export default function HeroSection({ userRole = "customer" }: HeroSectionProps) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Construction Video — desktop only */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-[0.15]"
        >
          <source
            src="https://player.vimeo.com/external/494252666.sd.mp4?s=7249419ab0d5079c6d44521873e3bf1a98089456&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

        {/* Blueprint grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Animated diagonal construction stripes — subtle */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[repeating-linear-gradient(90deg,#f59e0b,#f59e0b_30px,#1a1a1a_30px,#1a1a1a_50px)] opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[repeating-linear-gradient(90deg,#f59e0b,#f59e0b_30px,#1a1a1a_30px,#1a1a1a_50px)] opacity-30" />

        {/* Dynamic Glow Overlay */}
        <motion.div
          className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.06),transparent_70%)]"
          style={{
            x: useTransform(mouseX, [0, 2000], [-15, 15]),
            y: useTransform(mouseY, [0, 1000], [-15, 15]),
          }}
        />

        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-6xl w-full text-center space-y-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <HardHat className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-black tracking-[0.25em] uppercase text-amber-500/90">
              India's Premier Construction Platform
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-foreground leading-[0.9] tracking-tighter"
        >
          {userRole === "customer" ? (
            <>
              Build Your{" "}
              <span className="relative inline-block">
                <span className="text-amber-500">Dream</span>
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[3px] bg-amber-500/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.2 }}
                />
              </span>
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">With Confidence</span>
            </>
          ) : (
            <>
              Win Premium{" "}
              <span className="relative inline-block">
                <span className="text-amber-500">Projects</span>
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[3px] bg-amber-500/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.2 }}
                />
              </span>
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">Grow Your Firm</span>
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          {userRole === "customer"
            ? "Connect with verified builders, compare bids transparently, and track every milestone — from foundation to finishing."
            : "Access curated high-value projects, submit competitive bids, and build your reputation on India's fastest-growing construction marketplace."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            className="w-full sm:w-auto group px-10 sm:px-14 py-4 sm:py-5 bg-amber-500 text-black rounded-full font-black flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(245,158,11,0.25)] hover:bg-amber-400 transition-colors text-sm sm:text-base uppercase tracking-wider"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Post Your Project" : "Explore Projects"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            className="w-full sm:w-auto px-10 sm:px-14 py-4 sm:py-5 bg-card border border-border text-foreground/80 rounded-full font-black hover:bg-secondary/30 transition-all uppercase tracking-wider text-sm"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Browse Builders" : "View Proposals"}
          </motion.button>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="pt-12 sm:pt-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="text-center space-y-2 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
