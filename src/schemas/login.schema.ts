// login.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email')
    .min(5, 'Email too short')
    .max(50, 'Email too long'),

  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password too short')
    .max(50, 'Password too long')
    .regex(/^[a-zA-Z0-9]*$/, 'Password must be alphanumeric'),
});