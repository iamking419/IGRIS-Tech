import React, { useState, useEffect } from "react";

interface IgrisLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textClassName?: string;
}

export function getCustomLogo(): string | null {
  try {
    return localStorage.getItem("igris_custom_logo");
  } catch (e) {
    return null;
  }
}

export default function IgrisLogo({
  className = "w-8 h-8",
  size,
  showText = false,
  textClassName = "font-display font-bold tracking-tight text-lg text-white uppercase"
}: IgrisLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string>(() => {
    return getCustomLogo() || "/logo.jpg";
  });

  useEffect(() => {
    const handleLogoUpdate = () => {
      const custom = getCustomLogo();
      setLogoSrc(custom || "/logo.jpg");
    };

    window.addEventListener("igris_logo_updated", handleLogoUpdate);
    window.addEventListener("storage", handleLogoUpdate);

    return () => {
      window.removeEventListener("igris_logo_updated", handleLogoUpdate);
      window.removeEventListener("storage", handleLogoUpdate);
    };
  }, []);

  const customStyle = size ? { width: size, height: size } : {};

  return (
    <div className="flex items-center space-x-3 shrink-0">
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={customStyle}
      >
        <img 
          src={logoSrc} 
          alt="IGRIS Tech Logo" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {showText && (
        <span className={textClassName}>IGRIS TECH</span>
      )}
    </div>
  );
}
