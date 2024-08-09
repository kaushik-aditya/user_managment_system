"use client"; // Ensure this file is client-side

import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';
import { User } from '@/types/types';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  signup: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'User'));
        const fetchedData = querySnapshot.docs.map(doc => doc.data())[0] as User;
        setUser(fetchedData || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  const signup = () => {
    setUser(null);
    router.push('/signup');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, signup }}>
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
