"use client"; // Ensure this file is client-side

import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useUser } from "@/context/UserContext";
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side

type MainProps = {
  children?: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  const { user, logout, signup } = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true); // Ensures that the router is fully mounted
  }, []);

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
    <>
      <Navbar userName={user?.name} onLogout={logout} onSignUp={signup} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'lightgray' }}>
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Main;
