'use client';

import { useEffect, useState } from 'react';
import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { firestore } from '@/utils/firebaseConfig';
import { Navbar } from '@kaushik-aditya/projectpackages';

export default function Home() {
  const [user,setUser] = useState<DocumentData[] | null>();
  useEffect(() => {
    const fetchUser = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'User'));
      const fetchedData = querySnapshot.docs.map(doc => doc.data());
      setUser(fetchedData);
    };

    fetchUser();
  }, []);
  
  return (
    <Navbar userName="aditya"/>
  );
}
