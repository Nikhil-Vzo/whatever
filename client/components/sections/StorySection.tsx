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

function StoryStepItem({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof customerSteps)[0];
  index: number;
  scrollYProgress: any;
}) {
  const Icon = step.icon;
  const offsetIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100 * (index + 1)]
  );

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      key={index}
      variants={itemVariants}
      className={`flex flex-col sm:flex-row gap-8 sm:gap-12 items-start ${index % 2 === 1 ? "sm:flex-row-reverse" : ""
        }`}
    >
      {/* Content */}
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Phase {index + 1}
            </span>
          </div>

          <div>
            <h3 className="text-3xl font-black text-foreground mb-3">
              {step.title}
            </h3>
            <p className="text-lg text-foreground/60 leading-relaxed font-medium">{step.description}</p>
          </div>
        </div>
      </div>

      {/* Visual indicator */}
      <div className="hidden lg:block flex-1">
        <motion.div
          className="w-full h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          style={{ y: offsetIndex }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <motion.span
              className="font-heading text-primary font-black tracking-widest uppercase text-[10px]"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Excellence Defined
            </motion.span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 border border-primary/10 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

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

  const steps = userRole === "customer" ? customerSteps : builderSteps;

  return (
    <div ref={containerRef} className="space-y-20">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center space-y-4 px-4"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-6xl font-black text-foreground"
        >
          How It <span className="text-secondary italic">Works</span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-foreground/60 max-w-2xl mx-auto font-medium"
        >
          A seamless journey from vision to reality, designed for peak collaboration.
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
        {steps.map((step, index) => (
          <StoryStepItem
            key={index}
            step={step}
            index={index}
            scrollYProgress={scrollYProgress}
          />
        ))}
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
          className="px-12 py-5 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-sm shadow-[0_15px_40px_rgba(184,134,11,0.2)]"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
        </motion.button>
      </motion.div>
    </div>
  );
}
