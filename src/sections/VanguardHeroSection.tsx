import React, { useState, useRef } from 'react';
import { ArrowUpRight, Award, Crown, X, Terminal, Mail, FileText } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Logo } from '../components/Logo';
import { GsapHeroText } from '../components/GsapHeroText';

interface VanguardHeroSectionProps {
  onContactClick: () => void;
  resumeUrl?: string;
}

export const VanguardHeroSection: React.FC<VanguardHeroSectionProps> = ({ onContactClick, resumeUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Mouse Physics for Centered Photo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const navItems = [
    { label: 'Projects', target: 'projects' },
    { label: 'Email', target: 'email' },
    { label: 'Resume', target: 'resume' },
  ];

  const handleNavClick = (target: string) => {
    setMenuOpen(false);
    if (target === 'contact') {
      onContactClick();
      return;
    }
    if (target === 'email') {
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to=dharsna2004@gmail.com&su=Project%20Inquiry', '_blank');
      return;
    }
    if (target === 'resume') {
      window.open(resumeUrl || '#', '_blank');
      return;
    }
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#3b0b0e] via-[#4B1013] to-[#2a0608] text-white font-inter perspective-1000"
    >
      {/* 1. Ambient Background Grid & Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
        
        {/* Soft Radial Ambient Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-gradient-to-tr from-[#9c1535]/25 via-[#4B1013]/40 to-transparent blur-[140px] opacity-70" />
      </div>

      {/* 2. Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-40 px-6 sm:px-12 lg:px-16 py-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <Logo />

        {/* Center Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className="text-xs font-semibold text-white/70 tracking-[0.2em] uppercase hover:text-white transition-colors duration-200 focus:outline-none flex items-center gap-2 group"
            >
              {item.target === 'projects' && <Terminal className="w-3.5 h-3.5 opacity-55 group-hover:opacity-100 transition-all duration-200 animate-pulse" />}
              {item.target === 'email' && <Mail className="w-3.5 h-3.5 opacity-55 group-hover:opacity-100 transition-all duration-200" />}
              {item.target === 'resume' && <FileText className="w-3.5 h-3.5 opacity-55 group-hover:opacity-100 transition-all duration-200" />}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Desktop Contact CTA */}
        <div className="hidden md:block">
          <button
            onClick={onContactClick}
            className="flex items-center gap-2 border border-white/20 hover:border-white/60 px-6 py-2.5 text-xs text-white font-semibold tracking-widest uppercase hover:bg-white/10 transition-all duration-300 focus:outline-none rounded-full backdrop-blur-md"
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col justify-center items-end gap-1.5 focus:outline-none group p-2 -mr-2"
          aria-label="Open Menu"
        >
          <div className="w-6 h-0.5 bg-white transition-all duration-300 group-hover:w-5"></div>
          <div className="w-6 h-0.5 bg-white transition-all duration-300"></div>
          <div className="w-4 h-0.5 bg-white transition-all duration-300 group-hover:w-6"></div>
        </button>
      </nav>

      {/* 3. Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between transition-all duration-500 ease-in-out px-6 sm:px-10 py-5 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <Logo />
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white hover:text-white/70 transition-colors focus:outline-none p-2"
            aria-label="Close Menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 sm:gap-8 my-auto">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className="font-podium text-4xl sm:text-5xl text-white uppercase tracking-wider hover:opacity-80 transition-all focus:outline-none flex items-center gap-3 group"
              style={{
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${i * 80 + 100}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {item.target === 'projects' && <Terminal className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-all duration-300" />}
              {item.target === 'email' && <Mail className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-all duration-300" />}
              {item.target === 'resume' && <FileText className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-all duration-300" />}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={onContactClick}
            className="mt-8 flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white/10 hover:border-white/60 transition-all focus:outline-none rounded-full"
            style={{
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${navItems.length * 80 + 100}ms`,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <span>GET IN TOUCH</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="h-10"></div>
      </div>

      {/* 4. CENTERED PROFILE PHOTO WITH 3D PARALLAX & FLOATING WAVE */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full sm:w-auto h-[80vh] sm:h-[86vh] max-h-[720px] sm:max-h-[780px] z-10 flex items-end justify-center pointer-events-none select-none">
        
        {/* Pulsing Aura Ring */}
        <motion.div
          className="absolute bottom-6 w-[440px] h-[440px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-t from-[#B600A8]/25 via-[#4B1013]/35 to-transparent blur-[120px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.85, 0.5]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 3D Floating Motion Wrapper for Photo */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative h-full flex items-end justify-center"
        >
          {/* Profile Image Cutout */}
          <motion.img
            src="/profile.png"
            alt="Dhaksina Moorthy"
            className="relative z-10 max-h-full object-contain object-bottom filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.8)] pointer-events-auto cursor-pointer scale-135 sm:scale-150 origin-bottom"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 85,
              damping: 20,
              delay: 0.2
            }}
            whileHover={{
              scale: 1.55,
              filter: "drop-shadow([0_25px_60px_rgba(182,0,168,0.4)]) brightness(1.04)"
            }}
          />
        </motion.div>
      </div>

      {/* 5. PERFECTLY BALANCED FULL-FILL GRID (NO HUGE EMPTY GAPS) */}
      <div className="relative z-20 h-full w-full max-w-[1550px] mx-auto px-6 sm:px-12 lg:px-16 flex items-center pt-20 pb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* LEFT COLUMN: FILLS LEFT SPACE BALANCEDLY */}
          <div className="lg:col-span-5 flex flex-col items-start text-left z-20 relative">
            
            {/* Creative Status Capsule Badge */}
            <div className="animate-fade-up flex items-center gap-2 mb-4 bg-black/60 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full shadow-lg text-[11px] font-mono text-white/90">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[#E289E5]">✦</span>
              <span>CRAFTING NEXT-GEN WEB, MOBILE & IOT</span>
            </div>

            {/* Tagline Badge */}
            <div className="animate-fade-up flex items-center gap-2 mb-5 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
              <Crown className="w-3.5 h-3.5 text-white/70" />
              <span className="text-[10px] text-white/80 font-inter tracking-[0.25em] uppercase font-semibold">
                Web & Mobile App Developer
              </span>
            </div>

            {/* GSAP CODE. (BIG & HEROIC) */}
            <GsapHeroText
              direction="left"
              fontSize="text-[clamp(3.5rem,7.5vw,7.5rem)]"
              items={[{ text: "CODE.", accentColor: "from-white via-[#F5D5E0] to-white" }]}
              className="mb-4"
            />

            {/* Clean Bio Subtext */}
            <p className="animate-fade-up-delay-2 text-white/75 text-xs sm:text-sm font-inter leading-relaxed max-w-sm mb-7">
              Architecting high-performance web, mobile & IoT solutions with modern precision and creative engineering.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-up-delay-3">
              <button
                onClick={() => handleNavClick('projects')}
                className="group flex items-center gap-3 bg-white text-black hover:bg-white/90 px-6 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-full shadow-2xl focus:outline-none"
              >
                <span>SEE WORK</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* BALANCED CENTER CORRIDOR (For Photo) */}
          <div className="hidden lg:block lg:col-span-2 pointer-events-none" />

          {/* RIGHT COLUMN: FILLS RIGHT SPACE BALANCEDLY */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right z-20 relative">
            
            {/* Tagline Badge */}
            <div className="animate-fade-up hidden lg:flex items-center gap-2 mb-5 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5 text-white/70" />
              <span className="text-[10px] text-white/80 font-inter tracking-[0.25em] uppercase font-semibold">
                Full-Stack & IoT Specialist
              </span>
            </div>

            {/* GSAP CREATE. & CONNECT. (BIG & HEROIC) */}
            <GsapHeroText
              direction="right"
              fontSize="text-[clamp(3.5rem,7.5vw,7.5rem)]"
              items={[
                { text: "CREATE.", accentColor: "from-white via-[#F5D5E0] to-white" },
                { text: "CONNECT.", accentColor: "from-white via-[#D5E0F5] to-white" }
              ]}
              className="mb-5"
            />

            {/* Clean Stats Row */}
            <div className="animate-fade-up-delay-4 flex items-center gap-6 sm:gap-8 border-t border-white/15 pt-5 w-full lg:w-auto justify-start lg:justify-end">
              <div className="flex flex-col items-start lg:items-end">
                <span className="font-inter text-white text-xl sm:text-2xl font-bold tracking-tight">
                  15+
                </span>
                <span className="text-white/50 text-[9px] tracking-widest uppercase mt-0.5 font-medium">
                  Projects
                </span>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex flex-col items-start lg:items-end">
                <span className="font-inter text-white text-xl sm:text-2xl font-bold tracking-tight">
                  100%
                </span>
                <span className="text-white/50 text-[9px] tracking-widest uppercase mt-0.5 font-medium">
                  Innovation
                </span>
              </div>

              <div className="w-px h-8 bg-white/15" />

              <div className="flex flex-col items-start lg:items-end">
                <span className="font-inter text-white text-xl sm:text-2xl font-bold tracking-tight">
                  Dual
                </span>
                <span className="text-white/50 text-[9px] tracking-widest uppercase mt-0.5 font-medium">
                  ECE & CSE
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
