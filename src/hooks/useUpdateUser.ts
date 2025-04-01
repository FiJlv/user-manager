import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../api/users';

export const useUpdateUser = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess?.();
    },
  });
};
