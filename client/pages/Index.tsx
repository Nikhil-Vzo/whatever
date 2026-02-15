import { useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ChevronDown, ArrowRight, MapPin, Building2, Zap } from "lucide-react";
import HeroSection from "@/components/sections/HeroSection";
import ClientJourneySection from "@/components/sections/ClientJourneySection";
import BuilderDiscoverySection from "@/components/sections/BuilderDiscoverySection";
import StorySection from "@/components/sections/StorySection";
import FinaleSection from "@/components/sections/FinaleSection";

export default function Index() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <motion.div className="bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative"
      >
        <HeroSection />
      </motion.div>

      {/* Client Journey Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <ClientJourneySection />
      </section>

      {/* Builder Discovery Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <BuilderDiscoverySection />
      </section>

      {/* Story Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <StorySection />
      </section>

      {/* Finale Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <FinaleSection />
      </section>
    </motion.div>
  );
}
