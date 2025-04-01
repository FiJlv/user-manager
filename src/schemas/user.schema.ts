import { z } from 'zod';

export const userSchema = z.object({
  fullName: z.string().min(1, 'Обовʼязкове поле').max(100),
  email: z.string().email('Невалідна email адреса'),
  phone: z.string().min(10, 'Мінімум 10 символів'),
  birthDate: z.string().optional(),
  role: z.enum(['Адміністратор', 'Користувач']),
  position: z.string().max(255, 'Максимум 255 символів').optional(),
  isActive: z.boolean().default(true),
});

export type UserFormValues = z.infer<typeof userSchema>;
