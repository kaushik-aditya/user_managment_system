"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/utils/firebaseConfig';
import { User } from '@/types/types';
import { useRouter } from 'next/navigation';

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const docRef = doc(firestore, "User", authUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data() as User); // Make sure to cast data to User type if needed
          console.log(docSnap.data());
        } else {
          console.log("No user data found");
          setUser(null); // Handle case where user exists but no data is found
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      router.push('/login');
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
