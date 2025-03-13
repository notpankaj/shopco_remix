import BrandSlider from "~/components/BrandSlider";
import HeroSection from "~/components/HeroSection";
import Navbar from "~/components/Navbar";
import OfferAds from "~/components/OfferAds";

const Index = () => {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <HeroSection />
      <BrandSlider />
    </div>
  );
};

export default Index;
