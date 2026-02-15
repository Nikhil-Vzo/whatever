import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar, { type UserRole } from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ClientJourneySection from "@/components/sections/ClientJourneySection";
import BuilderDiscoverySection from "@/components/sections/BuilderDiscoverySection";
import StorySection from "@/components/sections/StorySection";
import FinaleSection from "@/components/sections/FinaleSection";

export default function Index() {
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <motion.div className="bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navbar onRoleChange={setUserRole} />

      {/* Hero Section */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative pt-20"
      >
        <HeroSection userRole={userRole} />
      </motion.div>

      {/* Role-specific sections */}
      {userRole === "customer" ? (
        <>
          {/* Customer Journey Section */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <ClientJourneySection />
          </section>

          {/* Available Builders Section */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <BuilderDiscoverySection />
          </section>
        </>
      ) : (
        <>
          {/* Builder Discovery Section - Available Projects */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <BuilderDiscoverySection isBuilderView={true} />
          </section>
        </>
      )}

      {/* Story Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <StorySection userRole={userRole} />
      </section>

      {/* Finale Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-slate-800 text-white">
        <FinaleSection userRole={userRole} />
      </section>
    </motion.div>
  );
}
