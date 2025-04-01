import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
  } from '@mui/material';
  
  interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
  }
  
  export const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = 'Підтвердження',
    message = 'Ви впевнені, що хочете видалити?',
  }: Props) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Скасувати
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  