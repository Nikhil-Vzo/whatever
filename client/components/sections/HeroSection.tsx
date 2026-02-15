import { motion, useMotionTemplate, useMotionValue, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface HeroSectionProps {
  userRole?: UserRole;
}

export default function HeroSection({ userRole = "customer" }: HeroSectionProps) {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-slate-100 to-slate-200">
        <img
          src="https://images.pexels.com/photos/3831681/pexels-photo-3831681.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
          alt="Construction site"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
          animate={{
            y: [0, 30, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-slate-800 rounded-full mix-blend-multiply filter blur-3xl opacity-3"
          animate={{
            y: [0, -30, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-2 border-slate-200 rounded-lg opacity-20"
        animate={{
          rotate: 360,
          y: [0, -20, 0],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 border-2 border-gold-300 opacity-20"
        animate={{
          rotate: -360,
          y: [0, 20, 0],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-40 h-40 border border-slate-300 opacity-10"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
        animate={{
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            className="inline-block px-4 py-2 rounded-full border border-gold-300 bg-gold-50"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium text-slate-700">
              ✨ The Future of Construction Collaboration
            </p>
          </motion.div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight"
        >
          {userRole === "customer" ? (
            <>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Find the Right
              </motion.span>{" "}
              <motion.span
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Builders
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.span>{" "}
              <br />
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                For Your Vision
              </motion.span>
            </>
          ) : (
            <>
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Discover Quality
              </motion.span>{" "}
              <motion.span
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Projects
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </motion.span>{" "}
              <br />
              <motion.span
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                to Bid On
              </motion.span>
            </>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {userRole === "customer"
            ? "Post your construction projects and get matched with vetted builders who bring excellence to every build."
            : "Access high-quality construction projects and showcase your expertise. Bid, negotiate, and grow your firm."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold flex items-center gap-2 premium-shadow hover:bg-slate-800 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Post a Project" : "Browse Projects"}
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {userRole === "customer" ? "Find Builders" : "View Your Bids"}
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 text-slate-400" />
      </motion.div>
    </section>
  );
}
