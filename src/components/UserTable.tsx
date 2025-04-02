import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user.types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Button, Box, TableSortLabel
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

  const [sortBy, setSortBy] = useState<keyof User>('fullName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSort = (field: keyof User) => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...(users ?? [])].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
      return sortDirection === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    return 0;
  });
  

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
            <TableCell sortDirection={sortBy === 'fullName' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'fullName'}
                  direction={sortDirection}
                  onClick={() => handleSort('fullName')}
                >
                  ПІБ
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'email' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortDirection}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'birthDate' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'birthDate'}
                  direction={sortDirection}
                  onClick={() => handleSort('birthDate')}
                >
                  Дата народження
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'phone' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'phone'}
                  direction={sortDirection}
                  onClick={() => handleSort('phone')}
                >
                  Телефон
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'role' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'role'}
                  direction={sortDirection}
                  onClick={() => handleSort('role')}
                >
                  Роль
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'position' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'position'}
                  direction={sortDirection}
                  onClick={() => handleSort('position')}
                >
                  Посада
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortBy === 'isActive' ? sortDirection : false}>
                <TableSortLabel
                  active={sortBy === 'isActive'}
                  direction={sortDirection}
                  onClick={() => handleSort('isActive')}
                >
                  Активний
                </TableSortLabel>
              </TableCell>
              <TableCell>Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers?.map((user) => (
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