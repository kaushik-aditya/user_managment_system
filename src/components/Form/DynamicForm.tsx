'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useUser } from '@/context/UserContext';
import { Main, Modal, UsersTable, UserForm } from '@/components';
import { firestore } from '@/utils/firebaseConfig';
import { User } from '@/types/types';

const UserPage: React.FC = () => {
  const { user } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let q;
        if (user?.role === 'hr') {
          q = query(collection(firestore, 'users'));
        } else {
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
    const userToEdit = users.find(user => user.id === id) || null;
    setSelectedUser(userToEdit);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(firestore, 'users', id));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = async () => {
    if (selectedUser) {
      try {
        const userRef = doc(firestore, 'users', selectedUser.id);
        await updateDoc(userRef, selectedUser);
        setUsers(prevUsers => prevUsers.map(user => user.id === selectedUser.id ? selectedUser : user));
        handleCloseModal();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Main>
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <UserForm
          object={selectedUser || {}}
          setObject={setSelectedUser}
          buttonText="Update"
          onSubmit={handleUpdate}
        />
      </Modal>
    </Main>
  );
};

export default UserPage;
