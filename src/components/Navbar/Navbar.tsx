import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Button } from '@kaushik-aditya/projectpackages';
import { useUser } from '@/context/UserContext';
import { firestore } from '../../utils/firebaseConfig'; // Adjust import as per your project structure
import { collection, getDocs, query, where } from 'firebase/firestore';

// Define the types for the props
interface NavbarProps {
  userName?: string;
  onSignUp?: () => void;
  onLogout?: () => void;
  isSignup?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ userName = 'Guest', onSignUp, onLogout, isSignup = false }) => {
  const [hasRequiredService, setHasRequiredService] = useState<boolean>(false);
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

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const tenantsCollection = collection(firestore, 'Tenants');
      
        const querySnapshot = await getDocs(tenantsCollection);
        
        let found = false;

        querySnapshot.forEach((doc) => {
          const tenantData = doc.data();
          console.log(tenantData)
          // Check if the tenant's Name is 'Daorion'
          if (tenantData.Name === 'daorion' || tenantData.Name === 'GResourcing') {
            console.log('a')
            const servicesActivated = tenantData?.ServicesActivated || {};
            found = Object.values(servicesActivated).includes('Role Management');
            console.log(found)
          }
        });
        
        setHasRequiredService(found);
      } catch (error) {
        console.error('Error fetching tenant data:', error);
      }
    };

    fetchTenantData();
  }, []);
  console.log(hasRequiredService)
  console.log(loggedIn)
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcome {userName}
        </Typography>
        {loggedIn && hasRequiredService && (
          <Button color="primary" variant="contained" size='medium' text='Add User' borderRadius='10px' onClick={handleAddUser} />            
        )}
        {loggedIn && hasRequiredService && (
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
