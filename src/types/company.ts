export type CompanyType = {
  id: string,
  companyName: string,
  establishedOn: string,
  website: string,
  registrationNumber: string,
  address1: string,
  address2?: string,
  country: string,
  city: string,
  state: string,
  zipCode: string,
  primaryFirstName: string,
  primaryLastName: string,
  primaryEmail: string,
  primaryMobile: string
}