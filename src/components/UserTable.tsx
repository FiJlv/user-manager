import { useUsers } from '../hooks/useUsers';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Button, Box
} from '@mui/material';
import { useState } from 'react';
import { UserDialog } from './UserDialog';

export const UserTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [open, setOpen] = useState(false);

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Помилка при завантаженні користувачів</div>;

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Додати користувача
        </Button>
      </Box>

      <UserDialog open={open} onClose={() => setOpen(false)} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ПІБ</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Дата народження</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Посада</TableCell>
              <TableCell>Активний</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.birthDate}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.position}</TableCell>
                <TableCell>{user.isActive ? 'Так' : 'Ні'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
