import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

const Character: React.FC<CharacterProps> = ({ char, index, total, scrollYProgress }) => {
  // We distribute the character fade starts across the scroll progress.
  // The reveal starts at index / total and finishes at (index / total) + 0.08, capped at 1.0.
  const start = index / total;
  const end = Math.min(1, start + 0.08);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder to preserve layout/spacing */}
      <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>
      {/* Absolute positioned animated character */}
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');

  return (
    <p
      ref={paragraphRef}
      style={style}
      className={`flex flex-wrap justify-center leading-relaxed select-none ${className}`}
    >
      {chars.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          total={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};
