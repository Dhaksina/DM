import React from 'react';
import { motion } from 'framer-motion';

export const MarqueeSection: React.FC = () => {
  const leftTech = [
    { name: 'Firebase', icon: '🔥', desc: 'Realtime DB & Auth', color: 'from-amber-500/20 via-orange-500/10 to-transparent' },
    { name: 'React', icon: '⚛️', desc: 'Web & Mobile Apps', color: 'from-cyan-500/20 via-blue-500/10 to-transparent' },
    { name: 'GitHub', icon: '🐙', desc: 'Code Repository', color: 'from-purple-500/20 via-zinc-500/10 to-transparent' },
  ];

  const rightTech = [
    { name: 'Arduino', icon: '♾️', desc: 'Microcontrollers', color: 'from-teal-500/20 via-emerald-500/10 to-transparent' },
    { name: 'IoT', icon: '🛰️', desc: 'Connected Mobility', color: 'from-emerald-500/20 via-cyan-500/10 to-transparent' },
  ];

  const bottomTech = [
    { name: 'Web Developer', icon: '🌐', desc: 'Full-Stack Applications', color: 'from-blue-500/20 via-indigo-500/10 to-transparent' },
    { name: 'Hardware Systems', icon: '⚡', desc: 'Embedded Systems & Sensors', color: 'from-yellow-500/20 via-amber-500/10 to-transparent' },
  ];

  return (
    <section className="w-full bg-[#0C0C0C] py-20 px-6 relative overflow-hidden text-white font-inter border-t border-b border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#B600A8]/20 via-[#4B1013]/30 to-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-12 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-white/80 uppercase">
            FULL-STACK & EMBEDDED HARDWARE MATRIX
          </span>
        </div>

        {/* Matrix Grid Layout */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* LEFT TECH NODES (Firebase, React, GitHub) */}
          <div className="md:col-span-4 flex flex-col gap-5 items-center md:items-end">
            {leftTech.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, x: -5 }}
                className={`w-full max-w-xs bg-gradient-to-r ${tech.color} backdrop-blur-xl border border-white/15 p-4 rounded-2xl flex items-center justify-between shadow-2xl cursor-pointer group hover:border-white/40 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{tech.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">{tech.name}</h4>
                    <p className="text-[10px] text-white/60 font-mono">{tech.desc}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-emerald-400 transition-colors" />
              </motion.div>
            ))}
          </div>

          {/* CENTER PHOTO NODE (YOUR PORTRAIT PHOTO) */}
          <div className="md:col-span-4 flex flex-col items-center justify-center relative my-4 md:my-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-[#B600A8] via-[#E289E5] to-emerald-400 shadow-[0_0_60px_rgba(182,0,168,0.4)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#150507] flex items-end justify-center relative border-2 border-white/20">
                <img
                  src="/profile-sunglasses.jpg"
                  alt="Dhaksina Moorthy"
                  className="w-full h-full object-cover object-top filter drop-shadow-2xl hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <h3 className="font-extrabold text-xl text-white uppercase tracking-wider">DHAKSINA MOORTHY B</h3>
              <p className="text-xs text-white/60 font-mono uppercase tracking-widest mt-1">FULL-STACK & IOT ARCHITECT</p>
            </div>
          </div>

          {/* RIGHT TECH NODES (Arduino, IoT) */}
          <div className="md:col-span-4 flex flex-col gap-5 items-center md:items-start">
            {rightTech.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, x: 5 }}
                className={`w-full max-w-xs bg-gradient-to-l ${tech.color} backdrop-blur-xl border border-white/15 p-4 rounded-2xl flex items-center justify-between shadow-2xl cursor-pointer group hover:border-white/40 transition-all`}
              >
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">{tech.name}</h4>
                    <p className="text-[10px] text-white/60 font-mono">{tech.desc}</p>
                  </div>
                  <span className="text-2xl group-hover:scale-125 transition-transform">{tech.icon}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* BOTTOM HARDWARE NODES (Raspberry Pi, Hardware) */}
        <div className="w-full max-w-2xl mt-10 flex flex-wrap items-center justify-center gap-5">
          {bottomTech.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className={`bg-gradient-to-t ${tech.color} backdrop-blur-xl border border-white/15 px-6 py-3.5 rounded-2xl flex items-center gap-3.5 shadow-2xl cursor-pointer group hover:border-white/40 transition-all`}
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">{tech.icon}</span>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-rose-300 transition-colors">{tech.name}</h4>
                <p className="text-[10px] text-white/60 font-mono">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
