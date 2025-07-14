const { z } = require("zod");

export const driverSchema = z.object({
  id: z.
    string()
    .optional(),

  firstName: z
    .string()
    .min(2, 'First name is required')
    .max(20, 'Too long'),

  lastName: z
    .string()
    .min(2, 'Last name is required')
    .max(20, 'Too long'),

  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email')
    .min(5, 'Email too short')
    .max(50, 'Email too long'),

  mobile: z
    .string()
    .nonempty('Phone number is required')
    .min(10, 'Phone number must 10 charactes')
    .max(10, 'Phone number must 10 charactes')
    .regex(/^\d{10}$/, 'Invalid mobile number'),

  dateOfBirth: z
    .date({ required_error: 'Date of birth is required' })
    .transform((val: { toISOString: () => any; }) => val.toISOString()),

  licenseNumber: z
    .string()
    .min(2, 'License Number is required')
    .max(20, 'Too long'),

  licenseStartDate: z.date({ required_error: 'License Issue Date is required' })
    .transform((val: { toISOString: () => any; }) => val.toISOString()),

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
});