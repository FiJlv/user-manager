import {
    Dialog, DialogContent, DialogActions, DialogTitle, Button
  } from '@mui/material';
  import { UserFormValues } from '../schemas/user.schema';
  import { UserForm } from '../forms/UserForm';
  import { useCreateUser} from '../hooks/useCreateUser';
  import { useUpdateUser} from '../hooks/useUpdateUser';
  import { User } from '../types/user.types';
  import { mapUserToFormValues } from '../utils/mapUser';
  
  interface Props {
    open: boolean;
    onClose: () => void;
    user?: User | null;
  }
   
  export const UserDialog = ({ open, onClose, user }: Props) => {

    const {
      mutateAsync: create,
      isPending: isCreating,
    } = useCreateUser(onClose);
    
    const {
      mutateAsync: update,
      isPending: isUpdating,
    } = useUpdateUser(onClose);

    const isPending = isCreating || isUpdating;

    const handleSubmit = async (data: UserFormValues) => {
      if (user) {
        await update({ id: user.id, ...data });
      } else {
        await create(data);
      }
    };
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        
          <DialogTitle>
            {user ? 'Редагувати користувача' : 'Додати користувача'}
          </DialogTitle>
      
        <DialogContent>
        <UserForm
          onSubmit={handleSubmit}
          initialValues={user ? mapUserToFormValues(user) : undefined}
        />
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
  