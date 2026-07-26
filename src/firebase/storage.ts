import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./app";

export class StorageService {
  /**
   * Uploads a file to Firebase Storage and returns the public download URL.
   * If Firebase Storage is unavailable or fails, gracefully falls back to a Base64 Data URL.
   */
  static async uploadFile(file: File, storagePath: string): Promise<string> {
    if (storage) {
      try {
        const storageRef = ref(storage, storagePath);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      } catch (err) {
        console.warn("Firebase Storage upload notice, falling back to Data URL:", err);
      }
    }

    // Fallback: Convert file to Base64 Data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("Failed to read file as Data URL"));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
}
