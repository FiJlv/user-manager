import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button
  } from '@mui/material';
  import { UserFormValues } from '../schemas/user.schema';
  import { UserForm } from '../forms/UserForm';
  import { useCreateUser } from '../hooks/useCreateUser';
  
  interface Props {
    open: boolean;
    onClose: () => void;
  }
  
  export const UserDialog = ({ open, onClose }: Props) => {
    const { mutateAsync, isPending } = useCreateUser(onClose);
  
    const handleSubmit = async (data: UserFormValues) => {
      await mutateAsync(data);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Новий користувач</DialogTitle>
        <DialogContent>
          <UserForm onSubmit={handleSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Скасувати
          </Button>
          <Button
            type="submit"
            form="user-form"
            color="primary"
            variant="contained"
            disabled={isPending}
          >
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  