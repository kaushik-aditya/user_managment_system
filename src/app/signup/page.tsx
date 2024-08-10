'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/utils/firebaseConfig';
import { Main, UserForm } from '@/components';
import { doc, setDoc } from 'firebase/firestore';

const Signup: React.FC = () => {
  const [credentials, setCredentials] = useState({
    Role: '',
    Name: '',
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.Email,
        credentials.Password
      );
      const user = userCredential.user;

      if (user) {
        await setDoc(doc(firestore, 'User', user.uid), {
          email: user.email,
          role: credentials.Role,
          name: credentials.Name,
        });
      }

      alert('User Registered Successfully!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Main isSignup>
      <UserForm
        object={credentials}
        setObject={setCredentials}
        buttonText="Sign Up"
        onSubmit={handleSignup}
        linkText="login"
      />
    </Main>
  );
};

export default Signup;
