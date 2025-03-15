import BrandSlider from "~/components/app-components/BrandSlider";
import BrowserByStyles from "~/components/app-components/BrowserByStyles";
import Footer from "~/components/app-components/Footer";
import HeroSection from "~/components/app-components/HeroSection";
import HighlightReviews from "~/components/app-components/HighlightReviews";
import Navbar from "~/components/app-components/Navbar";
import NewArrivals from "~/components/app-components/NewArrivals";
import OfferAds from "~/components/app-components/OfferAds";

const Index = () => {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      <OfferAds />
      <Navbar />
      <HeroSection />
      <BrandSlider />
      <NewArrivals />
      <BrowserByStyles />
      <HighlightReviews />
      <Footer />
    </div>
  );
};

export default Index;
