import { useState, useEffect } from 'react';
import { VanguardHeroSection } from './sections/VanguardHeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection, ServiceData } from './sections/ServicesSection';
import { ProjectsSection, ProjectData } from './sections/ProjectsSection';
import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { FadeIn } from './components/FadeIn';

import { db } from './firebase';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { doc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import {
  heroData as staticHeroData,
  contactData as staticContactData,
  services as staticServices,
  projects as staticProjects,
  HeroData,
  ContactData
} from './data';

function App() {
  const [heroData, setHeroData] = useState<HeroData>(staticHeroData);
  const [contactData, setContactData] = useState<ContactData>(staticContactData);
  const [servicesList, setServicesList] = useState<ServiceData[]>(staticServices);
  const [projectsList, setProjectsList] = useState<ProjectData[]>(staticProjects);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // 1. Listen to Hero Settings
    const unsubHero = onSnapshot(doc(db, "settings", "hero"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.desc || data.badge || data.highlight) {
          setHeroData({
            badge: data.badge || staticHeroData.badge,
            headline: data.headline || staticHeroData.headline,
            highlight: data.highlight || staticHeroData.highlight,
            desc: data.desc || staticHeroData.desc
          });
        }
      }
    }, (err) => {
      console.warn("Failed to load hero settings from Firestore, using static fallback:", err);
    });

    // 2. Listen to Contact Settings
    const unsubContact = onSnapshot(doc(db, "settings", "contact"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.email || data.whatsapp || data.phone) {
          setContactData({
            whatsapp: data.whatsapp || staticContactData.whatsapp,
            phone: data.phone || staticContactData.phone,
            email: data.email || staticContactData.email,
            address: data.address || staticContactData.address,
            linkedin: data.linkedin || staticContactData.linkedin,
            github: data.github || staticContactData.github,
            instagram: data.instagram || staticContactData.instagram,
            resumeUrl: data.resumeUrl || staticContactData.resumeUrl
          });
        }
      }
    }, (err) => {
      console.warn("Failed to load contact settings from Firestore, using static fallback:", err);
    });

    // 3. Listen to Sectors collection (mapped to Services)
    const sectorsQuery = query(collection(db, "sectors"), orderBy("order", "asc"));
    const unsubSectors = onSnapshot(sectorsQuery, (snap) => {
      const list: ServiceData[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          name: data.name || '',
          desc: data.desc || '',
          order: data.order || 0,
        });
      });
      if (list.length > 0) {
        setServicesList(list);
      }
    }, (err) => {
      console.warn("Failed to load sectors from Firestore, using static fallback:", err);
    });

    // 4. Listen to Portfolio collection (mapped to Projects)
    const portfolioQuery = query(collection(db, "portfolio"), orderBy("order", "asc"));
    const unsubPortfolio = onSnapshot(portfolioQuery, (snap) => {
      const list: ProjectData[] = [];
      snap.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          title: data.title || '',
          category: data.category || '',
          imageUrl: data.imageUrl || '',
          order: data.order || 0,
          liveUrl: data.liveUrl || '',
        });
      });
      if (list.length > 0) {
        setProjectsList(list);
      }
    }, (err) => {
      console.warn("Failed to load portfolio from Firestore, using static fallback:", err);
    });

    return () => {
      unsubHero();
      unsubContact();
      unsubSectors();
      unsubPortfolio();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsAdminMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleContact = () => {
    const rawNum = contactData?.whatsapp || "8939184324";
    const cleanNum = rawNum.replace(/\D/g, '');
    const fullNum = cleanNum.startsWith('91') ? cleanNum : `91${cleanNum}`;
    window.open(`https://wa.me/${fullNum}`, '_blank');
  };

  // Determine footer social links
  const githubUrl = contactData?.github || 'https://github.com';
  const linkedinUrl = contactData?.linkedin || 'https://linkedin.com';
  const instagramUrl = contactData?.instagram || 'https://instagram.com';

  if (isAdminMode) {
    if (isAdminAuthenticated) {
      return (
        <AdminDashboard
          heroData={heroData}
          contactData={contactData}
          services={servicesList}
          projects={projectsList}
          onLogout={() => {
            setIsAdminAuthenticated(false);
            setIsAdminMode(false);
          }}
        />
      );
    } else {
      return (
        <AdminLogin
          onBack={() => setIsAdminMode(false)}
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
        />
      );
    }
  }

  return (
    <div className="main-wrapper w-full bg-[#0C0C0C] text-[#D7E2EA] overflow-x-clip selection:bg-[#B600A8]/30 selection:text-white">
      {/* 1. Hero Section */}
      <VanguardHeroSection onContactClick={handleContact} resumeUrl={contactData?.resumeUrl} />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection
        text={heroData?.desc}
        onContactClick={handleContact}
      />

      {/* 4. Services Section */}
      <ServicesSection services={servicesList} />

      {/* 5. Projects Section */}
      <ProjectsSection projects={projectsList} />

      {/* Footer */}
      <footer className="w-full bg-[#0C0C0C] border-t border-zinc-900 py-12 px-6 md:px-10 z-20 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <FadeIn y={10} delay={0} duration={0.8}>
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold uppercase tracking-wider text-[#D7E2EA]">
                DHAKSINA MOORTHY B
              </h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
                Web & Mobile App Developer
              </p>
            </div>
          </FadeIn>

          <FadeIn y={10} delay={0.1} duration={0.8} className="flex gap-6">
            {contactData?.email && (
              <a
                href={`mailto:${contactData.email}?subject=Project Inquiry`}
                className="text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
          </FadeIn>

          <FadeIn y={10} delay={0.2} duration={0.8} className="text-xs text-zinc-600 uppercase tracking-wider text-center md:text-right flex flex-col items-center md:items-end gap-1">
            <div>
              © {new Date().getFullYear()} {heroData?.highlight
                ? heroData.highlight.replace(/i['’]m\s+/i, "")
                : "Dhaksina"}. All rights reserved.
            </div>
            <button
              onClick={() => setIsAdminMode(true)}
              className="text-[10px] font-mono text-zinc-500 hover:text-[#E289E5] transition-all duration-300 mt-2 border border-zinc-800/80 hover:border-[#E289E5]/30 bg-white/[0.01] hover:bg-[#E289E5]/5 px-3 py-1 rounded-lg flex items-center gap-1.5 group select-none cursor-pointer"
              title="Access Admin Console"
            >
              <span className="text-emerald-500 group-hover:text-[#E289E5] animate-pulse text-[8px]">●</span>
              <span>CONSOLE</span>
              <span className="text-zinc-700 group-hover:text-zinc-500 text-[8px] border border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-950 font-sans">⌘K</span>
            </button>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}

export default App;
