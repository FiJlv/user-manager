import { z } from 'zod';

export const userSchema = z.object({
  fullName: z.string().min(1, 'Обовʼязкове поле').max(100),
  email: z.string().email('Невалідна email адреса'),
  phone: z.string().min(10, 'Мінімум 10 символів').regex(/^\+?\d{10,15}$/, 'Некоректний номер телефону'),
  birthDate: z.string().optional(),
  role: z.string().min(1, 'Роль обовʼязкова'),
  position: z.string().max(255, 'Максимум 255 символів').optional(),
  isActive: z.boolean().default(true),
});

export type UserFormValues = z.infer<typeof userSchema>;
