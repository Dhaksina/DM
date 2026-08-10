import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { Magnet } from '../components/Magnet';
import { ContactButton } from '../components/ContactButton';

interface HeroSectionProps {
  headline?: string;
  highlight?: string;
  desc?: string;
  badge?: string;
  onContactClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline = "Hi,",
  highlight = "i'm jack",
  desc = "a 3d creator driven by crafting striking and unforgettable projects",
  badge,
  onContactClick,
}) => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to format the text dynamically, ensuring lowercase "i" formatting for Jack's default
  const renderHeadingText = (hl: string, hlt: string) => {
    const combined = `${hl} ${hlt}`.trim();
    if (combined.toLowerCase().includes("i'm jack") || combined.toLowerCase().includes("i’m jack")) {
      return (
        <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.85] whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5">
          HI, <span className="lowercase">i</span>&apos;M JACK
        </h1>
      );
    }
    return (
      <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.85] w-full text-[6vw] sm:text-[7vw] md:text-[8vw] lg:text-[9vw] mt-6 sm:mt-4 md:-mt-5 whitespace-normal break-words">
        {hl} <span className="text-[#BBCCD7]">{hlt}</span>
      </h1>
    );
  };

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-between overflow-hidden bg-[#0C0C0C]">
      {/* 1. Navbar */}
      <FadeIn y={-20} delay={0} duration={0.8} as="nav" className="w-full z-20">
        <div className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <div className="w-full flex justify-between items-center text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            <button
              onClick={() => handleScroll('about')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => handleScroll('price')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus:outline-none"
            >
              Price
            </button>
            <button
              onClick={() => handleScroll('projects')}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus:outline-none"
            >
              Projects
            </button>
            <button
              onClick={onContactClick}
              className="hover:opacity-70 transition-opacity duration-200 cursor-pointer focus:outline-none"
            >
              Contact
            </button>
          </div>
        </div>
      </FadeIn>

      {/* 2. Hero Heading & Optional Badge */}
      <div className="flex-1 flex flex-col justify-start pt-12 sm:pt-16 md:pt-20 z-10 px-6 md:px-10">
        {badge && (
          <FadeIn y={10} delay={0.1} duration={0.6} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] animate-pulse"></span>
              {badge}
            </span>
          </FadeIn>
        )}
        <div className="overflow-hidden w-full">
          <FadeIn y={40} delay={0.15} duration={0.8} as="div">
            {renderHeadingText(headline, highlight)}
          </FadeIn>
        </div>
      </div>

      {/* 3. Hero Portrait */}
      <FadeIn y={30} delay={0.6} duration={0.9} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full flex justify-center"
        >
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            alt="Jack Portrait"
            className="w-full h-auto object-cover select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            loading="eager"
          />
        </Magnet>
      </FadeIn>

      {/* 4. Bottom bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <FadeIn y={20} delay={0.35} duration={0.8} as="div">
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            {desc}
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.5} duration={0.8} as="div">
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
