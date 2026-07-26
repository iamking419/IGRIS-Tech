import { doc, getDoc, setDoc, onSnapshot, DocumentData } from "firebase/firestore";
import { db, auth } from "./app";

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export class FirestoreService {
  static async getDocument<T = DocumentData>(path: string): Promise<T | null> {
    if (!db) return null;
    try {
      const docRef = doc(db, path);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as T;
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, path);
    }
  }

  static async setDocument<T extends Record<string, any>>(path: string, data: T, merge = true): Promise<void> {
    if (!db) return;
    try {
      const docRef = doc(db, path);
      await setDoc(docRef, data, { merge });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }

  static subscribeToDocument<T = DocumentData>(
    path: string, 
    onNext: (data: T | null) => void,
    onError?: (error: Error) => void
  ): () => void {
    if (!db) {
      onNext(null);
      return () => {};
    }
    const docRef = doc(db, path);
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          onNext(snapshot.data() as T);
        } else {
          onNext(null);
        }
      },
      (error) => {
        console.warn(`Firestore subscription notice for ${path}:`, error);
        if (onError) onError(error);
      }
    );
  }
}
