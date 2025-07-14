import { z } from 'zod';

export const companySchema: any = z.object({
  id: z.
    string()
    .optional(),

  companyName: z
    .string()
    .min(2, 'Company name is required')
    .max(40, 'Too long'),

  establishedOn: z
    .date({ required_error: 'Established date is required' })
    .transform((val: { toISOString: () => any; }) => val.toISOString()),

  website: z
    .string()
    .url('Invalid website URL')
    .max(50, 'Too long')
    .default('https://'),

  registrationNumber: z
    .string()
    .min(2, 'Registration number is required')
    .max(20, 'Too long'),

  address1: z
    .string()
    .min(2, 'Address1 is required')
    .max(50, 'Too long'),

  address2: z
    .string()
    .optional(),

  country: z
    .string()
    .min(2, 'Country is required')
    .max(20, 'Too long'),

  city: z
    .string()
    .min(2, 'City is required')
    .max(20, 'Too long'),

  state: z
    .string()
    .min(2, 'State is required')
    .max(20, 'Too long'),

  zipCode: z
    .string()
    .min(1, 'Zip Code is required')
    .max(7, 'Too long'),

  primaryFirstName: z
    .string()
    .min(2, 'First name is required')
    .max(20, 'Too long'),

  primaryLastName: z
    .string()
    .min(2, 'Last name is required')
    .max(20, 'Too long'),

  primaryEmail: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email')
    .min(5, 'Email too short')
    .max(50, 'Email too long'),

  primaryMobile: z
    .string()
    .nonempty('Mobile number is required')
    .min(10, 'Invalid mobile number')
    .max(10, 'Invalid mobile number')
    .regex(/^\d{10}$/, 'Invalid mobile number'),
});