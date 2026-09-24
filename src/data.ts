export interface HeroData {
  badge?: string;
  headline?: string;
  highlight?: string;
  desc?: string;
}

export interface ContactData {
  whatsapp?: string;
  phone?: string;
  email?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  resumeUrl?: string;
}

export interface ServiceData {
  id?: string;
  name: string;
  desc: string;
  order?: number;
}

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  imageUrl: string;
  order?: number;
  liveUrl?: string;
}

export const heroData: HeroData = {
  badge: "Web & Mobile App Developer",
  headline: "Hi,",
  highlight: "I'm Dhaksina Moorthy B",
  desc: "I am Dhaksina Moorthy, and I am from Chennai.\nI completed my SSLC at HMS School.\nI then completed my Diploma in Electronics and Communication Engineering from Sri Sairam Polytechnic.\nAfter that, I completed my Bachelor’s degree in Computer Science and Engineering from Sri Sairam Engineering College.\n\nI have completed projects during both my diploma and engineering.\nMy diploma project was an IoT-based Advanced Vehicle Tracking System, and my engineering project was Connected Mobility – an IoT-enabled Vehicle Monitoring System.\nIn my engineering project, I was responsible for the hardware implementation and also took the initiative to coordinate and manage my team."
};

export const contactData: ContactData = {
  whatsapp: "918939184324",
  phone: "+91 89391 84324",
  email: "dharsna2004@gmail.com",
  address: "Chennai, Tamil Nadu, India",
  github: "https://github.com/dashboard",
  linkedin: "https://linkedin.com/in/dhaksina-portfolio",
  instagram: "https://instagram.com/dhaksina-portfolio",
  resumeUrl: "/resume.pdf"
};

export const services: ServiceData[] = [
  {
    name: "Web & Mobile App Development",
    desc: "Building high-performance, cross-platform web and mobile applications with modern frameworks, responsive UI, and seamless user experiences.",
    order: 1
  },
  {
    name: "3D Visuals & Design",
    desc: "Creating detailed 3D models, graphics, and animations to add depth and immersive storytelling to digital products and brands.",
    order: 2
  },
  {
    name: "Brand Systems",
    desc: "Designing comprehensive visual identities, color palettes, and typographic systems that convey a strong and consistent brand presence.",
    order: 3
  },
  {
    name: "UI/UX Prototyping",
    desc: "Prototyping intuitive user interfaces and user-centered design paths with attention to micro-animations and micro-interactions.",
    order: 4
  },
  {
    name: "Graphic & Print Design",
    desc: "Creating professional brochures, catalogues, manuals, logo designs, and promotional banners tailored for brand visibility and print.",
    order: 5
  }
];

export const projects: ProjectData[] = [
  {
    title: "Apoorvaa Furniture & Interior",
    category: "Web Application",
    imageUrl: "/apoorvaa-main.png",
    order: 1,
    liveUrl: "https://apoorvaa.in/"
  },
  {
    title: "ATOM India - Precision Instrumentation",
    category: "Web & Industrial Application",
    imageUrl: "/atom-main.png",
    order: 2,
    liveUrl: "https://github.com/dashboard"
  },
  {
    title: "TecFind Project",
    category: "Mobile & Web Application",
    imageUrl: "/project-card-launch.png",
    order: 3,
    liveUrl: "https://github.com/dashboard"
  },
  {
    title: "EVAARA",
    category: "E-Commerce Web Application",
    imageUrl: "/evaara-main.png",
    order: 4,
    liveUrl: "https://evaarabyaadhya.com/"
  },
  {
    title: "OceanFresh",
    category: "Seafood E-Commerce Web Application",
    imageUrl: "/oceanfresh-main.png",
    order: 5,
    liveUrl: "https://github.com/dashboard"
  },
  {
    title: "MSIR INDIA - Precision Calibration",
    category: "Industrial Calibration Web Application",
    imageUrl: "/msir-main.png",
    order: 6,
    liveUrl: "https://msirindia.com/"
  }
];
