import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar, { type UserRole } from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ClientJourneySection from "@/components/sections/ClientJourneySection";
import BuilderDiscoverySection from "@/components/sections/BuilderDiscoverySection";
import StorySection from "@/components/sections/StorySection";
import FinaleSection from "@/components/sections/FinaleSection";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Index() {
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  // Handle Initial Load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle Tab Switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleRoleChange = (newRole: UserRole) => {
    if (newRole !== userRole) {
      setIsLoading(true);
      setUserRole(newRole);
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  return (
    <motion.div className="bg-background text-foreground overflow-x-hidden">
      <LoadingOverlay isVisible={isLoading} />

      {/* Navigation */}
      <Navbar selectedRole={userRole} onRoleChange={handleRoleChange} />

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
          {/* Customer: Post Projects Section */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <ClientJourneySection />
          </section>

          {/* Customer: Browse Builders Section */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-background/50">
            <BuilderDiscoverySection />
          </section>
        </>
      ) : (
        <>
          {/* Builder: Browse Projects for Bidding */}
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-background/50">
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
