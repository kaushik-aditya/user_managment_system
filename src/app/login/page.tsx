'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { UserForm } from '@kaushik-aditya/projectpackages';
import { Main } from '@/components';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
  });

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, credentials.Email, credentials.Password);
      alert('Logged in successfully');
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
