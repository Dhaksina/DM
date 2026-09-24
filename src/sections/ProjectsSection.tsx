import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ProjectCard } from './ProjectCard';

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  order?: number;
  liveUrl?: string;
}

interface ProjectsSectionProps {
  projects?: ProjectData[];
}

const defaultProjects = [
  {
    num: "01",
    category: "Web Application",
    name: "Apoorvaa Furniture & Interior",
    images: {
      col1Img1: "/apoorvaa-main.png",
      col1Img2: "/showcase-city.png",
      col2Img: "/apoorvaa-main.png"
    },
    liveUrl: "https://apoorvaa.in/"
  },
  {
    num: "02",
    category: "Web & Industrial Application",
    name: "ATOM India - Precision Instrumentation",
    images: {
      col1Img1: "/atom-main.png",
      col1Img2: "/showcase-automation.png",
      col2Img: "/atom-main.png"
    },
    liveUrl: "https://github.com/dashboard"
  },
  {
    num: "03",
    category: "Mobile & Web Application",
    name: "TecFind Project",
    images: {
      col1Img1: "/showcase-coding.png",
      col1Img2: "/showcase-sky.png",
      col2Img: "/showcase-coding.png"
    },
    liveUrl: "https://github.com/dashboard"
  },
  {
    num: "04",
    category: "E-Commerce Web Application",
    name: "EVAARA",
    imageUrl: "/evaara-main.png",
    liveUrl: "https://evaarabyaadhya.com/"
  },
  {
    num: "05",
    category: "Seafood E-Commerce Web Application",
    name: "OceanFresh",
    imageUrl: "/oceanfresh-main.png",
    liveUrl: "https://github.com/dashboard"
  },
  {
    num: "06",
    category: "Industrial Calibration Web Application",
    name: "MSIR INDIA - Precision Calibration",
    imageUrl: "/msir-main.png",
    liveUrl: "https://msirindia.com/"
  },
  {
    num: "07",
    category: "Coming Soon",
    name: "Coming Soon",
    imageUrl: "/project-card-venture.png",
    liveUrl: ""
  }
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const isDynamic = projects && projects.length > 0;

  interface DisplayProjectItem {
    category: string;
    name: string;
    imageUrl?: string;
    images?: {
      col1Img1: string;
      col1Img2: string;
      col2Img: string;
    };
    liveUrl?: string;
  }

  const displayProjects = React.useMemo(() => {
    const list: DisplayProjectItem[] = isDynamic && projects 
      ? projects.map((p) => ({
          category: p.category,
          name: p.title,
          imageUrl: p.imageUrl,
          liveUrl: p.liveUrl
        })) 
      : defaultProjects.filter((p) => p.category !== "Coming Soon").map((p) => ({
          category: p.category,
          name: p.name,
          imageUrl: p.imageUrl,
          images: p.images,
          liveUrl: p.liveUrl
        }));

    const fullList: DisplayProjectItem[] = [
      ...list,
      {
        category: "Coming Soon",
        name: "Coming Soon",
        imageUrl: "/project-card-venture.png",
        liveUrl: ""
      }
    ];

    return fullList.map((proj, idx) => ({
      ...proj,
      num: `0${idx + 1}`.slice(-2)
    }));
  }, [projects, isDynamic]);

  return (
    <section
      id="projects"
      className="relative bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 sm:pt-24 md:pt-32 pb-24 px-5 sm:px-8 md:px-10 z-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {/* Heading */}
        <FadeIn y={40} delay={0} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>

        {/* Spacing spacer: mb-16 sm:mb-20 md:mb-28 */}
        <div className="h-16 sm:h-20 md:h-28" />

        {/* Cards Stack */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {displayProjects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              num={project.num}
              category={project.category}
              name={project.name}
              imageUrl={project.imageUrl}
              images={project.images}
              liveUrl={project.liveUrl}
              totalCards={displayProjects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
