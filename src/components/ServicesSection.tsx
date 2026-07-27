import { useState, ComponentType } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../data/servicesData";
import { ServiceDetail } from "../types";
import { 
  Cpu, 
  Globe, 
  BrainCircuit, 
  Layers, 
  ShieldAlert, 
  Cloud, 
  ArrowUpRight, 
  ChevronRight, 
  CheckCircle,
  Clock,
  X
} from "lucide-react";

// Dynamic Lucide icon mapping
const IconMap: Record<string, ComponentType<any>> = {
  Cpu,
  Globe,
  BrainCircuit,
  Layers,
  ShieldAlert,
  Cloud
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  return (
    <section id="services" className="relative py-20 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto z-10 scroll-mt-24">
      {/* Decorative overhead element */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center mb-4"
      >
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 font-mono text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Clock className="w-3 h-3" />
          <span>Core Competencies & Services</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-4">
          Software Crafted at <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">Production Standards</span>
        </h2>
        <p className="text-gray-400 font-sans text-sm sm:text-lg leading-relaxed">
          We operate at the intersection of extreme speed, relational durability, and cybersecurity integrity. 
          Select an engineering field to view our proprietary pipelines.
        </p>
      </motion.div>

      {/* Grid of Bento-style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {servicesData.map((service, index) => {
          const IconComponent = IconMap[service.iconName] || Cpu;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              onClick={() => setSelectedService(service)}
              className="group relative rounded-2xl glass-card p-5 sm:p-6 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[240px] sm:h-[280px] hover:border-emerald-500/40 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)] transition-all duration-300"
            >
              {/* Card border shine hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full ease-out" />
              
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/40 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-semibold text-base sm:text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm font-sans line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400 group-hover:text-emerald-300 transition-colors mt-4">
                <span>Deploy Blueprint</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Glassmorphic Modal for Deep Capability Specs */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            key="services-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm sm:backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#080c10] sm:bg-[#0A0A0A] border border-white/10 p-5 sm:p-8 shadow-2xl my-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5 gap-3">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    {(() => {
                      const IconComponent = IconMap[selectedService.iconName] || Cpu;
                      return <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-2xl text-white leading-tight">
                      {selectedService.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-mono text-emerald-400 uppercase tracking-widest block mt-0.5">
                      IGRIS Specialty Unit
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 sm:px-3.5 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Long Description */}
              <div className="mb-5 sm:mb-6">
                <p className="text-zinc-300 text-xs sm:text-sm sm:text-base leading-relaxed">
                  {selectedService.longDesc}
                </p>
              </div>

              {/* Capabilities & Tech Used */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 border-t border-white/10 pt-5 sm:pt-6">
                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-white mb-3 tracking-wide uppercase font-mono">
                    Core Technical Actions
                  </h4>
                  <ul className="space-y-2">
                    {selectedService.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-white mb-3 tracking-wide uppercase font-mono">
                    Operational Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {selectedService.techUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-white/[0.03] border border-white/10 text-[11px] sm:text-xs font-mono text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA within Modal */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <span className="text-[10px] sm:text-xs text-zinc-500 font-sans">
                  * All processes are ISO 27001 secure & GDPR compliant by default.
                </span>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const el = document.getElementById("scoper-form") || document.getElementById("scoper");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-emerald-400 hover:text-black transition-all uppercase tracking-tighter shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer text-center"
                >
                  Scope This Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
