import React, { useState } from "react";
import { motion, Variants } from "motion/react";
import { 
  Megaphone, 
  Calendar, 
  ArrowUpRight, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  RefreshCw 
} from "lucide-react";

export interface AnnouncementItem {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  status: string;
  buttonText: string;
  tooltip: string;
}

export const ANNOUNCEMENTS_DATA: AnnouncementItem[] = [
  {
    id: "ann-1",
    category: "🚀 Product Update",
    title: "Building the IGRIS Ecosystem",
    description: "Development continues across the IGRIS ecosystem, including IGRIS AI, IGRIS Code Camp and IGRIS Studio. These platforms are being designed to deliver intelligent tools, educational experiences and creative solutions under one unified vision.",
    date: "July 2026",
    status: "Active Development",
    buttonText: "Read More",
    tooltip: "More details coming soon."
  },
  {
    id: "ann-2",
    category: "🏢 Company",
    title: "IGRIS Tech Website Officially Launches",
    description: "Our new company website is now live, providing a central destination to explore our services, products, selected work and future innovations. This marks an important milestone as we continue growing the IGRIS Tech ecosystem.",
    date: "July 2026",
    status: "Released",
    buttonText: "Read More",
    tooltip: "More details coming soon."
  },
  {
    id: "ann-3",
    category: "💼 Selected Work",
    title: "New Client Projects Added",
    description: "Our Selected Work section has been expanded with recently completed client websites, demonstrating our approach to modern web design, business-focused solutions and premium digital experiences.",
    date: "July 2026",
    status: "Updated",
    buttonText: "Read More",
    tooltip: "More details coming soon."
  }
];

export default function Announcements() {
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
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <section id="announcements" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 scroll-mt-24 border-t border-white/5">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00FF88]/5 blur-[140px] pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[11px] uppercase tracking-widest font-bold">
          <Megaphone className="w-3.5 h-3.5 text-[#00FF88]" />
          <span>LATEST UPDATES</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          What's New at IGRIS Tech
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
          Follow the latest announcements, product progress and company updates as we continue building modern software and digital experiences.
        </p>
      </div>

      {/* THREE ANNOUNCEMENT CARDS GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {ANNOUNCEMENTS_DATA.map((item) => {
          const isHovered = hoveredButton === item.id;

          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group relative bg-[#090A0E]/80 backdrop-blur-xl border border-white/10 hover:border-[#00FF88]/40 rounded-[22px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_12px_40px_-10px_rgba(0,255,136,0.12)] overflow-hidden"
            >
              {/* Green Accent Line at the top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Header Row: Category Badge & Status Indicator */}
                <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold bg-white/[0.04] border border-white/10 text-white px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20 text-[#00FF88] font-mono text-[10px] uppercase font-semibold">
                    {item.status === "Active Development" && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FF88]"></span>
                      </span>
                    )}
                    {item.status === "Released" && <CheckCircle2 className="w-3 h-3 text-[#00FF88]" />}
                    {item.status === "Updated" && <RefreshCw className="w-3 h-3 text-[#00FF88]" />}
                    <span>{item.status}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#00FF88] transition-colors duration-300 tracking-tight mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {item.description}
                </p>
              </div>

              {/* Bottom Section: Date & Read More Button */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                  <Calendar className="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>{item.date}</span>
                </div>

                {/* Read More Button (Disabled with Tooltip) */}
                <div className="relative">
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-white/10 text-zinc-300 text-[11px] font-mono px-3 py-1 rounded-md whitespace-nowrap shadow-xl z-20 pointer-events-none"
                    >
                      {item.tooltip}
                    </motion.div>
                  )}

                  <button
                    disabled
                    onMouseEnter={() => setHoveredButton(item.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                    className="w-full py-3 px-5 rounded-xl bg-white/[0.02] border border-white/10 text-zinc-500 font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-60 transition-all duration-200"
                  >
                    <Lock className="w-3.5 h-3.5 text-zinc-600" />
                    <span>{item.buttonText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </motion.div>

      {/* BOTTOM TEXT */}
      <div className="mt-16 text-center max-w-2xl mx-auto">
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
          More updates will be published as IGRIS Tech continues to grow and launch new products, services and client projects.
        </p>
      </div>

    </section>
  );
}
