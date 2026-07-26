import { BrandingService } from "./branding";
import { StorageService } from "./storage";
import { FirestoreService } from "./firestore";

export { BrandingService, StorageService, FirestoreService };

// --- Future Firebase Service Placeholders ---
export class FutureAuthService {
  static async getCurrentUser() {
    return null;
  }
}

export class FutureNotificationService {
  static async sendNotification(message: string) {
    console.log("[FutureNotificationService] Notification queued:", message);
  }
}

export class FutureAnalyticsService {
  static logEvent(eventName: string, params?: Record<string, any>) {
    console.log("[FutureAnalyticsService] Event logged:", eventName, params);
  }
}

export class FuturePortfolioService {
  static async getProjects() {
    return [];
  }
}

export class FutureAnnouncementService {
  static async getAnnouncements() {
    return [];
  }
}

export class FutureCMSService {
  static async getContent(slug: string) {
    return null;
  }
}
