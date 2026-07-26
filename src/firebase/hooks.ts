import { useBrandingContext } from "./BrandingContext";
import { app, db, storage, auth } from "./app";
import { StorageService } from "./storage";

/**
 * Custom hook to access global branding parameters & actions.
 */
export function useBranding() {
  return useBrandingContext();
}

/**
 * Custom hook to access raw Firebase app, db, storage, auth instances.
 */
export function useFirebase() {
  return {
    app,
    db,
    storage,
    auth
  };
}

/**
 * Custom hook for Firebase storage operations.
 */
export function useStorage() {
  return {
    storage,
    uploadFile: StorageService.uploadFile
  };
}
