import { fetchHomeData } from '../services/api';
import Header from '../components/Header';
import MegaBanner from '../components/MegaBanner';
import HeroSplit from '../components/HeroSplit';
import PrizesCarousel from '../components/PrizesCarousel';
import Countdown from '../components/Countdown';
import PricingCards from '../components/PricingCards';
import SpecialEvents from '../components/SpecialEvents';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

export default async function Home() {
  const data = await fetchHomeData();

  // Sort packages by ID to maintain correct tier order matching visually
  const packages = data?.package ? [...data.package].sort((a, b) => a.id - b.id) : [];

  return (
    <>
      <Header />
      <MegaBanner />
      <HeroSplit />
      <PrizesCarousel />
      <Countdown />
      <PricingCards packages={packages} />
      <SpecialEvents />
      <FaqSection />

      <Footer />
    </>
  );
}
