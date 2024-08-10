'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { Main, UserForm } from '@/components';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const Login: React.FC = () => {
  const {setUser} = useUser();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
  });

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, credentials.Email, credentials.Password);      
      alert('Logged in successfully');
      router.push('/dashboard');
    } catch (error: any) {
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <Main>
      <UserForm
      object={credentials}
      setObject={setCredentials}
      buttonText="Login"
      onSubmit={handleLogin}
      />
    </Main>
    
  );
};

export default Login;
