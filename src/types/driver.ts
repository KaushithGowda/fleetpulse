export type DriverType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  licenseNumber: string;
  licenseStartDate: number;
  address1: string;
  address2?: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
}