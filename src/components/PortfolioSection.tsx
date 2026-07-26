import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight, 
  Briefcase, 
  Cpu, 
  Layers, 
  Calendar, 
  Globe,
  Filter
} from "lucide-react";

export interface ProjectItem {
  id: string;
  name: string;
  type: "client" | "internal";
  categories: string[]; // for filtering: "Business" | "Fashion" | "Artificial Intelligence" | "Experimental"
  industry: string;
  status: "LIVE" | "IN DEVELOPMENT";
  description: string;
  services: string[];
  technology: string[];
  year: string;
  buttonText: string;
  link: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  // CLIENT PROJECTS
  {
    id: "velora",
    name: "Velora",
    type: "client",
    categories: ["Fashion"],
    industry: "Luxury Fashion",
    status: "LIVE",
    description: "Velora is a premium luxury fashion website concept created for a modern clothing brand. Designed with elegance and minimalism in mind, the experience focuses on showcasing premium fashion collections through a refined user interface. The current version serves as a demonstration concept and does not yet include production-ready product imagery or inventory.",
    services: ["UI/UX Design", "Frontend Development", "Luxury Brand Experience", "Responsive Design"],
    technology: ["HTML", "CSS", "JavaScript", "Responsive Web"],
    year: "2026",
    buttonText: "Visit Website",
    link: "https://velora-fashion-phi.vercel.app/"
  },
  {
    id: "modeals-paint",
    name: "Modeals Paint",
    type: "client",
    categories: ["Business"],
    industry: "Home Renovation",
    status: "LIVE",
    description: "Modeals Paint is a business website developed to help a renovation and finishing company establish a stronger online presence. The platform showcases professional painting, tiling and interior finishing services while making it easier for new customers to discover the business and request quotations.",
    services: ["Website Design", "Business Branding", "Frontend Development", "Lead Generation"],
    technology: ["HTML", "CSS", "JavaScript", "Responsive Web"],
    year: "2026",
    buttonText: "Visit Website",
    link: "https://modeals.web.id/"
  },
  {
    id: "atelier-lagos",
    name: "Atelier Lagos",
    type: "client",
    categories: ["Fashion"],
    industry: "Fashion",
    status: "LIVE",
    description: "Atelier Lagos is a modern fashion platform celebrating cultural elegance through contemporary African clothing. The website highlights traditional craftsmanship with a clean digital experience that reflects the brand's premium identity.",
    services: ["Brand Website", "UI Design", "Frontend Development", "Responsive Design"],
    technology: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    buttonText: "Visit Website",
    link: "https://atelier-lagos.vercel.app/"
  },
  // INTERNAL PROJECTS
  {
    id: "igris-core",
    name: "IGRIS Core",
    type: "internal",
    categories: ["Artificial Intelligence", "Experimental"],
    industry: "Experimental AI",
    status: "LIVE",
    description: "IGRIS Core, also known as the Shadow Therapist, is an internal experimental AI project developed by IGRIS Tech. It offers reflective conversations in a calm, supportive environment while exploring conversational AI interfaces and user experience design. The project serves as both a creative experiment and a demonstration of IGRIS Tech's interest in intelligent software.",
    services: ["AI Interface Design", "Frontend Development", "Product Experimentation"],
    technology: ["AI", "HTML", "CSS", "JavaScript", "Responsive Web"],
    year: "2026",
    buttonText: "Launch Experience",
    link: "https://igriscore.vercel.app/"
  }
];

const FILTER_OPTIONS = [
  "All",
  "Business",
  "Fashion",
  "Artificial Intelligence",
  "Experimental"
];

interface PortfolioSectionProps {
  onLaunchScoper?: () => void;
}

