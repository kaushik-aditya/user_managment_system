"use client"; // Ensure this file is client-side

import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "../Navbar";
import { useUser } from "@/context/UserContext";
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side
import { Footer } from "@kaushik-aditya/projectpackages";

type MainProps = {
  children?: React.ReactNode;
  isSignup?: boolean;
};

const Main: React.FC<MainProps> = ({ children,isSignup=false }) => {
  const { user, logout} = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Ensures that the router is fully mounted
  }, []);

  const signUp = ()=>{
    router.push('/signup');
  }

  if (!isMounted) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{
        bgcolor: 'lightgray',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh' // Ensure the main content takes up at least the full viewport height
      }}>
      <Navbar userName={user?.name} onLogout={logout} isSignup={isSignup} onSignUp={signUp} />
      <Box
        component="main"
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <Footer name="USM"/>
    </Box>
  );
};

export default Main;
