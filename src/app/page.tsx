'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { Main } from '@/components';

export default function Home() {
 
  return (
    <Main />      
  );
}
