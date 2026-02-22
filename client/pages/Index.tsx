import { useState, useEffect } from "react";
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
    <div className="bg-background text-foreground overflow-x-hidden">
      <LoadingOverlay isVisible={isLoading} />

      {/* Navigation */}
      <Navbar selectedRole={userRole} onRoleChange={handleRoleChange} />

      {/* Hero Section */}
      <HeroSection userRole={userRole} />

      {/* Role-specific sections */}
      {userRole === "customer" ? (
        <>
          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <ClientJourneySection />
          </section>

          <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
            <BuilderDiscoverySection />
          </section>
        </>
      ) : (
        <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
          <BuilderDiscoverySection isBuilderView={true} />
        </section>
      )}

      {/* Story Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8">
        <StorySection userRole={userRole} />
      </section>

      {/* Finale Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-[#022333] text-foreground">
        <FinaleSection userRole={userRole} />
      </section>
    </div>
  );
}
