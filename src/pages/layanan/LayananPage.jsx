import LayananHero from "./sections/LayananHero.jsx";
import FeaturedServices from "./sections/FeaturedServices.jsx";
import JoinBanner from "./sections/JoinBanner.jsx";
import ServiceCarousel from "./ServiceCarousel.jsx";
import HowItWorks from "./sections/HowItWorks.jsx";
import ForWhom from "./sections/ForWhom.jsx";
import ServiceFaq from "./sections/ServiceFaq.jsx";
import ServiceCta from "./sections/ServiceCta.jsx";
import "../../styles/mint.css";
import "./LayananPage.css";
import "./sections/LayananSections.css";

export default function LayananPage() {
  return (
    <>
      <LayananHero />
      <FeaturedServices />
      <JoinBanner />

      <ServiceCarousel />
      <HowItWorks />
      <ForWhom />
      <ServiceFaq />
      <ServiceCta />
    </>
  );
}