export default function PortfolioSection({ onLaunchScoper }: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filterProject = (project: ProjectItem) => {
    if (activeFilter === "All") return true;
    return project.categories.includes(activeFilter);
  };

  const clientProjects = PROJECTS_DATA.filter(p => p.type === "client" && filterProject(p));
  const internalProjects = PROJECTS_DATA.filter(p => p.type === "internal" && filterProject(p));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  const handleLaunchPlanner = () => {
    if (onLaunchScoper) {
      onLaunchScoper();
    } else {
      const el = document.getElementById("scoper") || document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactUs = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 scroll-mt-24">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#00FF88]/5 blur-[150px] pointer-events-none rounded-full" />

      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-bold">
          <Globe className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>OUR WORK</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          Selected Work
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          Every project represents our commitment to thoughtful design, scalable engineering and exceptional user experiences. From business websites to experimental AI projects, each solution is crafted to solve real problems with modern technology.
        </p>
      </div>

      {/* INTERACTIVE FILTERS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-2 text-zinc-500 text-xs font-mono uppercase tracking-wider mr-2 hidden sm:flex">
          <Filter className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>Filter By:</span>
        </div>
        {FILTER_OPTIONS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#00FF88] text-black font-bold shadow-[0_0_20px_rgba(0,255,136,0.3)] scale-105"
                  : "bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* MAIN CONTENT CONTAINERS */}
      <div className="space-y-20">

        {/* CLIENT PROJECTS SECTION */}
        {clientProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wider">
                CLIENT PROJECTS
              </h3>
              <span className="text-xs font-mono text-zinc-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                {clientProjects.length} {clientProjects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {clientProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={cardVariants} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* INTERNAL PROJECTS SECTION */}
        {internalProjects.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wider">
                INTERNAL PROJECTS
              </h3>
              <span className="text-xs font-mono text-zinc-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                {internalProjects.length} {internalProjects.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {internalProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} variants={cardVariants} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* EMPTY FILTER STATE */}
        {clientProjects.length === 0 && internalProjects.length === 0 && (
          <div className="text-center py-16 bg-[#090A0E] border border-white/10 rounded-2xl p-8">
            <p className="text-zinc-400 text-sm font-mono mb-4">
              No projects found matching the filter "{activeFilter}".
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="px-5 py-2 rounded-full bg-[#00FF88] text-black text-xs font-mono font-bold cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>

      {/* BOTTOM CTA SECTION */}
      <div className="mt-24 pt-16 border-t border-white/10">
        <div className="bg-[#090A0E]/90 border border-white/10 hover:border-[#00FF88]/30 rounded-[28px] p-8 sm:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl transition-all">
          
          {/* Subtle Glow Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#00FF88]/10 blur-[100px] pointer-events-none rounded-full" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#00FF88]" />
              <span>START YOUR JOURNEY</span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Ready to Build Something Exceptional?
            </h3>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
              Whether you're launching a startup, modernizing your business or building an entirely new digital product, IGRIS Tech is ready to help transform your ideas into reality.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleLaunchPlanner}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#00FF88] hover:bg-[#00e67a] text-black font-sans font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(0,255,136,0.3)] cursor-pointer hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-black fill-black" />
                <span>Launch Project Planner</span>
              </button>

              <button
                onClick={handleContactUs}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
              >
                <span>Contact IGRIS Tech</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

{/* INDIVIDUAL PROJECT CARD COMPONENT */}
function ProjectCard({ project, variants }: { project: ProjectItem; variants: Variants }) {
  return (
    <motion.div
      layout
      variants={variants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-[#090A0E]/80 backdrop-blur-xl border border-white/10 hover:border-[#00FF88]/50 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_-10px_rgba(0,255,136,0.15)] overflow-hidden"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div>
        {/* CARD TOP: Name & Badges */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h4 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-[#00FF88] transition-colors duration-300 tracking-tight">
              {project.name}
            </h4>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <span className="text-[10px] font-mono bg-white/[0.05] border border-white/10 text-zinc-300 px-2.5 py-1 rounded-full uppercase tracking-wider font-medium">
              {project.industry}
            </span>

            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF88]"></span>
              </span>
              <span>{project.status}</span>
            </span>
          </div>
        </div>

        {/* CARD MIDDLE: Professional Description */}
        <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
          {project.description}
        </p>

        {/* CARD BOTTOM: Information Grid */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block uppercase">Industry</span>
              <span className="text-zinc-300 font-medium font-sans">{project.industry}</span>
            </div>

            <div>
              <span className="text-[10px] font-mono text-zinc-500 block uppercase">Year</span>
              <span className="text-zinc-300 font-medium font-mono">{project.year}</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 space-y-2">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block uppercase mb-1">Services Provided</span>
              <div className="flex flex-wrap gap-1">
                {project.services.map((service, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-zinc-300 bg-white/5 px-2 py-0.5 rounded">
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <span className="text-[10px] font-mono text-zinc-500 block uppercase mb-1">Technology</span>
              <div className="flex flex-wrap gap-1">
                {project.technology.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-[#00FF88] bg-[#00FF88]/5 border border-[#00FF88]/10 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD FOOTER */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00FF88]/10 hover:bg-[#00FF88] border border-[#00FF88]/30 hover:border-[#00FF88] text-[#00FF88] hover:text-black font-sans font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)]"
        >
          <span>{project.buttonText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>Built by IGRIS Tech</span>
        </div>
      </div>

    </motion.div>
  );
}
