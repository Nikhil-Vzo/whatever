import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HardHat, FileText, Handshake, Shield, Hammer, ClipboardCheck, BadgeCheck, TrendingUp } from "lucide-react";
import type { UserRole } from "@/components/Navbar";

interface StorySectionProps {
  userRole?: UserRole;
}

const customerSteps = [
  {
    icon: FileText,
    title: "Blueprint Your Vision",
    description: "Submit your construction project with detailed specs, blueprints, and budget. Our system matches you with the right expertise.",
    accent: "#3b82f6",
    tag: "PROJECT INTAKE",
  },
  {
    icon: HardHat,
    title: "Vetted Crew Bids",
    description: "Receive competitive proposals from pre-qualified builders. Every contractor is background-checked and performance-rated.",
    accent: "#f59e0b",
    tag: "BIDDING PHASE",
  },
  {
    icon: Handshake,
    title: "Seal the Deal",
    description: "Compare bids side-by-side, negotiate terms, and lock in your preferred builder with transparent contracts.",
    accent: "#10b981",
    tag: "NEGOTIATION",
  },
  {
    icon: Shield,
    title: "Build with Confidence",
    description: "Track progress with milestone-based payments, quality inspections, and real-time site updates until completion.",
    accent: "#8b5cf6",
    tag: "EXECUTION",
  },
];

const builderSteps = [
  {
    icon: ClipboardCheck,
    title: "Scout Projects",
    description: "Browse curated construction opportunities filtered by your trade, capacity, location, and expertise level.",
    accent: "#3b82f6",
    tag: "DISCOVERY",
  },
  {
    icon: Hammer,
    title: "Place Your Bid",
    description: "Submit detailed proposals with your pricing, timeline, crew strength, and past project portfolio.",
    accent: "#f59e0b",
    tag: "PROPOSAL",
  },
  {
    icon: Handshake,
    title: "Win & Negotiate",
    description: "Communicate directly with project owners, finalize scope, and sign off on milestones and deliverables.",
    accent: "#10b981",
    tag: "CONTRACT",
  },
  {
    icon: TrendingUp,
    title: "Deliver & Grow",
    description: "Execute with excellence, earn verified reviews, and unlock priority access to premium projects.",
    accent: "#8b5cf6",
    tag: "GROWTH",
  },
];

function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: (typeof customerSteps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 35%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -60 : 60, 0]
  );
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Timeline connector line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block">
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-20 w-[2px] h-full"
            style={{
              background: `linear-gradient(to bottom, ${step.accent}40, transparent)`,
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />
        )}
      </div>

      <div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "" : "md:flex-row-reverse"
          }`}
      >
        {/* Content Card */}
        <motion.div
          style={{ opacity, x, scale }}
          className="flex-1 w-full"
        >
          <div
            className="relative bg-card border border-border rounded-2xl p-8 md:p-10 overflow-hidden group hover:border-opacity-60 transition-all duration-500"
            style={{
              boxShadow: `0 0 0 1px ${step.accent}10, 0 20px 40px ${step.accent}08`,
            }}
          >
            {/* Construction stripe accent top */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: `repeating-linear-gradient(90deg, ${step.accent}, ${step.accent} 20px, transparent 20px, transparent 30px)`,
              }}
            />

            {/* Phase tag */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-md"
                style={{
                  background: `${step.accent}15`,
                  color: step.accent,
                  border: `1px solid ${step.accent}30`,
                }}
              >
                {step.tag}
              </span>
              <span className="text-xs text-muted-foreground font-bold">
                PHASE {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
              {step.title}
            </h3>

            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              {step.description}
            </p>

            {/* Decorative blueprint grid */}
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill={`url(#grid-${index})`} />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Center Node */}
        <motion.div
          className="relative z-10 flex-shrink-0 order-first md:order-none"
          style={{ scale }}
        >
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative"
            style={{
              background: `linear-gradient(135deg, ${step.accent}20, ${step.accent}05)`,
              border: `2px solid ${step.accent}40`,
              boxShadow: `0 0 30px ${step.accent}15`,
            }}
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-8 h-8 md:w-9 md:h-9" style={{ color: step.accent }} />

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ border: `2px solid ${step.accent}` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            />
          </motion.div>

          {/* Step number */}
          <div
            className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
            style={{
              background: step.accent,
              color: "#000",
              boxShadow: `0 2px 10px ${step.accent}50`,
            }}
          >
            {index + 1}
          </div>
        </motion.div>

        {/* Empty space for alternating layout */}
        <div className="flex-1 hidden md:block" />
      </div>
    </div>
  );
}

export default function StorySection({ userRole = "customer" }: StorySectionProps) {
  const steps = userRole === "customer" ? customerSteps : builderSteps;
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start 80%", "start 40%"],
  });
  const headerOpacity = useTransform(headerProgress, [0, 1], [0, 1]);
  const headerY = useTransform(headerProgress, [0, 1], [40, 0]);

  return (
    <div className="space-y-20 md:space-y-28 max-w-6xl mx-auto px-4">
      {/* Header */}
      <motion.div
        ref={headerRef}
        style={{ opacity: headerOpacity, y: headerY }}
        className="text-center space-y-6"
      >
        {/* Construction badge */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border"
        >
          <HardHat className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground">
            The Process
          </span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-foreground uppercase tracking-tight leading-[0.95]">
          How We{" "}
          <span className="relative inline-block">
            <span className="text-muted-foreground italic">Build</span>
            {/* Underline accent */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-amber-500/60 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </span>
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          From blueprint to handover — a transparent, milestone-driven process
          designed for construction excellence.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-16 md:space-y-24 relative">
        {/* Central vertical line (desktop only) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-border via-border/50 to-transparent hidden md:block" />

        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center pt-8"
      >
        <motion.button
          className="px-12 py-5 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-sm shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:shadow-amber-500/10 transition-all"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Project
        </motion.button>
      </motion.div>
    </div>
  );
}
