
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { User } from '@/types/types';

// Define the types for the props
interface UserListProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p>No users available</p>; // Handle empty users array
  }

  // Extract headers from the first user object keys
  // Ensure headers are of type keyof User
  const headers: (keyof User)[] = Object.keys(users[0]) as (keyof User)[];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={header}>{header.charAt(0).toUpperCase() + header.slice(1)}</TableCell>
            ))}
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              {headers.map(header => (
                <TableCell key={header}>{user[header]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onEdit(user.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;
