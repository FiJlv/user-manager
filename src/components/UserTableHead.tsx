import { TableCell, TableRow, TableSortLabel } from '@mui/material';
import { User } from '../types/user.types';
import { userTableColumns } from '../constants/tableColumns';

interface Props {
  sortBy: keyof User;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof User) => void;
}

export const UserTableHead = ({ sortBy, sortDirection, onSort }: Props) => (
  <TableRow>
    {userTableColumns.map((col) => (
      <TableCell key={col.id} sortDirection={sortBy === col.id ? sortDirection : false}>
        <TableSortLabel
          active={sortBy === col.id}
          direction={sortDirection}
          onClick={() => onSort(col.id as keyof User)}
        >
          {col.label}
        </TableSortLabel>
      </TableCell>
    ))}
    <TableCell>Дії</TableCell>
  </TableRow>
);
