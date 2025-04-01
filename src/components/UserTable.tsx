import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user.types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Button, Box
} from '@mui/material';
import { useState } from 'react';
import { UserDialog } from './UserDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { useDeleteUser } from '../hooks/useDeleteUser';


export const UserTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { mutate: deleteUser } = useDeleteUser(() => setUserToDelete(null));

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Помилка при завантаженні користувачів</div>;

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Додати користувача
        </Button>
      </Box>

      <UserDialog open={open} onClose={handleClose} user={editingUser} />

      <ConfirmDialog
        open={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => userToDelete && deleteUser(userToDelete.id)}
        title="Видалити користувача"
        message={`Ви впевнені, що хочете видалити ${userToDelete?.fullName}?`}
      />

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
              <TableCell>Дії</TableCell>
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
                <TableCell>
                  <Button size="small" onClick={() => handleEdit(user)}>
                    Редагувати
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setUserToDelete(user)}
                  >
                    Видалити
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
