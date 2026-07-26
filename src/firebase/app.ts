import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig } from "./config";

let app: FirebaseApp;
let db: Firestore;
let storage: FirebaseStorage;
let auth: Auth;

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  // Initialize Firestore with specific databaseId as required by platform SDK instructions
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  storage = getStorage(app);
  auth = getAuth(app);
} catch (error) {
  console.warn("Firebase initialization failed or running in fallback mode:", error);
}

export { app, db, storage, auth };
