import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Users, Target, Trophy } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface StorySectionProps {
  userRole?: UserRole;
}

const customerSteps = [
  {
    icon: Zap,
    title: "Post Your Project",
    description: "Share your construction vision with detailed requirements and budget.",
  },
  {
    icon: Users,
    title: "Get Qualified Bids",
    description: "Receive competitive bids from vetted builders in your area.",
  },
  {
    icon: Target,
    title: "Compare & Negotiate",
    description: "Review proposals and negotiate terms directly with selected builders.",
  },
  {
    icon: Trophy,
    title: "Build Excellence",
    description: "Execute your project with expert oversight and quality assurance.",
  },
];

const builderSteps = [
  {
    icon: Zap,
    title: "Browse Projects",
    description: "Discover high-quality construction projects matched to your expertise.",
  },
  {
    icon: Users,
    title: "Submit Competitive Bids",
    description: "Present your pricing, timeline, and approach to project owners.",
  },
  {
    icon: Target,
    title: "Win & Negotiate",
    description: "Communicate directly with clients and finalize project terms.",
  },
  {
    icon: Trophy,
    title: "Execute & Grow",
    description: "Deliver excellence and build your reputation on the platform.",
  },
];

export default function StorySection({ userRole = "customer" }: StorySectionProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div ref={containerRef} className="space-y-20">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center space-y-4"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl font-bold text-slate-900"
        >
          How It Works
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg text-slate-600 max-w-2xl mx-auto">
          A seamless journey from vision to reality, every step designed with precision
        </motion.p>
      </motion.div>

      {/* Process timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-16"
      >
        {(userRole === "customer" ? customerSteps : builderSteps).map((step, index) => {
          const Icon = step.icon;
          const offsetIndex = useTransform(
            scrollYProgress,
            [0, 1],
            [100, -100 * (index + 1)]
          );

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex gap-8 sm:gap-12 items-start ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-7 h-7 text-slate-900" />
                    </motion.div>
                    <span className="text-sm font-semibold text-gold-500">
                      Step {index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual indicator */}
              <div className="hidden lg:block flex-1">
                <motion.div
                  className="w-full h-64 rounded-2xl bg-gradient-to-br from-gold-100 to-slate-100 border border-slate-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{ y: offsetIndex }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-2 border-slate-300 rounded-lg opacity-20"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.button
          className="px-8 py-4 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now
        </motion.button>
      </motion.div>
    </div>
  );
}
