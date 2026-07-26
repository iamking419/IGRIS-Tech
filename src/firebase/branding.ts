import { FirestoreService } from "./firestore";
import { StorageService } from "./storage";

export interface BrandingData {
  logoUrl: string;
  faviconUrl: string;
  companyName: string;
  themeColor: string;
  loadingLogoUrl: string;
  loadingMessage: string;
  updatedAt: string;
}

export const DEFAULT_BRANDING: BrandingData = {
  logoUrl: "/logo.jpg",
  faviconUrl: "/favicon.ico",
  companyName: "IGRIS Tech",
  themeColor: "#00FF88",
  loadingLogoUrl: "/logo.jpg",
  loadingMessage: "Initializing IGRIS Systems...",
  updatedAt: new Date().toISOString()
};

const BRANDING_DOC_PATH = "branding/current";
const BRANDING_CACHE_KEY = "igris_branding_cache";

export class BrandingService {
  /**
   * Retrieves branding data from local cache or Firestore.
   */
  static async getBranding(): Promise<BrandingData> {
    // 1. Try local cache first
    const cached = this.getCachedBranding();

    try {
      // 2. Fetch from Firestore doc
      const remoteData = await FirestoreService.getDocument<BrandingData>(BRANDING_DOC_PATH);
      if (remoteData && remoteData.logoUrl) {
        const merged: BrandingData = {
          ...DEFAULT_BRANDING,
          ...remoteData
        };
        this.setCachedBranding(merged);
        return merged;
      }
    } catch (err) {
      console.warn("Notice: Firestore branding fetch fallback:", err);
    }

    if (cached) return cached;
    return DEFAULT_BRANDING;
  }

  /**
   * Updates branding in Firestore and updates local cache.
   */
  static async updateBranding(updates: Partial<BrandingData>): Promise<BrandingData> {
    const current = (await this.getCachedBranding()) || DEFAULT_BRANDING;
    const updated: BrandingData = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Save to local cache immediately for instant UI response
    this.setCachedBranding(updated);

    // Save to Firestore
    try {
      await FirestoreService.setDocument(BRANDING_DOC_PATH, updated, true);
    } catch (err) {
      console.warn("Notice: Could not sync branding update to Firestore:", err);
    }

    return updated;
  }

  /**
   * Uploads logo file to Storage and applies it across logoUrl, faviconUrl, loadingLogoUrl.
   */
  static async uploadAndApplyLogo(file: File): Promise<BrandingData> {
    const fileExt = file.name.split(".").pop() || "png";
    const path = `branding/logo_${Date.now()}.${fileExt}`;
    
    // Upload image file to Firebase Storage (with Data URL fallback)
    const downloadUrl = await StorageService.uploadFile(file, path);

    return await this.updateBranding({
      logoUrl: downloadUrl,
      faviconUrl: downloadUrl,
      loadingLogoUrl: downloadUrl
    });
  }

  /**
   * Resets custom branding back to default bundled assets.
   */
  static async resetToDefault(): Promise<BrandingData> {
    this.clearCachedBranding();
    try {
      await FirestoreService.setDocument(BRANDING_DOC_PATH, DEFAULT_BRANDING, false);
    } catch (err) {
      console.warn("Notice: Reset branding Firestore write:", err);
    }
    return DEFAULT_BRANDING;
  }

  // --- Local Cache Helpers ---
  static getCachedBranding(): BrandingData | null {
    try {
      const raw = sessionStorage.getItem(BRANDING_CACHE_KEY) || localStorage.getItem(BRANDING_CACHE_KEY);
      if (raw) return JSON.parse(raw);

      // Backwards compatibility with legacy localStorage key
      const legacyLogo = localStorage.getItem("igris_custom_logo");
      if (legacyLogo) {
        return {
          ...DEFAULT_BRANDING,
          logoUrl: legacyLogo,
          faviconUrl: legacyLogo,
          loadingLogoUrl: legacyLogo
        };
      }
    } catch {
      // ignore
    }
    return null;
  }

  static setCachedBranding(data: BrandingData): void {
    try {
      sessionStorage.setItem(BRANDING_CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(BRANDING_CACHE_KEY, JSON.stringify(data));
      // Also keep legacy key synced
      localStorage.setItem("igris_custom_logo", data.logoUrl);
    } catch {
      // ignore
    }
  }

  static clearCachedBranding(): void {
    try {
      sessionStorage.removeItem(BRANDING_CACHE_KEY);
      localStorage.removeItem(BRANDING_CACHE_KEY);
      localStorage.removeItem("igris_custom_logo");
    } catch {
      // ignore
    }
  }
}
