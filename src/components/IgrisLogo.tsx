import React, { useState, useEffect } from "react";
import { useBranding, updateDOMFavicon } from "../firebase";

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

export function syncFavicon(customLogoUrl?: string | null) {
  if (customLogoUrl !== undefined) {
    updateDOMFavicon(customLogoUrl || "/favicon.ico");
  } else {
    const custom = getCustomLogo();
    updateDOMFavicon(custom || "/favicon.ico");
  }
}

export default function IgrisLogo({
  className = "w-8 h-8",
  size,
  showText = false,
  textClassName = "font-display font-bold tracking-tight text-lg text-white uppercase"
}: IgrisLogoProps) {
  const { logo, companyName } = useBranding();

  const customStyle = size ? { width: size, height: size } : {};

  return (
    <div className="flex items-center space-x-3 shrink-0">
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={customStyle}
      >
        <img 
          src={logo || "/logo.jpg"} 
          alt={`${companyName || "IGRIS Tech"} Logo`} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {showText && (
        <span className={textClassName}>{companyName || "IGRIS TECH"}</span>
      )}
    </div>
  );
}

