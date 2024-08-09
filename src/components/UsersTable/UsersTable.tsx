import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Define the type for the user object
interface User {
  id: number; // Ensure each user has a unique ID
  [key: string]: any; // Allow for dynamic keys
}

// Define the types for the props
interface UserListProps {
  users: User[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  if (users.length === 0) {
    return <p>No users available</p>; // Handle empty users array
  }

  // Extract headers from the first user object keys
  const headers = Object.keys(users[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              {headers.map(header => (
                <TableCell key={header}>{user[header.toLowerCase()]}</TableCell>
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
