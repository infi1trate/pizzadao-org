import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sliced/HeroSection";
import MetricsReveal from "@/components/sliced/MetricsReveal";
import SignalMap from "@/components/sliced/SignalMap";
import LocalSlice from "@/components/sliced/LocalSlice";
import BonusGameRecap from "@/components/sliced/BonusGameRecap";
import PhotoWall from "@/components/sliced/PhotoWall";
import PartnerImpact from "@/components/sliced/PartnerImpact";
import AwardsSection from "@/components/sliced/AwardsSection";
import ShareGenerator from "@/components/sliced/ShareGenerator";

const PizzaPartySliced = () => {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteNav />
      <HeroSection />
      <MetricsReveal />
      <SignalMap />
      <LocalSlice />
      <BonusGameRecap />
      <PhotoWall />
      <PartnerImpact />
      <AwardsSection />
      <ShareGenerator />
      <Footer />
    </main>
  );
};

export default PizzaPartySliced;
