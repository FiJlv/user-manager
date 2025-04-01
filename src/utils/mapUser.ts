import { User } from '../types/user.types';
import { UserFormValues } from '../schemas/user.schema';

export const mapUserToFormValues = (user: User): UserFormValues => ({
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  birthDate: user.birthDate ?? '',
  role: user.role,
  position: user.position ?? '',
  isActive: user.isActive,
});
