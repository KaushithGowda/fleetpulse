import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email')
    .min(5, 'Email too short')
    .max(20, 'Email too long'),

  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password too short')
    .max(15, 'Password too long')
    .regex(/^[a-zA-Z0-9]*$/, 'Password must be alphanumeric'),
});