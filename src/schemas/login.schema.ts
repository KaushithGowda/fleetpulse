import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email must be at least 2 characters' })
    .max(15, { message: 'Email cannot be more than 15 characters' })
    .nonempty(),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 2 characters' })
    .max(15, { message: 'Password cannot be more than 15 characters' })
    .nonempty(),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
  //   message:
  //     'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
  // }),
});
