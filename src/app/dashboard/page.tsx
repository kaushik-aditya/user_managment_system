'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@/context/UserContext'; // Assuming you have this hook
import { Main, Modal, UsersTable } from '@/components';
import { firestore } from '@/utils/firebaseConfig';
import { User } from '@/types/types';

const UserPage: React.FC = () => {
  const { user } = useUser(); // Get the logged-in user's info
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let q;
        if (user?.role === 'hr') {
          // Fetch all users if the role is HR
          q = query(collection(firestore, 'users'));
        } else {
          // Fetch only the users with 'user' role for non-HR roles
          q = query(collection(firestore, 'users'), where('role', '==', 'user'));
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
    
  };

  const handleDelete = async (id: string) => {
    try {
      // Assuming you have a function to delete the user from Firestore
      // await deleteDoc(doc(firestore, 'users', id));
      console.log('Delete user with ID:', id);
      // Remove the user from local state
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Main>
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open = {open} onClose={onClose} >

      </Modal>
    </Main>
  );
};

export default UserPage;
