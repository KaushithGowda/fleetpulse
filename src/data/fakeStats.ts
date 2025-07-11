import { DriverType } from '@/src/types/driver';
import { faker } from '@faker-js/faker';

export const fakeDrivers: DriverType[] = Array.from({ length: 50 }).map((_, index) => ({
  id: (index + 1).toString(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  mobile: faker.phone.number(),
  dob: faker.date.birthdate({ min: 1950, max: 2005, mode: 'year' }).toISOString().split('T')[0],
  licenseNumber: faker.string.alphanumeric(10).toUpperCase(),
  experience: faker.number.int({ min: 1, max: 30 }),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: faker.location.country(),
  city: faker.location.city(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
}));

export const fakeStats = {
  totalCompanies: 5,
  totalDrivers: 8,
  companies: {
    week: [10, 15, 12, 20, 18, 14, 17], // 7 days
    month: [20, 30, 25, 40], // 4 weeks in the current month
    year: [80, 120, 60, 150, 90, 110, 95, 130, 85, 160, 140, 170], // Jan to Dec
  },
  drivers: {
    week: [8, 10, 9, 12, 11, 7, 10], // 7 days
    month: [15, 22, 18, 27], // 4 weeks in the current month
    year: [60, 90, 80, 100, 70, 95, 85, 110, 75, 120, 105, 130], // Jan to Dec
  },
};

export const fakeCompanies = Array.from({ length: 50 }).map((_, index) => ({
  id: (index + 1).toString(),
  name: faker.company.name(),
  establishedOn: faker.date.past({ years: 20 }).toISOString().split('T')[0],
  registrationNumber: `REG${(index + 1).toString().padStart(3, '0')}`,
  website: faker.internet.url(),
  address1: faker.location.streetAddress(),
  address2: faker.location.secondaryAddress(),
  country: faker.location.country(),
  city: faker.location.city(),
  state: faker.location.state(),
  zipCode: faker.location.zipCode(),
  contactFirstName: faker.person.firstName(),
  contactLastName: faker.person.lastName(),
  contactEmail: faker.internet.email(),
  contactMobile: faker.phone.number()
}));