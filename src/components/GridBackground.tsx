import { useEffect, useState } from "react";

export default function GridBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 bg-[#050505]" />;

  return (
    <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none select-none">
      {/* Soft Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Subtle Static Ambient Glow at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-emerald-950/5 via-transparent to-transparent blur-[120px]" />
    </div>
  );
}
