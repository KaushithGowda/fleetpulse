import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { DataTable } from 'react-native-paper';

const fakeCompanies = [
  { id: 1, name: 'Alpha Corp', city: 'New York', contact: 'alpha@example.com' },
  { id: 2, name: 'Beta Ltd', city: 'Los Angeles', contact: 'beta@example.com' },
  { id: 3, name: 'Gamma LLC', city: 'Chicago', contact: 'gamma@example.com' },
  { id: 4, name: 'Delta Inc', city: 'Houston', contact: 'delta@example.com' },
  { id: 5, name: 'Epsilon Group', city: 'Phoenix', contact: 'epsilon@example.com' },
  { id: 6, name: 'Zeta Works', city: 'Seattle', contact: 'zeta@example.com' },
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
          <DataTable.Title>Contact</DataTable.Title>
        </DataTable.Header>

        {filteredCompanies.slice(from, to).map(company => (
          <DataTable.Row key={company.id}>
            <DataTable.Cell>{company.name}</DataTable.Cell>
            <DataTable.Cell>{company.city}</DataTable.Cell>
            <DataTable.Cell>{company.contact}</DataTable.Cell>
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
