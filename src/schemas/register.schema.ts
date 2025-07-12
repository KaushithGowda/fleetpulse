import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .min(2, 'Name is too short')
    .max(50, 'Name too long'),

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