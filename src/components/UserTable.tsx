import { useUsers } from '../hooks/useUsers';
import { User } from '../types/user.types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Button, Box, TablePagination, Typography, Container, Grid
} from '@mui/material';
import { useState, useMemo, useCallback } from 'react';
import { UserDialog } from './UserDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { UserTableHead } from './UserTableHead';

export const UserTable = () => {
  const { data: users, isLoading, isError } = useUsers();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const { mutate: deleteUser } = useDeleteUser(() => setUserToDelete(null));

  const [sortBy, setSortBy] = useState<keyof User>('fullName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setOpen(true);
  }, []);
  

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

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteName(user.fullName);
  };

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((a, b) => {
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
  }, [users, sortBy, sortDirection]);

  const paginatedUsers = useMemo(
    () => sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedUsers, page, rowsPerPage]
  );

  return (
    <>
    
      {open && (
        <UserDialog open={open} onClose={handleClose} user={editingUser} />
      )}

      <ConfirmDialog
        open={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => userToDelete && deleteUser(userToDelete.id)}
        title="Видалити користувача"
        message={`Ви впевнені, що хочете видалити ${deleteName}?`}
      />

      <Container maxWidth={false}>
        <Box sx={{  width: "100%", display: "table", tableLayout: "fixed" }}>
          <Paper sx={{ width: '100%', minHeight: 300, mb: 2, mt: 2 }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', pt: 15 }}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Typography color="error" align="center" pt={15}>
                Помилка при завантаженні користувачів
              </Typography>
            ) : (
              <>
                <Grid container spacing={2} alignItems="center" sx={{ p: 2 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h6" fontWeight={600}>
                      Користувачі
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} textAlign={{ xs: 'left', sm: 'right' }}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)} fullWidth={true}
                      sx={{ width: { xs: '100%', sm: 'auto' },}}>
                      Додати користувача
                      
                    </Button>
                  </Grid>
                </Grid>

                <TableContainer>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                      <UserTableHead
                        sortBy={sortBy}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    </TableHead>
                        <TableBody>
                        {paginatedUsers?.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.birthDate}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.position}</TableCell>
                            <TableCell>{user.isActive ? 'Так' : 'Ні'}</TableCell>
                            <TableCell>
                              <Button 
                                size="small" 
                                onClick={() => handleEdit(user)}>
                                Редагувати
                              </Button>
                              <Button
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(user)}>
                                Видалити
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                  component="div"
                  count={sortedUsers.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </>
            )}
          </Paper>
        </Box>
      </Container>

    </>
  );
};
