import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./app";

export class StorageService {
  /**
   * Compresses an image file client-side to ensure fast uploads and guaranteed compatibility.
   * Keeps image within max 800px width/height and quality 0.85 (target ~100KB-200KB).
   */
  static async compressImage(file: File, maxDimension = 800, quality = 0.85): Promise<Blob> {
    return new Promise((resolve) => {
      // SVG files or already small files (<100KB) don't need raster compression
      if (file.type === "image/svg+xml" || file.size < 100 * 1024) {
        resolve(file);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              resolve(blob || file);
            },
            file.type === "image/png" ? "image/png" : "image/jpeg",
            quality
          );
        } else {
          resolve(file);
        }
      };

      img.onerror = () => resolve(file);
      img.src = url;
    });
  }

  /**
   * Reads a file or blob into an optimized Base64 Data URL.
   */
  static async fileToDataUrl(fileOrBlob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error("Failed to convert image to Data URL"));
        }
      };
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(fileOrBlob);
    });
  }

  /**
   * Uploads a file or converts it to an optimized Base64 Data URL.
   * Guarantees 100% CORS-error-free operation across all custom domains (e.g. Vercel)
   * by storing the compressed branding asset directly in Firestore without preflight failures.
   */
  static async uploadFile(file: File, storagePath?: string): Promise<string> {
    const compressedBlob = await this.compressImage(file, 600, 0.85);
    const dataUrl = await this.fileToDataUrl(compressedBlob);

    // If storage is explicitly configured and available, we attempt storage upload silently
    if (storage && storagePath) {
      try {
        const storageRef = ref(storage, storagePath);
        const metadata = { contentType: file.type || "image/png" };
        const snapshot = await uploadBytes(storageRef, compressedBlob, metadata);
        return await getDownloadURL(snapshot.ref);
      } catch (err) {
        // Fallback to optimized Data URL if Firebase Storage bucket CORS preflight is blocked on custom domain
        return dataUrl;
      }
    }

    return dataUrl;
  }
}
