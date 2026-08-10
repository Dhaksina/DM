import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface GsapWordItem {
  text: string;
  accentColor?: string;
}

interface GsapHeroTextProps {
  items?: GsapWordItem[];
  direction?: 'left' | 'right';
  className?: string;
  fontSize?: string;
}

const defaultLeftWords: GsapWordItem[] = [
  { text: "CODE.", accentColor: "from-white via-[#F5D5E0] to-white" },
];

const defaultRightWords: GsapWordItem[] = [
  { text: "CREATE.", accentColor: "from-white via-[#F5D5E0] to-white" },
  { text: "CONNECT.", accentColor: "from-white via-[#D5E0F5] to-white" },
];

export const GsapHeroText: React.FC<GsapHeroTextProps> = ({
  items,
  direction = 'left',
  className = '',
  fontSize = 'text-[clamp(3rem,7.5vw,7.5rem)]',
}) => {
  const displayItems = items || (direction === 'left' ? defaultLeftWords : defaultRightWords);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const charElements = containerRef.current?.querySelectorAll('.gsap-char-primary');
      if (charElements && charElements.length > 0) {
        const fromX = direction === 'left' ? -60 : 60;

        gsap.fromTo(
          charElements,
          {
            x: fromX,
            y: "80%",
            rotateX: -40,
            opacity: 0,
          },
          {
            x: 0,
            y: "0%",
            rotateX: 0,
            opacity: 1,
            duration: 1.1,
            stagger: direction === 'left' ? 0.035 : -0.035,
            ease: "power4.out",
            delay: 0.15,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  // Hover Rolling Wave Effect per word
  const handleWordHover = (index: number) => {
    const wordEl = wordRefs.current[index];
    if (!wordEl) return;

    const chars = wordEl.querySelectorAll('.gsap-char-primary');
    const duplicateChars = wordEl.querySelectorAll('.gsap-char-duplicate');

    gsap.killTweensOf([chars, duplicateChars]);

    gsap.to(chars, {
      y: "-100%",
      opacity: 0.2,
      duration: 0.4,
      stagger: 0.025,
      ease: "power3.inOut",
    });

    gsap.fromTo(
      duplicateChars,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.5,
        stagger: 0.025,
        ease: "back.out(1.7)",
      }
    );
  };

  const handleWordLeave = (index: number) => {
    const wordEl = wordRefs.current[index];
    if (!wordEl) return;

    const chars = wordEl.querySelectorAll('.gsap-char-primary');
    const duplicateChars = wordEl.querySelectorAll('.gsap-char-duplicate');

    gsap.killTweensOf([chars, duplicateChars]);

    gsap.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
      ease: "power3.out",
    });

    gsap.to(duplicateChars, {
      y: "100%",
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: "power3.in",
    });
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col leading-[0.88] tracking-tight text-white font-bold ${className}`}
    >
      {displayItems.map((item, wordIdx) => {
        const letters = item.text.split('');
        const accent = item.accentColor || "from-white via-[#E289E5] to-white";
        return (
          <div
            key={item.text}
            ref={(el) => (wordRefs.current[wordIdx] = el)}
            onMouseEnter={() => handleWordHover(wordIdx)}
            onMouseLeave={() => handleWordLeave(wordIdx)}
            className="relative overflow-hidden cursor-pointer py-1 group select-none"
          >
            {/* Primary Character Line */}
            <div className={`flex items-center ${direction === 'right' ? 'justify-start lg:justify-end' : 'justify-start'}`}>
              {letters.map((char, charIdx) => (
                <span
                  key={`p-${charIdx}`}
                  className={`gsap-char-primary inline-block font-podium uppercase ${fontSize} transition-colors duration-300 group-hover:text-white`}
                  style={{ display: 'inline-block', willChange: 'transform' }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Duplicate Character Line for Kinetic Rolling Reveal */}
            <div className={`absolute inset-0 flex items-center pointer-events-none ${direction === 'right' ? 'justify-start lg:justify-end' : 'justify-start'}`}>
              {letters.map((char, charIdx) => (
                <span
                  key={`d-${charIdx}`}
                  className={`gsap-char-duplicate inline-block font-podium uppercase ${fontSize} bg-gradient-to-r ${accent} bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                  style={{ display: 'inline-block', transform: 'translateY(100%)', opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
