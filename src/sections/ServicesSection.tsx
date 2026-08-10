import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ArrowUpRight } from 'lucide-react';

export interface ServiceData {
  id?: string;
  name: string;
  desc: string;
  order?: number;
}

interface ServicesSectionProps {
  services?: ServiceData[];
}

const defaultServices: ServiceData[] = [
  {
    name: "Web & Mobile App Development",
    desc: "Building high-performance, cross-platform web and mobile applications with modern frameworks, responsive UI, and seamless user experiences."
  },
  {
    name: "3D Visuals & Design",
    desc: "Creating detailed 3D models, graphics, and animations to add depth and immersive storytelling to digital products and brands."
  },
  {
    name: "Brand Systems",
    desc: "Designing comprehensive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
  },
  {
    name: "UI/UX Prototyping",
    desc: "Prototyping intuitive user interfaces and user-centered design paths with attention to micro-animations and micro-interactions."
  },
  {
    name: "Graphic & Print Design",
    desc: "Creating professional brochures, catalogues, manuals, logo designs, and promotional banners tailored for brand visibility and print."
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const displayServices = services && services.length > 0 ? services : defaultServices;

  return (
    <section
      id="price"
      className="w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-10 relative"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Heading */}
        <FadeIn y={40} delay={0} duration={0.8}>
          <h2
            className="font-black uppercase text-center text-[#0C0C0C]"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Spacing margin */}
        <div className="h-16 sm:h-20 md:h-28" />

        {/* Services List with top border */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {displayServices.map((service, index) => (
            <FadeIn
              key={index}
              y={30}
              delay={index * 0.1}
              duration={0.8}
              className="w-full"
            >
              <div
                className="group relative flex items-center justify-between py-6 sm:py-8 md:py-10 border-b border-[rgba(12,12,12,0.15)] gap-6 md:gap-12 px-4 sm:px-6 md:px-8 cursor-pointer overflow-hidden rounded-[24px] mt-2 transition-all duration-300 hover:bg-[#0C0C0C]"
              >
                {/* Left Column: Number */}
                <div
                  className="font-black select-none leading-none w-1/4 min-w-[70px] sm:min-w-[120px] md:min-w-[150px] text-[#0C0C0C] group-hover:text-white transition-all duration-300 group-hover:translate-x-3"
                  style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
                >
                  {`0${index + 1}`.slice(-2)}
                </div>

                {/* Right Column: Name + Description Stacked */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                  <h3
                    className="font-bold uppercase text-[#0C0C0C] group-hover:text-white transition-colors duration-300"
                    style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60 group-hover:text-white/70 transition-colors duration-300 text-[clamp(0.85rem,1.6vw,1.25rem)]"
                  >
                    {service.desc}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-[rgba(12,12,12,0.15)] group-hover:border-white/30 text-[#0C0C0C] group-hover:text-white opacity-30 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300 shrink-0"
                >
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
