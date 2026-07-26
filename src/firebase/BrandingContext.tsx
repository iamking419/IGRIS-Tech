import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BrandingService, BrandingData, DEFAULT_BRANDING } from "./branding";
import { FirestoreService } from "./firestore";

export interface BrandingContextValue {
  logo: string;
  favicon: string;
  companyName: string;
  themeColor: string;
  loadingLogo: string;
  loadingMessage: string;
  lastUpdated: string;
  isLoading: boolean;
  brandingData: BrandingData;
  refreshBranding: () => Promise<void>;
  updateBranding: (updates: Partial<BrandingData>) => Promise<void>;
  uploadAndApplyLogo: (file: File) => Promise<void>;
  resetToDefault: () => Promise<void>;
}

const BrandingContext = createContext<BrandingContextValue | null>(null);

export function updateDOMFavicon(url: string) {
  if (typeof document === "undefined" || !url) return;

  const iconLinks = Array.from(document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']"));
  const appleTouchLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");

  if (iconLinks.length === 0) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
  } else {
    iconLinks.forEach((link) => {
      link.href = url;
      if (url.startsWith("data:image/svg+xml")) {
        link.type = "image/svg+xml";
      } else if (url.startsWith("data:image/png")) {
        link.type = "image/png";
      }
    });
  }

  if (appleTouchLink) {
    appleTouchLink.href = url;
  } else {
    const appleLink = document.createElement("link");
    appleLink.rel = "apple-touch-icon";
    appleLink.href = url;
    document.head.appendChild(appleLink);
  }
}

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingData>(() => {
    return BrandingService.getCachedBranding() || DEFAULT_BRANDING;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync browser favicon whenever favicon changes
  useEffect(() => {
    if (branding.faviconUrl) {
      updateDOMFavicon(branding.faviconUrl);
    }
  }, [branding.faviconUrl]);

  // Initial load & real-time Firestore sync
  useEffect(() => {
    let isMounted = true;

    // Fast initial load from cache / Firestore doc
    BrandingService.getBranding().then((data) => {
      if (isMounted) {
        setBranding(data);
        setIsLoading(false);
      }
    });

    // Subscribe to Firestore for real-time branding updates across tabs / clients
    const unsubscribe = FirestoreService.subscribeToDocument<BrandingData>(
      "branding/current",
      (remoteData) => {
        if (isMounted && remoteData && remoteData.logoUrl) {
          const merged = { ...DEFAULT_BRANDING, ...remoteData };
          setBranding(merged);
          BrandingService.setCachedBranding(merged);
        }
      }
    );

    // Listen to local events
    const handleLocalUpdate = () => {
      const cached = BrandingService.getCachedBranding();
      if (cached && isMounted) {
        setBranding(cached);
      }
    };

    window.addEventListener("igris_branding_updated", handleLocalUpdate);
    window.addEventListener("igris_logo_updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);

    return () => {
      isMounted = false;
      unsubscribe();
      window.removeEventListener("igris_branding_updated", handleLocalUpdate);
      window.removeEventListener("igris_logo_updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    };
  }, []);

  const refreshBranding = useCallback(async () => {
    setIsLoading(true);
    const data = await BrandingService.getBranding();
    setBranding(data);
    setIsLoading(false);
    window.dispatchEvent(new Event("igris_branding_updated"));
  }, []);

  const updateBranding = useCallback(async (updates: Partial<BrandingData>) => {
    const newBranding = await BrandingService.updateBranding(updates);
    setBranding(newBranding);
    window.dispatchEvent(new Event("igris_branding_updated"));
    window.dispatchEvent(new Event("igris_logo_updated"));
  }, []);

  const uploadAndApplyLogo = useCallback(async (file: File) => {
    setIsLoading(true);
    try {
      const newBranding = await BrandingService.uploadAndApplyLogo(file);
      setBranding(newBranding);
      window.dispatchEvent(new Event("igris_branding_updated"));
      window.dispatchEvent(new Event("igris_logo_updated"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetToDefault = useCallback(async () => {
    setIsLoading(true);
    try {
      const defaultData = await BrandingService.resetToDefault();
      setBranding(defaultData);
      window.dispatchEvent(new Event("igris_branding_updated"));
      window.dispatchEvent(new Event("igris_logo_updated"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: BrandingContextValue = {
    logo: branding.logoUrl || DEFAULT_BRANDING.logoUrl,
    favicon: branding.faviconUrl || DEFAULT_BRANDING.faviconUrl,
    companyName: branding.companyName || DEFAULT_BRANDING.companyName,
    themeColor: branding.themeColor || DEFAULT_BRANDING.themeColor,
    loadingLogo: branding.loadingLogoUrl || DEFAULT_BRANDING.loadingLogoUrl,
    loadingMessage: branding.loadingMessage || DEFAULT_BRANDING.loadingMessage,
    lastUpdated: branding.updatedAt || DEFAULT_BRANDING.updatedAt,
    isLoading,
    brandingData: branding,
    refreshBranding,
    updateBranding,
    uploadAndApplyLogo,
    resetToDefault
  };

  return <BrandingContext.Provider value={value}>{children}</BrandingContext.Provider>;
};

export function useBrandingContext() {
  const ctx = useContext(BrandingContext);
  if (!ctx) {
    throw new Error("useBrandingContext must be used within a BrandingProvider");
  }
  return ctx;
}
