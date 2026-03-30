'use client';

import { useEffect, useState } from 'react';
import { fetchHomeData, HomeResponse } from '../services/api';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../components/Header'), { ssr: false });
const HeroSplit = dynamic(() => import('../components/HeroSplit'), { ssr: false });

import MegaBanner from '../components/MegaBanner';
import PrizesCarousel from '../components/PrizesCarousel';
import Countdown from '../components/Countdown';
import PricingCards from '../components/PricingCards';
import SpecialEvents from '../components/SpecialEvents';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

export default function Home() {
  const [data, setData] = useState<HomeResponse | null>(null);

  useEffect(() => {
    fetchHomeData().then(setData);
  }, []);

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
