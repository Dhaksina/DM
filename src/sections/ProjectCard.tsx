import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from '../components/LiveProjectButton';

export interface ProjectCardProps {
  index: number;
  num: string;
  category: string;
  name: string;
  imageUrl?: string;
  images?: {
    col1Img1: string;
    col1Img2: string;
    col2Img: string;
  };
  liveUrl?: string;
  totalCards: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index,
  num,
  category,
  name,
  imageUrl,
  images,
  liveUrl,
  totalCards,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this individual card container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Calculate target scale: scales down slightly based on its index
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Stacking offset top: 6rem (approx top-24) + index * 28px
  const stickyTop = `calc(6rem + ${index * 28}px)`;

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[500px] sm:min-h-[600px] flex items-start justify-center sticky"
      style={{ top: stickyTop }}
    >
      <motion.div
        style={{ scale }}
        className="w-full bg-[#0C0C0C] border-2 border-[#D7E2EA] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 flex flex-col gap-6 md:gap-8 shadow-2xl h-full"
      >
        {/* Top Row: Number, Details, Live Button */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4 sm:gap-6">
            <div
              className="font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {num}
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/50 font-light">
                {category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl uppercase font-semibold text-[#D7E2EA]">
                {name}
              </h3>
            </div>
          </div>

          <LiveProjectButton onClick={() => {
            if (liveUrl) {
              window.open(liveUrl, '_blank');
            } else {
              window.open('https://github.com/dashboard', '_blank');
            }
          }} />
        </div>

        {/* Bottom Row: Dynamic Image Layout */}
        {imageUrl ? (
          /* Single Image layout (loads from Firestore) */
          <div className="w-full flex-1 overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] relative">
            <img
              src={imageUrl}
              alt={`${name} preview`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : images ? (
          /* Stacking 3-Image Grid (default fallback) */
          <div className="grid grid-cols-10 gap-3 sm:gap-4 md:gap-6 flex-1 w-full overflow-hidden">
            {/* Left Column (40% width) */}
            <div className="col-span-4 flex flex-col gap-3 sm:gap-4">
              <div className="overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] w-full">
                <img
                  src={images.col1Img1}
                  alt={`${name} detail 1`}
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ height: 'clamp(110px, 15vw, 230px)' }}
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] w-full flex-1">
                <img
                  src={images.col1Img2}
                  alt={`${name} detail 2`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ minHeight: 'clamp(140px, 20vw, 340px)' }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Column (60% width) */}
            <div className="col-span-6 overflow-hidden rounded-[20px] sm:rounded-[30px] md:rounded-[40px] w-full h-full">
              <img
                src={images.col2Img}
                alt={`${name} main preview`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
};
