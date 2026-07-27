import { useEffect, useState } from "react";

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#040606]" />;

  return (
    <div className="fixed inset-0 z-0 bg-[#040606] overflow-hidden pointer-events-none select-none">
      
      {/* LAYER 1 — Layered Charcoal Mesh Background */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, #081010 0%, transparent 50%),
            radial-gradient(circle at 90% 15%, #070b0b 0%, transparent 50%),
            radial-gradient(circle at 35% 45%, #091313 0%, transparent 50%),
            radial-gradient(circle at 85% 75%, #0a1413 0%, transparent 50%),
            radial-gradient(circle at 15% 90%, #050808 0%, transparent 50%)
          `
        }}
      />

      {/* LAYER 2 & LAYER 5 — Living Premium Ambient Lighting with Slow Motion (40s - 80s) */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Top Left — Soft Emerald */}
        <div 
          className="absolute -top-[100px] sm:-top-[200px] -left-[100px] sm:-left-[200px] w-[350px] sm:w-[1000px] h-[350px] sm:h-[1000px] rounded-full blur-[60px] sm:blur-[140px] opacity-70 sm:opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(13,159,110,0.06) 0%, rgba(13,159,110,0) 70%)",
          }}
        />

        {/* Center — Deep Teal */}
        <div 
          className="absolute top-[35%] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[1200px] h-[400px] sm:h-[1200px] rounded-full blur-[60px] sm:blur-[150px] opacity-60 sm:opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, rgba(20,184,166,0) 70%)",
          }}
        />

        {/* Bottom Right — Cyan */}
        <div 
          className="absolute -bottom-[150px] sm:-bottom-[300px] -right-[100px] sm:-right-[200px] w-[350px] sm:w-[1100px] h-[350px] sm:h-[1100px] rounded-full blur-[60px] sm:blur-[140px] opacity-60 sm:opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, rgba(34,211,238,0) 70%)",
          }}
        />

        {/* Desktop-Only Ambient Lights */}
        <div 
          className="hidden md:block absolute top-[60%] -left-[300px] w-[900px] h-[900px] rounded-full blur-[130px] opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, rgba(22,163,74,0) 70%)",
          }}
        />

        <div 
          className="hidden md:block absolute -top-[100px] right-[5%] w-[850px] h-[850px] rounded-full blur-[130px] opacity-80"
          style={{
            background: "radial-gradient(circle, rgba(45,212,191,0.04) 0%, rgba(45,212,191,0) 70%)",
          }}
        />
      </div>

      {/* LAYER 6 — Hero Glow */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[320px] sm:w-[900px] h-[320px] sm:h-[900px] rounded-full blur-[50px] sm:blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,159,110,0.05) 0%, rgba(13,159,110,0) 70%)"
        }}
      />

      {/* LAYER 8 — Section Environmental Ambient Lights (Desktop Optimized) */}
      <div 
        className="hidden md:block absolute top-[1200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(20,184,166,0.05) 0%, rgba(20,184,166,0) 70%)"
        }}
      />

      <div 
        className="hidden md:block absolute top-[2400px] right-10 w-[900px] h-[650px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(34,211,238,0.03) 50%, transparent 70%)"
        }}
      />

      {/* About/Process Section Deep Green Light */}
      <div 
        className="absolute top-[3600px] left-10 w-[850px] h-[600px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(22,163,74,0.05) 0%, rgba(22,163,74,0) 70%)"
        }}
      />

      {/* Project Planner Section Emerald Light */}
      <div 
        className="absolute top-[4800px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(13,159,110,0.06) 0%, rgba(13,159,110,0) 70%)"
        }}
      />

      {/* Footer / Contact Section Dark Cyan Light */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.05) 0%, rgba(45,212,191,0) 70%)"
        }}
      />

      {/* LAYER 3 — Futuristic Engineering 64px Grid with Radial Mask Fade */}
      <div className="absolute inset-0 grid-bg-64 opacity-100 pointer-events-none" />

      {/* LAYER 4 — Microscopic CSS Noise Grain Layer */}
      <div className="noise-texture-layer" />

    </div>
  );
}

