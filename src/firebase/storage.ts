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
   * Uploads a file to Firebase Storage and returns the public download URL.
   * If Firebase Storage is blocked by CORS or fails, gracefully falls back to an optimized Data URL.
   */
  static async uploadFile(file: File, storagePath: string): Promise<string> {
    const compressedBlob = await this.compressImage(file);

    if (storage) {
      try {
        const storageRef = ref(storage, storagePath);
        const metadata = { contentType: file.type || "image/png" };
        const snapshot = await uploadBytes(storageRef, compressedBlob, metadata);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
      } catch (err: any) {
        console.warn(
          "Firebase Storage upload warning (likely CORS preflight or network restriction):",
          err
        );
        console.info(
          "To enable direct Firebase Storage uploads on custom domains, set CORS on the bucket: gsutil cors set cors.json gs://celtic-paratext-8w1xt.firebasestorage.app"
        );
      }
    }

    // Fallback: Convert compressed blob to Base64 Data URL (fits safely in Firestore document <1MB)
    return await this.fileToDataUrl(compressedBlob);
  }
}
