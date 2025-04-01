import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';

export const useDeleteUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess?.();
    },
  });
};
