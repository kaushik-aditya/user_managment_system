'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc, addDoc } from 'firebase/firestore';
import { useUser } from '@/context/UserContext';
import { Main } from '@/components';
import { Typography } from '@mui/material';

import { firestore } from '@/utils/firebaseConfig';
import { User } from '@/types/types';
import { Modal, UserForm, UsersTable } from '@kaushik-aditya/projectpackages';

const UserPage: React.FC = () => {
  const { user ,isUsersList , isAddModalOpen, setIsAddModalOpen} = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [newUser, setNewUser] = useState({
    Role: 'USER',
    Name: '',
    Email: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let q;
        if (user?.role === 'hr') {
          // Fetch all users if the role is HR
          q = query(collection(firestore, 'User'));
        } else {
          // Fetch only the users with 'user' role for non-HR roles
          q = query(collection(firestore, 'User'), where('role', '==', 'user'));
        }

        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleEdit = (id: string) => {
    const userToEdit = users.find(user => user.id === id) || null;
    setSelectedUser(userToEdit);
    setEditModalOpen(true);
  };

 

  const handleAddUser = async () => {
    try {
      if (newUser) {
        const docRef = await addDoc(collection(firestore, 'User'), {
          email: newUser.Email,
          role: newUser.Role,
          name: newUser.Name,
        });
  
        // After successfully adding the user, update the users state
        setUsers(prevUsers => [
          ...prevUsers,
          {
            id: docRef.id, // Use the newly generated ID from Firestore
            email: newUser.Email,
            role: newUser.Role,
            name: newUser.Name,
          } as User
        ]);
  
        handleCloseAddModal();
        alert('User Registered Successfully!');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'User', id));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      try {
        const userRef = doc(firestore, 'User', selectedUser.id);
        await updateDoc(userRef, selectedUser as any);
        setUsers(prevUsers => prevUsers.map(user => user.id === selectedUser.id ? selectedUser : user));
        handleCloseEditModal();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setNewUser({
      Role: '',
      Name: '',
      Email: ''
    });
  };

  return (
    <Main>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        {!isUsersList && (<div style={{ 
          display: 'flex', 
          flexDirection: 'column', // Stack text vertically
          alignItems: 'center',    // Center items horizontally
          justifyContent: 'center', // Center items vertically
          textAlign: 'center'       // Center text alignment
        }}>
          <Typography 
            variant="h4" // Larger text
            sx={{ 
              marginBottom: '10px', // Space between texts
              fontWeight: 'bold'     // Optional: Make text bold
            }}
          >
            Welcome to Your Portal!
          </Typography>
          <Typography 
            variant="h6" // Smaller text
            sx={{ 
              fontWeight: 'normal' // Optional: Default font weight
            }}
          >
            You're in the right place. Explore services with ease!
          </Typography>
        </div>)}
        
        {isUsersList && (<UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />)}
        <Modal open={editModalOpen} onClose={handleCloseEditModal}>
          <UserForm
            object={selectedUser || {}}
            setObject={setSelectedUser as any}
            buttonText="Update"
            onSubmit={handleUpdate}
            fullWidth
          />
        </Modal>
        <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
          <UserForm
            object={newUser || {}}
            setObject={setNewUser as any}
            buttonText="Add User"
            onSubmit={handleAddUser}
            fullWidth
          />
        </Modal>
      </div>
    </Main>
  );
};

export default UserPage;
