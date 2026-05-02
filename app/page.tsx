import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import ToolPreviewSection from "@/components/landing/ToolPreviewSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "AI SEO Tool — Free AI-Powered SEO Toolkit",
  description:
    "Free AI-powered SEO toolkit for bloggers, agencies & businesses. Keyword research, meta title & description generator, content scorer, and readability checker — all in one place.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ToolPreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
