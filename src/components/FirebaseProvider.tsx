import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { UserProfile } from '../types';

interface FirebaseContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

export const useFirebase = () => useContext(FirebaseContext);

export default function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    console.log("Session UID:", user.uid);
    setLoading(true);
    let adminReady = false;
    let profileReady = false;

    const checkReady = () => {
      if (adminReady && profileReady) {
        setLoading(false);
      }
    };

    // Real-time admin check
    const unsubAdmin = onSnapshot(doc(db, 'admins', user.uid), (snap) => {
      const isDbAdmin = snap.exists();
      const isEmailAdmin = user.email === 'mihiratodariya6@gmail.com';
      setIsAdmin(isDbAdmin || isEmailAdmin);
      
      if (isDbAdmin || isEmailAdmin) {
        console.log("Admin access granted!");
      }
      
      adminReady = true;
      checkReady();
    }, (err) => {
      console.error("Admin listener error:", err);
      // Fallback for primary user
      if (user.email === 'mihiratodariya6@gmail.com') {
        setIsAdmin(true);
      }
      adminReady = true;
      checkReady();
    });

    // Profile sync
    const syncProfile = async () => {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfile(userDoc.data() as UserProfile);
        } else {
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'User',
            photoURL: user.photoURL || undefined,
            role: 'user',
            bookmarks: [],
          };
          await setDoc(userDocRef, newProfile);
          setProfile(newProfile);
        }
      } catch (error) {
        console.error("Profile sync error:", error);
      } finally {
        profileReady = true;
        checkReady();
      }
    };

    syncProfile();

    return () => unsubAdmin();
  }, [user]);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, profile, loading, isAdmin, loginWithGoogle, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
}
