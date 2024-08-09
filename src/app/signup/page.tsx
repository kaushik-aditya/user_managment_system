'use client';
'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { UserForm } from '@kaushik-aditya/projectpackages';

const Signup: React.FC = () => {
  const [credentials, setCredentials] = useState({
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const handleSignup = async () => {
    if (credentials.Password !== credentials.ConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, credentials.Email, credentials.Password);
      alert('Signup successful');
    } catch (error: any) {
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <UserForm
      object={credentials}
      setObject={setCredentials}
      buttonText="Sign Up"
      onSubmit={handleSignup}
    />
  );
};

export default Signup;
