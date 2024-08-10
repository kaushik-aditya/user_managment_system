import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@kaushik-aditya/projectpackages';
import { useUser } from '@/context/UserContext';

// Define the types for the props
interface NavbarProps {
  userName?: string;
  onSignUp?: () => void;
  onLogout?: () => void;
  isSignup?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({userName='Guest', onSignUp, onLogout, isSignup=false}) => {
  const loggedIn = userName && userName !== 'Guest';
  const { setIsAddModalOpen, setIsUsersList } = useUser();

  // Function to open the add user modal
  const handleAddUser = () => {
    setIsAddModalOpen(true);
  };

  // Function to display users list
  const handleDisplayUsers = () => {
    setIsUsersList(true);
  };

  return (
    <AppBar position="static">
    <Toolbar sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome {userName}
        </Typography>
        {loggedIn && (
          <Button color="primary" variant="contained" size='medium' text='Add User' borderRadius='10px' onClick={handleAddUser} />            
        )}
        {loggedIn && (
          <Button color="primary" variant="contained" size='medium' text='Display Users' borderRadius='10px' onClick={handleDisplayUsers} />            
        )}
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
