import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@kaushik-aditya/projectpackages';

// Define the types for the props
interface NavbarProps {
  userName?: string;
  onSignUp?: () => void;
  onLogout?: () => void;
  isSignup?: boolean;  
}

const Navbar: React.FC<NavbarProps> = ({userName='Guest', onSignUp, onLogout, isSignup=false }) => {
  const loggedIn = userName && userName!=='Guest';
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome {userName}
        </Typography>
        {!loggedIn && !isSignup && (
          <Button color="secondary" variant="contained" size='medium' text='Sign Up' borderRadius='10px' onClick={onSignUp} />            
        )}
        {loggedIn && (
          <Button color="secondary" variant="contained" size='medium' text='Logout' borderRadius='10px' onClick={onLogout} />            
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
