export type UserRole = 'Адміністратор' | 'Користувач';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  birthDate?: string;
  role: UserRole;
  position?: string;
  isActive: boolean;
}
