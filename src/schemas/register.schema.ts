import z from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(5, { message: 'Email must be at least 2 characters' })
    .max(15, { message: 'Email cannot be more than 15 characters' })
    .nonempty({ message: 'Email is required' }),
  name: z
    .string()
    .min(5, { message: 'Name must be at least 2 characters' })
    .max(15, { message: 'Name cannot be more than 15 characters' })
    .nonempty({ message: 'Name is required' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 2 characters' })
    .max(15, { message: 'Password cannot be more than 15 characters' })
    .nonempty({ message: 'Password is required' }),
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/, {
  //   message:
  //     'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character',
  // }),
})