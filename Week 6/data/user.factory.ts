import { randomUUID } from 'node:crypto';

export interface Customer {
  firstName: string;
  lastName: string;
  birthDate: string;
  countryCode: string;
  postalCode: string;
  houseNumber: string;
  phone: string;
  email: string;
  password: string;
}

export function newCustomer(): Customer {
  const suffix = randomUUID().replace(/-/g, '').slice(0, 18);
  return {
    firstName: 'Automation',
    lastName: 'Student',
    birthDate: '1999-05-12',
    countryCode: 'US',
    postalCode: '10001',
    houseNumber: '42',
    phone: '12025550123',
    email: `qa-${suffix}@example.com`,
    password: 'Testing2026!Aa',
  };
}

export const existingCustomer = {
  email: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
};
