import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';

const fakeCompanies = [
  {
    id: 1,
    name: 'Alpha Corp',
    establishedOn: '2010-01-01',
    registrationNumber: 'REG001',
    website: 'https://alpha.com',
    address1: '123 Alpha St',
    address2: 'Suite 100',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    contactFirstName: 'John',
    contactLastName: 'Doe',
    contactEmail: 'john.doe@alpha.com',
    contactMobile: '1234567890'
  },
  {
    id: 2,
    name: 'Beta Ltd',
    establishedOn: '2012-05-15',
    registrationNumber: 'REG002',
    website: 'https://beta.com',
    address1: '456 Beta Ave',
    address2: '',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    contactFirstName: 'Jane',
    contactLastName: 'Smith',
    contactEmail: 'jane.smith@beta.com',
    contactMobile: '2345678901'
  },
  {
    id: 3,
    name: 'Gamma LLC',
    establishedOn: '2015-09-30',
    registrationNumber: 'REG003',
    website: 'https://gamma.com',
    address1: '789 Gamma Blvd',
    address2: 'Floor 3',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    contactFirstName: 'Alice',
    contactLastName: 'Johnson',
    contactEmail: 'alice.johnson@gamma.com',
    contactMobile: '3456789012'
  },
  {
    id: 4,
    name: 'Delta Inc',
    establishedOn: '2008-07-20',
    registrationNumber: 'REG004',
    website: 'https://delta.com',
    address1: '321 Delta Rd',
    address2: '',
    city: 'Houston',
    state: 'TX',
    zipCode: '77001',
    contactFirstName: 'Bob',
    contactLastName: 'Brown',
    contactEmail: 'bob.brown@delta.com',
    contactMobile: '4567890123'
  },
  {
    id: 5,
    name: 'Epsilon Group',
    establishedOn: '2011-11-11',
    registrationNumber: 'REG005',
    website: 'https://epsilon.com',
    address1: '654 Epsilon St',
    address2: 'Apt 10',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    contactFirstName: 'Carol',
    contactLastName: 'Davis',
    contactEmail: 'carol.davis@epsilon.com',
    contactMobile: '5678901234'
  },
  {
    id: 6,
    name: 'Zeta Works',
    establishedOn: '2013-03-03',
    registrationNumber: 'REG006',
    website: 'https://zeta.com',
    address1: '987 Zeta Ln',
    address2: '',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    contactFirstName: 'David',
    contactLastName: 'Wilson',
    contactEmail: 'david.wilson@zeta.com',
    contactMobile: '6789012345'
  },
];

const CompanyList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  const filteredCompanies = useMemo(() => {
    return fakeCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredCompanies.length);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  useEffect(() => {
    setPage(0); // Reset to page 0 when search changes
  }, [searchQuery]);

  return (
    <View className="flex-1 p-4 bg-white dark:bg-black">
      <TextInput
        className="mb-4 p-2 border rounded text-black dark:text-white dark:border-gray-600"
        placeholder="Search companies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>City</DataTable.Title>
          <DataTable.Title>State</DataTable.Title>
        </DataTable.Header>

        {filteredCompanies.slice(from, to).map(company => (
          <DataTable.Row key={company.id}>
            <DataTable.Cell>{company.name}</DataTable.Cell>
            <DataTable.Cell>{company.city}</DataTable.Cell>
            <DataTable.Cell>{company.state}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={totalPages}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${filteredCompanies.length}`}
          showFastPaginationControls
        />
      </DataTable>
    </View>
  );
};

export default CompanyList;
