import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface HeroSectionProps {
  userRole?: UserRole;
}

export default function HeroSection({ userRole = "customer" }: HeroSectionProps) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-36 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background overflow-hidden">
        {/* Premium Skyscraper Construction Video - PC Only */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden sm:block absolute inset-0 w-full h-full object-cover opacity-[0.25]"
        >
          <source
            src="https://player.vimeo.com/external/494252666.sd.mp4?s=7249419ab0d5079c6d44521873e3bf1a98089456&profile_id=165&oauth2_token_id=57447761"
            type="video/mp4"
          />
        </video>

        {/* Dynamic Glow Overlay */}
        <motion.div
          className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(184,134,11,0.08),transparent_70%)]"
          style={{
            x: useTransform(mouseX, [0, 2000], [-15, 15]),
            y: useTransform(mouseY, [0, 1000], [-15, 15]),
          }}
        />

        {/* Grain/Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-6xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl sm:text-7xl lg:text-9xl font-black text-foreground mb-6 sm:mb-8 leading-[0.9] sm:leading-[0.85] tracking-tighter"
        >
          {userRole === "customer" ? (
            <>
              Your Vision, <span className="text-primary italic">Refined</span>. <br className="hidden sm:block" />
              <span className="relative inline-block mt-1 sm:mt-2">
                Built to Last
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </span>
            </>
          ) : (
            <>
              Elevate Your <span className="text-primary italic">Legacy</span>. <br className="hidden sm:block" />
              <span className="relative inline-block mt-1 sm:mt-2">
                Win Bigger
                <motion.div
                  className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 1.5 }}
                />
              </span>
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-2xl text-foreground/50 mb-8 sm:mb-12 max-w-3xl mx-auto font-medium leading-relaxed px-4"
        >
          {userRole === "customer"
            ? "Collaborate with high-end builders who transform architecture into living art."
            : "Access exclusive high-ticket projects and demonstrate your firm's technical mastery."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center px-4"
        >
          <motion.button
            className="w-full sm:w-auto group px-8 sm:px-12 py-4 sm:py-5 bg-primary text-primary-foreground rounded-full font-black flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(184,134,11,0.25)]"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Post Your Project" : "Explore Projects"}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white/5 backdrop-blur-2xl border border-white/5 text-foreground/80 rounded-full font-black hover:bg-white/10 transition-all font-heading tracking-widest uppercase text-[10px] sm:text-sm"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Exquisite Builders" : "Review Proposals"}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
