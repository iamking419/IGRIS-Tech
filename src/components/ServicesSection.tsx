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
  Clock
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
    <section id="services" className="relative py-24 px-6 max-w-7xl mx-auto z-10 scroll-mt-24">
      {/* Decorative overhead element */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 font-mono text-[10px] uppercase tracking-widest animate-pulse-slow">
          <Clock className="w-3 h-3" />
          <span>Core Competencies & Services</span>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight mb-4">
          Software Crafted at <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Production Standards</span>
        </h2>
        <p className="text-gray-400 font-sans text-lg leading-relaxed">
          We operate at the intersection of extreme speed, relational durability, and cybersecurity integrity. 
          Select an engineering field to view our proprietary pipelines.
        </p>
      </div>

      {/* Grid of Bento-style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, index) => {
          const IconComponent = IconMap[service.iconName] || Cpu;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              onClick={() => setSelectedService(service)}
              className="group relative rounded-2xl glass-card p-6 p-y-8 cursor-pointer overflow-hidden flex flex-col justify-between h-[280px]"
            >
              {/* Card border shine hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full ease-out" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 group-hover:text-emerald-300 group-hover:border-emerald-500/40 transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm font-sans line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400/80 group-hover:text-emerald-300 transition-colors mt-4">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-[#0A0A0A] border border-white/5 p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    {(() => {
                      const IconComponent = IconMap[selectedService.iconName] || Cpu;
                      return <IconComponent className="w-7 h-7" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white">
                      {selectedService.title}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                      IGRIS Specialty Unit
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono"
                >
                  Close
                </button>
              </div>

              {/* Long Description */}
              <div className="mb-6">
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {selectedService.longDesc}
                </p>
              </div>

              {/* Capabilities & Tech Used */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white mb-3 tracking-wide">
                    Core Technical Actions
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedService.capabilities.map((capability, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-400">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display font-semibold text-sm text-white mb-3 tracking-wide">
                    Operational Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/5 text-xs font-mono text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA within Modal */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-xs text-zinc-500 font-sans">
                  * All processes are ISO 27001 secure & GDPR compliant by default.
                </span>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const el = document.getElementById("scoper-form");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-emerald-400 hover:text-black transition-all uppercase tracking-tighter shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer text-center"
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
