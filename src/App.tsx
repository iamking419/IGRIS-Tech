import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Code,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Clock
} from "lucide-react";

import Navigation from "./components/Navigation";
import IgrisLogo from "./components/IgrisLogo";
import GridBackground from "./components/GridBackground";
import ServicesSection from "./components/ServicesSection";
import TechStandards from "./components/TechStandards";
import EcosystemSection from "./components/EcosystemSection";
import ProjectScoper from "./components/ProjectScoper";
import PortfolioSection from "./components/PortfolioSection";
import OurProcess from "./components/OurProcess";
import WhyChooseUs from "./components/WhyChooseUs";
import Announcements from "./components/Announcements";
import FAQ from "./components/FAQ";
import ContactSection from "./components/ContactSection";
import LogoManager from "./components/LogoManager";

export default function App() {
  const [view, setView] = useState<"website" | "scoper" | "logo">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/logo" || path === "/logo/" || window.location.hash === "#/logo") {
        return "logo";
      }
    }
    return "website";
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === "/logo" || path === "/logo/" || hash === "#/logo" || hash === "#logo") {
        setView("logo");
      } else if (view === "logo") {
        setView("website");
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, [view]);

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (view === "logo") {
    return (
      <div className="relative min-h-screen text-gray-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        <GridBackground />
        <LogoManager 
          onBackToHome={() => { 
            setView("website"); 
            try {
              window.history.pushState({}, "", "/");
            } catch (e) {
              console.error(e);
            }
            window.scrollTo({ top: 0, behavior: "smooth" }); 
          }} 
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Immersive background lights, grid patterns, floating dust */}
      <GridBackground />

      {/* Dynamic floating navigation */}
      <Navigation 
        currentView={view === "scoper" ? "scoper" : "website"} 
        setView={(v) => setView(v)} 
        onNavigateToSection={handleNavigateToSection} 
      />

      <AnimatePresence mode="wait">
        {view === "scoper" ? (
          <motion.div
            key="scoper-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="pt-24 min-h-screen"
          >
            <ProjectScoper onBackToHome={() => { setView("website"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </motion.div>
        ) : (
          <motion.div
            key="website-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-16"
          >
            {/* HERO SECTION */}
            <section id="hero" className="relative pt-24 pb-16 sm:pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center z-10">
              {/* Trust Badge / Tech Label */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>IGRIS TECH — DOMINATE THE FUTURE. NOW</span>
              </motion.div>

              {/* Bold Headlines */}
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-bold text-5xl sm:text-7xl lg:text-[84px] tracking-tighter leading-[0.95] text-white max-w-5xl mb-6"
              >
                Architecting <br /><span className="text-zinc-600">High-Trust</span> Software.
              </motion.h1>

              {/* Readable descriptive body */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-sans text-zinc-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mb-10"
              >
                We design, build, deploy and maintain scalable software platforms with modern UI, secure backend architecture and long-term support.
              </motion.p>

              {/* Multi-state interactive buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
              >
                <button
                  onClick={() => setView("scoper")}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black font-sans font-bold text-sm px-8 py-3.5 rounded-full hover:bg-emerald-400 transition-all uppercase tracking-tighter shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 fill-black text-black" />
                  <span>Launch Project Planner</span>
                </button>

                <button
                  onClick={() => handleNavigateToSection("services")}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0A0A0A] border border-white/5 hover:border-emerald-500/30 text-zinc-400 hover:text-white font-sans font-semibold text-sm px-8 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  <span>Explore Specialties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Trust Metric Counters */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 border-t border-white/5 pt-12 mt-16 w-full"
              >
                {[
                  { value: "25+", label: "Projects Delivered" },
                  { value: "4 Active", label: "Products Building" },
                  { value: "6+ Years", label: "Years Learning" },
                  { value: "100%", label: "Client Satisfaction" }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center md:text-left bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-emerald-500/20 transition-all">
                    <div className="font-display font-bold text-lg sm:text-xl text-white mb-0.5">{stat.value}</div>
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* TRUST BRAND BAR */}
            <section className="py-10 border-y border-white/5 bg-[#0A0A0A]/40 overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-6">
                <p className="text-center font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-6">
                  Supporting Next-Gen Technical Operations Worldwide
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-10 items-center justify-items-center opacity-30 select-none">
                  {["VESPER CAP", "KRYPTON HLT", "NEXUS SEC", "AETHER LABS", "OASIS DEVS"].map((brand, idx) => (
                    <div key={idx} className="font-display font-bold text-xs sm:text-sm text-white tracking-widest uppercase">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CORE SERVICES */}
            <ServicesSection />

            {/* TECHNOLOGY STANDARDS & SANDBOXES */}
            <TechStandards />

            {/* IGRIS ECOSYSTEM SHOWCASE */}
            <EcosystemSection />

            {/* PORTFOLIO SECTION */}
            <PortfolioSection onLaunchScoper={() => setView("scoper")} />

            {/* OUR PROCESS TIMELINE */}
            <OurProcess />

            {/* WHY CHOOSE US / ABOUT */}
            <WhyChooseUs />

            {/* ANNOUNCEMENTS SECTION */}
            <Announcements />

            {/* FREQUENTLY ASKED QUESTIONS */}
            <FAQ />

            {/* INTERACTIVE PROJECT PLANNER CTA */}
            <section className="relative py-16 px-6 max-w-7xl mx-auto z-10">
              <div className="rounded-3xl bg-[#0A0A0A] border border-white/5 p-8 sm:p-12 overflow-hidden relative">
                {/* Visual Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-950/10 blur-[80px] pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  <div className="lg:col-span-8">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em] font-bold block mb-2">
                      Precision Project Scoping
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-4xl text-white mb-4">
                      Build Your Custom Software Architecture
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                      Use our interactive Project Planner to define your technical requirements, select target budget and timeline parameters, and transmit structured specs directly to our lead engineering group.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex justify-start lg:justify-end">
                    <button
                      onClick={() => setView("scoper")}
                      className="flex items-center space-x-2 bg-white text-black font-sans font-bold text-xs px-6 py-3.5 rounded-full hover:bg-emerald-400 hover:text-black transition-all uppercase tracking-tighter shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-black fill-black" />
                      <span>Launch Project Planner</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* EMBEDDED PROJECT PLANNER */}
            <ProjectScoper onBackToHome={() => { setView("website"); window.scrollTo({ top: 0, behavior: "smooth" }); }} />

            {/* REDESIGNED PREMIUM CLIENT LEAD FORM */}
            <ContactSection />

            {/* FOOTER */}
            <footer className="relative bg-[#02050b] border-t border-white/5 py-16 px-6 z-10 text-xs text-gray-500">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
                
                {/* Brand Col */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center space-x-2.5 text-white">
                    <IgrisLogo className="w-7 h-7" showText textClassName="font-display font-bold text-sm tracking-widest uppercase" />
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-400 max-w-xs">
                    A premium technical operations group specializing in high-throughput custom software, cloud compliance directories, and zero-trust systems.
                  </p>
                  <div>
                    <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block mb-1">Motto</span>
                    <span className="font-display font-black text-xs text-white tracking-[0.15em] block">
                      DOMINATE THE FUTURE. NOW.
                    </span>
                  </div>
                </div>

                {/* Links Grid */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                  
                  {/* Quick Links */}
                  <div>
                    <h5 className="font-mono text-white text-[10px] uppercase tracking-widest mb-4 font-bold text-zinc-300">Quick Links</h5>
                    <ul className="space-y-2 text-[11px]">
                      <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Home</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Services</a></li>
                      <li><a href="#portfolio" className="hover:text-emerald-400 transition-colors">Portfolio</a></li>
                      <li><a href="#process" className="hover:text-emerald-400 transition-colors">Our Process</a></li>
                      <li><a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                      <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a></li>
                    </ul>
                  </div>

                  {/* Services */}
                  <div>
                    <h5 className="font-mono text-white text-[10px] uppercase tracking-widest mb-4 font-bold text-zinc-300">Services</h5>
                    <ul className="space-y-2 text-[11px]">
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Custom Software</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Web Applications</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Backend Engineering</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">AI & ML Solutions</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Cybersecurity Systems</a></li>
                      <li><a href="#services" className="hover:text-emerald-400 transition-colors">Cloud Ingress</a></li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div>
                    <h5 className="font-mono text-white text-[10px] uppercase tracking-widest mb-4 font-bold text-zinc-300">Contact</h5>
                    <ul className="space-y-2 text-[11px] text-zinc-400">
                      <li className="hover:text-white transition-colors"><a href="mailto:igristech.hq@gmail.com">igristech.hq@gmail.com</a></li>
                      <li className="hover:text-white transition-colors"><a href="https://wa.me/2348147648714" target="_blank" rel="noreferrer">WhatsApp: +234 814 764 8714</a></li>
                      <li className="hover:text-white transition-colors"><a href="https://t.me/igristech" target="_blank" rel="noreferrer">Telegram: @igristech</a></li>
                    </ul>
                  </div>

                  {/* Socials & Compliance */}
                  <div>
                    <h5 className="font-mono text-white text-[10px] uppercase tracking-widest mb-4 font-bold text-zinc-300">Governance</h5>
                    <ul className="space-y-2 text-[11px]">
                      <li className="flex items-center gap-1 text-emerald-400/80"><CheckCircle className="w-3 h-3" /> ISO 27001 Secure</li>
                      <li className="flex items-center gap-1 text-emerald-400/80"><CheckCircle className="w-3 h-3" /> GDPR Compliant</li>
                      <li className="flex items-center gap-1 text-emerald-400/80"><CheckCircle className="w-3 h-3" /> SOC2 Type II</li>
                      <li><button onClick={() => setView("scoper")} className="hover:text-white transition-colors text-left font-mono text-[9px] text-zinc-400 underline uppercase">Project Planner</button></li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
                <span>© 2026 IGRIS Tech Corporation. All rights reserved. Registered USA / San Francisco.</span>
                <div className="flex items-center gap-3">
                  <a href="https://github.com/igristech" className="hover:text-white transition-colors">GitHub</a>
                  <span>•</span>
                  <a href="https://linkedin.com/company/igristech" className="hover:text-white transition-colors">LinkedIn</a>
                  <span>•</span>
                  <a href="https://twitter.com/igristech" className="hover:text-white transition-colors">Twitter</a>
                  <span>•</span>
                  <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 border border-emerald-500/15 rounded-md">
                    NOMINAL OPERATIONAL INTEGRITY
                  </span>
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
