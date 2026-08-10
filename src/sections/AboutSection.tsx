import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton } from '../components/ContactButton';
import { motion } from 'framer-motion';
import { GraduationCap, Cpu } from 'lucide-react';

interface AboutSectionProps {
  text?: string;
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onContactClick,
}) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full bg-[#0C0C0C] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 overflow-hidden"
    >
      {/* 3D corner icons with custom FadeIn properties */}
      {/* Top Left: Moon */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto opacity-40 sm:opacity-100"
        />
      </FadeIn>

      {/* Bottom Left: 3D Object */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Ornament"
          className="w-[80px] sm:w-[120px] md:w-[150px] h-auto opacity-30 sm:opacity-100"
        />
      </FadeIn>

      {/* Top Right: Lego */}
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Block"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto opacity-40 sm:opacity-100"
        />
      </FadeIn>

      {/* Bottom Right: 3D Group */}
      <FadeIn
        x={80}
        y={0}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0 select-none pointer-events-none"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Abstract Group"
          className="w-[110px] sm:w-[150px] md:w-[190px] h-auto opacity-35 sm:opacity-100"
        />
      </FadeIn>

      {/* Center content container */}
      <div className="flex flex-col items-center z-10 w-full max-w-5xl text-center">
        {/* Heading */}
        <FadeIn y={40} delay={0} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Heading to paragraph spacing */}
        <div className="h-6 sm:h-10 md:h-12" />

        {/* Interactive Biography Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full px-4 mb-16">
          
          {/* Card 1: Education */}
          <FadeIn y={50} delay={0.15} duration={0.8} className="w-full">
            <motion.div
              whileHover={{ y: -8 }}
              className="flex flex-col h-full bg-[#121212]/50 border border-[#D7E2EA]/10 backdrop-blur-md rounded-[32px] p-6 sm:p-8 text-left relative overflow-hidden group shadow-2xl transition-all duration-300 hover:border-[#4B1013]/40"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4B1013]/10 rounded-full blur-3xl group-hover:bg-[#4B1013]/25 transition-all duration-500" />
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D7E2EA]/10 flex items-center justify-center text-[#D7E2EA] group-hover:bg-[#4B1013] group-hover:text-white transition-all duration-300">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                  Education
                </h3>
              </div>

              {/* Content Timeline */}
              <div className="flex flex-col gap-6 relative border-l-2 border-[#D7E2EA]/15 pl-6 ml-5">
                
                {/* SSLC */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#D7E2EA] border-4 border-[#0C0C0C] group-hover:bg-[#4B1013] group-hover:scale-110 transition-all duration-300" />
                  <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-mono">Schooling</span>
                  <h4 className="text-base font-bold text-[#D7E2EA] mt-0.5">SSLC</h4>
                  <p className="text-sm text-[#D7E2EA]/60 mt-1">HMS School</p>
                </div>

                {/* Diploma */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#D7E2EA] border-4 border-[#0C0C0C] group-hover:bg-[#4B1013] group-hover:scale-110 transition-all duration-300" />
                  <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-mono">Diploma (ECE)</span>
                  <h4 className="text-base font-bold text-[#D7E2EA] mt-0.5">Electronics & Comm Eng</h4>
                  <p className="text-sm text-[#D7E2EA]/60 mt-1">Sri Sairam Polytechnic</p>
                </div>

                {/* BE */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#D7E2EA] border-4 border-[#0C0C0C] group-hover:bg-[#4B1013] group-hover:scale-110 transition-all duration-300" />
                  <span className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/40 font-mono">Bachelor's (CSE)</span>
                  <h4 className="text-base font-bold text-[#D7E2EA] mt-0.5">Computer Science & Eng</h4>
                  <p className="text-sm text-[#D7E2EA]/60 mt-1">Sri Sairam Eng College</p>
                </div>

              </div>
            </motion.div>
          </FadeIn>

          {/* Card 2: Showcase Image */}
          <FadeIn y={50} delay={0.2} duration={0.8} className="w-full">
            <motion.div
              whileHover={{ y: -8 }}
              className="flex flex-col h-full min-h-[380px] bg-[#121212]/50 border border-[#D7E2EA]/10 backdrop-blur-md rounded-[32px] p-4 text-center relative overflow-hidden group shadow-2xl transition-all duration-300 hover:border-[#4B1013]/40"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B600A8]/10 rounded-full blur-3xl group-hover:bg-[#B600A8]/20 transition-all duration-500" />
              
              <div className="w-full h-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-black/40 border border-white/5">
                <img
                  src="/profile-about.jpg"
                  alt="Dhaksina Moorthy B"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#E289E5] font-mono">Creative Mind</span>
                  <h4 className="text-lg font-bold text-white mt-1">Dhaksina Moorthy B</h4>
                  <p className="text-xs text-white/60 mt-1">Designing the future of Web, Mobile & IoT</p>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Card 3: Projects & Innovation */}
          <FadeIn y={50} delay={0.25} duration={0.8} className="w-full">
            <motion.div
              whileHover={{ y: -8 }}
              className="flex flex-col h-full bg-[#121212]/50 border border-[#D7E2EA]/10 backdrop-blur-md rounded-[32px] p-6 sm:p-8 text-left relative overflow-hidden group shadow-2xl transition-all duration-300 hover:border-[#4B1013]/40"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4B1013]/10 rounded-full blur-3xl group-hover:bg-[#4B1013]/25 transition-all duration-500" />
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#D7E2EA]/10 flex items-center justify-center text-[#D7E2EA] group-hover:bg-[#4B1013] group-hover:text-white transition-all duration-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#D7E2EA]">
                  IoT Projects
                </h3>
              </div>

              {/* Projects List */}
              <div className="flex flex-col gap-5 flex-1 justify-between">
                
                {/* Diploma Project */}
                <div className="bg-[#1C1C1C]/40 border border-[#D7E2EA]/5 rounded-2xl p-4 hover:border-[#D7E2EA]/15 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D7E2EA]/10 text-[9px] text-[#D7E2EA] uppercase font-mono tracking-wider">Diploma Work</span>
                  </div>
                  <h4 className="text-base font-bold text-[#D7E2EA]">IoT Vehicle Tracking</h4>
                  <p className="text-xs text-[#D7E2EA]/60 mt-1.5 leading-relaxed">
                    Designed and built a hardware system mapping GPS modules with cellular interfaces.
                  </p>
                </div>

                {/* BE Project */}
                <div className="bg-[#1C1C1C]/40 border border-[#D7E2EA]/5 rounded-2xl p-4 hover:border-[#D7E2EA]/15 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4B1013]/30 text-[9px] text-[#FF9E9E] uppercase font-mono tracking-wider">Engineering Capstone</span>
                  </div>
                  <h4 className="text-base font-bold text-[#D7E2EA]">Connected Mobility</h4>
                  <p className="text-xs text-[#D7E2EA]/60 mt-1.5 leading-relaxed">
                    IoT vehicle condition and coordinates monitoring system linking sensors and microcontrollers.
                  </p>
                </div>

                {/* Leadership Callout */}
                <div className="border-t border-[#D7E2EA]/10 pt-4 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4B1013] mt-1 shrink-0 animate-ping" />
                  <p className="text-xs text-[#D7E2EA]/50 font-light italic leading-relaxed">
                    Responsible for hardware architecture, coordination, and team management.
                  </p>
                </div>

              </div>
            </motion.div>
          </FadeIn>

        </div>

        {/* Contact Button */}
        <FadeIn y={20} delay={0.35} duration={0.8}>
          <ContactButton onClick={onContactClick} />
        </FadeIn>
      </div>
    </section>
  );
};
