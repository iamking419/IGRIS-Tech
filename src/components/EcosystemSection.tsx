import React, { useState } from "react";
import { motion, Variants } from "motion/react";
import { 
  Globe, 
  Bot, 
  GraduationCap, 
  Palette, 
  Sparkles, 
  Lock, 
  ArrowUpRight,
  Layers,
  Cpu,
  BookOpen,
  Layout,
  Terminal,
  Zap,
  CheckCircle2
} from "lucide-react";

export interface EcosystemProduct {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  quickInfo: {
    category: string;
    platform: string;
    started: string;
    stage: string;
  };
  techPills: string[];
  futureFeatures?: string[];
  buttonText: string;
  tooltip: string;
}

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  {
    id: "igris-ai",
    name: "IGRIS AI",
    category: "Artificial Intelligence",
    badge: "🟡 IN DEVELOPMENT",
    description: "IGRIS AI is an intelligent assistant currently being developed to help developers, creators and businesses work faster through AI-powered conversations, coding assistance, automation and productivity tools. It is designed with a strong focus on speed, privacy and future scalability.",
    icon: Bot,
    quickInfo: {
      category: "Artificial Intelligence",
      platform: "Web Platform",
      started: "2026",
      stage: "Active Development"
    },
    techPills: ["Python", "FastAPI", "AI", "Automation"],
    futureFeatures: ["Memory", "Voice", "Agents", "API"],
    buttonText: "Coming Soon",
    tooltip: "Available after public launch."
  },
  {
    id: "igris-code-camp",
    name: "IGRIS Code Camp",
    category: "Education",
    badge: "🟡 IN DEVELOPMENT",
    description: "IGRIS Code Camp is an educational platform designed to help beginners and aspiring developers learn programming through structured courses, interactive projects and practical real-world experience. The goal is to make learning software development accessible, engaging and career-focused.",
    icon: GraduationCap,
    quickInfo: {
      category: "Education",
      platform: "Web Platform",
      started: "2026",
      stage: "Planning & Development"
    },
    techPills: ["Education", "Python", "HTML", "CSS", "JavaScript", "Interactive"],
    buttonText: "Coming Soon",
    tooltip: "Available after public launch."
  },
  {
    id: "igris-studio",
    name: "IGRIS Studio",
    category: "Creative Platform",
    badge: "🟡 IN DEVELOPMENT",
    description: "IGRIS Studio is a creative workspace being built for designers, developers and content creators. It aims to simplify creative workflows by bringing together design resources, project collaboration and digital production tools within a unified platform.",
    icon: Palette,
    quickInfo: {
      category: "Creative Platform",
      platform: "Web Platform",
      started: "2026",
      stage: "Concept & Development"
    },
    techPills: ["Design", "Creative", "Workspace", "Collaboration", "UI/UX"],
    buttonText: "Coming Soon",
    tooltip: "Available after public launch."
  }
];

export default function EcosystemSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="ecosystem" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 scroll-mt-24">
      
      {/* Background Glows & Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00FF88]/5 blur-[140px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[11px] uppercase tracking-widest">
          <Globe className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>Ecosystem 🌐 The IGRIS Ecosystem</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          The IGRIS Ecosystem
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Building products beyond client work. Proprietary platforms and software suites expanding our vision for developers, businesses, and creators.
        </p>

        <div className="pt-1 flex items-center justify-center gap-2 text-xs font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
          <span>A horizontal showcase</span>
        </div>
      </div>

      {/* THREE LARGE PREMIUM PRODUCT CARDS */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {ECOSYSTEM_PRODUCTS.map((product) => {
          const IconComponent = product.icon;
          const isButtonHovered = hoveredButton === product.id;

          return (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-[#090A0E]/80 backdrop-blur-xl border border-white/10 hover:border-[#00FF88]/40 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_-10px_rgba(0,255,136,0.12)] overflow-hidden"
            >
              {/* Subtle Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header Row: Icon & Status Badge */}
                <div className="flex items-start justify-between mb-6 gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white group-hover:border-[#00FF88]/40 group-hover:bg-[#00FF88]/10 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-[#00FF88] transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-semibold tracking-wider">
                    <span>{product.badge}</span>
                  </div>
                </div>

                {/* Product Name & Category */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-[#00FF88] transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {product.description}
                </p>

                {/* Quick Information Box */}
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 mb-6 space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#00FF88] font-bold flex items-center gap-1.5 border-b border-white/5 pb-2 mb-2">
                    <Zap className="w-3 h-3" />
                    <span>Quick Information</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Category</span>
                      <span className="text-zinc-300 font-medium">{product.quickInfo.category}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Platform</span>
                      <span className="text-zinc-300 font-medium">{product.quickInfo.platform}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Started</span>
                      <span className="text-zinc-300 font-medium">{product.quickInfo.started}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 block">Development Stage</span>
                      <span className="text-zinc-300 font-medium">{product.quickInfo.stage}</span>
                    </div>
                  </div>
                </div>

                {/* Technology Pills */}
                <div className="mb-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.techPills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono bg-white/[0.04] border border-white/10 text-zinc-300 group-hover:border-[#00FF88]/20 group-hover:text-[#00FF88] px-2.5 py-1 rounded-md transition-all duration-300"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional Future Features */}
                {product.futureFeatures && product.futureFeatures.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Future Features
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.futureFeatures.map((feat, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono bg-[#00FF88]/5 border border-[#00FF88]/15 text-[#00FF88] px-2 py-0.5 rounded-full flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#00FF88]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Disabled Visit Button with Tooltip */}
              <div className="pt-4 border-t border-white/5 relative">
                {/* Tooltip Popup on Hover */}
                {isButtonHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] font-mono px-3 py-1 rounded-md whitespace-nowrap shadow-xl z-20 pointer-events-none"
                  >
                    {product.tooltip}
                  </motion.div>
                )}

                <button
                  disabled
                  onMouseEnter={() => setHoveredButton(product.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="w-full py-3.5 px-6 rounded-xl bg-white/[0.02] border border-white/10 text-zinc-500 font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-60 transition-all duration-200"
                >
                  <Lock className="w-3.5 h-3.5 text-zinc-600" />
                  <span>{product.buttonText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* BOTTOM SECTION */}
      <div className="mt-20 pt-12 border-t border-white/10 text-center space-y-6 max-w-2xl mx-auto">
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
          The IGRIS Ecosystem is continuously evolving. More products and platforms will be introduced as we expand our vision for developers, businesses and creators.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-zinc-300 text-xs font-mono">
          <span>🚀 More Products Coming</span>
        </div>
      </div>

    </section>
  );
}
