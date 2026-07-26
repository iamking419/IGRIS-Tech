import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import IgrisLogo from "./IgrisLogo";

interface NavigationProps {
  currentView: "website" | "scoper";
  setView: (view: "website" | "scoper") => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Navigation({ currentView, setView, onNavigateToSection }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (currentView === "website") {
        const sections = ["hero", "services", "ecosystem", "portfolio", "process", "announcements", "about", "faq", "contact"];
        let current = "hero";
        for (const sec of sections) {
          const el = document.getElementById(sec);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section top is near the top of the viewport
            if (rect.top <= 160) {
              current = sec;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection(currentView);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentView]);

  const navItems = [
    { label: "Home", section: "hero" },
    { label: "Services", section: "services" },
    { label: "Ecosystem", section: "ecosystem" },
    { label: "Portfolio", section: "portfolio" },
    { label: "Our Process", section: "process" },
    { label: "Announcements", section: "announcements" },
    { label: "About", section: "about" },
    { label: "Contact", section: "contact" },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setView("website");
    setTimeout(() => {
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onNavigateToSection(sectionId);
      }
    }, 100);
  };

  return (
    <>
      <motion.nav
        animate={{
          y: 0,
          paddingTop: scrolled ? "12px" : "24px",
          paddingBottom: scrolled ? "12px" : "24px",
        }}
        initial={{ y: -100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#050505]/95 backdrop-blur-md border-b border-white/5 py-3" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo on the left */}
          <button
            onClick={() => {
              setView("website");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <IgrisLogo className="w-8 h-8" showText textClassName="font-display font-bold tracking-tight text-lg text-white uppercase" />
          </button>
 
          {/* Center navigation links */}
          <div className="hidden lg:flex items-center space-x-6 text-[10px] font-mono tracking-wider uppercase">
            {navItems.map((item) => {
              const isSectionActive = currentView === "website" && activeSection === item.section;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.section)}
                  className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                    isSectionActive ? "text-emerald-400 font-extrabold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isSectionActive && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
 
          {/* Right action button: Project Planner */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => {
                setView(currentView === "scoper" ? "website" : "scoper");
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }, 100);
              }}
              className={`px-5 py-2.5 rounded-full text-[9px] font-mono tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                currentView === "scoper"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-white text-black font-bold hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{currentView === "scoper" ? "Back to Home" : "Project Planner"}</span>
              </span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 p-6 mx-4 rounded-2xl bg-[#050505]/95 backdrop-blur-xl border border-white/10 shadow-2xl block lg:hidden"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.section)}
                  className="w-full text-left py-2.5 text-sm font-semibold text-gray-300 hover:text-emerald-400 transition-colors border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setView("scoper");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-bold py-3 rounded-xl mt-4 shadow-lg shadow-emerald-500/10 text-xs uppercase tracking-wider"
              >
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>Project Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
