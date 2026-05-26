import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import Timeline from "@/components/Timeline";
import Mafia from "@/components/Mafia";
import Work from "@/components/Work";
import MomentReel from "@/components/MomentReel";
import Reach from "@/components/Reach";
import Sponsorship from "@/components/Sponsorship";
import Journal from "@/components/Journal";
import Join from "@/components/Join";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <SiteNav />
      <Hero />
      <Mission />
      <Timeline />
      <Mafia />
      <Work />
      <MomentReel />
      <Reach />
      <Sponsorship />
      <Journal />
      <Join />
      <Footer />
    </main>
  );
};

export default Index;
