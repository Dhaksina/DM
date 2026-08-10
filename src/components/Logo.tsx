import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none font-podium uppercase tracking-wider text-white"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Creative SVG Monogram Logo Mark */}
      <div className="relative w-9 h-9 flex items-center justify-center">
        {/* Shifting radial glow background on hover */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/5 blur-md"
          variants={{
            rest: { scale: 0.8, opacity: 0.2 },
            hover: { scale: 1.3, opacity: 0.6 }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />

        <svg
          viewBox="0 0 36 40"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#94A3B8" />
            </linearGradient>
          </defs>

          {/* Curved D-Loop (Left Side - Semicircle) */}
          <motion.path
            d="M 18 8 A 12 12 0 0 0 18 32"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              rest: { pathLength: 0.95 },
              hover: { pathLength: 1, strokeWidth: 4 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Shared Center Stem */}
          <motion.path
            d="M 18 8 L 18 32"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            variants={{
              rest: { scaleY: 0.95 },
              hover: { scaleY: 1, strokeWidth: 4 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* M-Peaks (Right Side - Zag) */}
          <motion.path
            d="M 18 8 L 24 20 L 30 8 L 30 32"
            stroke="url(#logo-grad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              rest: { pathLength: 0.95 },
              hover: { pathLength: 1, strokeWidth: 4 }
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* Brand Text Section (DM expanding to DHAKSINA MOORTHY) */}
      <div className="flex items-center font-podium text-lg sm:text-xl font-extrabold tracking-widest text-white leading-none">
        {/* Letter D */}
        <motion.span
          variants={{
            rest: { color: "#FFFFFF" },
            hover: { color: "#F8FAFC" }
          }}
        >
          D
        </motion.span>
        
        {/* Animated slide-reveal of "HAKSINA" */}
        <motion.span
          className="overflow-hidden flex items-center text-xs sm:text-sm font-inter tracking-[0.25em] font-medium text-white/80"
          variants={{
            rest: { width: 0, opacity: 0, marginRight: 0 },
            hover: { width: "auto", opacity: 1, marginLeft: 4, marginRight: 8 }
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          HAKSINA
        </motion.span>
        
        {/* Letter M */}
        <motion.span
          variants={{
            rest: { color: "#FFFFFF" },
            hover: { color: "#F8FAFC" }
          }}
        >
          M
        </motion.span>

        {/* Animated slide-reveal of "OORTHY" */}
        <motion.span
          className="overflow-hidden flex items-center text-xs sm:text-sm font-inter tracking-[0.25em] font-medium text-white/80"
          variants={{
            rest: { width: 0, opacity: 0, marginLeft: 0 },
            hover: { width: "auto", opacity: 1, marginLeft: 4 }
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          OORTHY
        </motion.span>
      </div>

      {/* Bottom subtle accent glow underline */}
      <motion.div 
        className="absolute bottom-[-6px] left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
