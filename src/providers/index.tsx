import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const ITEMS_PER_PAGE_LIST = [5, 10, 15];

const fakeCompanies = [
  {
    key: 1,
    name: 'TechCorp',
    registrationNumber: '123456789',
    website: 'https://techcorp.com',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
  },
  {
    key: 2,
    name: 'MotoSoft',
    registrationNumber: '987654321',
    website: 'https://motosoft.com',
    city: 'Austin',
    state: 'TX',
    zip: '73301',
  },
  {
    key: 3,
    name: 'RideX',
    registrationNumber: '456789123',
    website: 'https://ridex.com',
    city: 'New York',
    state: 'NY',
    zip: '10001',
  },
  // Add more mock items as needed
];

const CompanyTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [sortColumn, setSortColumn] = useState<'name' | 'city'>('name');
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE_LIST[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const filteredItems = useMemo(() => {
    return fakeCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const aVal = a[sortColumn].toLowerCase();
      const bVal = b[sortColumn].toLowerCase();
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [filteredItems, sortAsc, sortColumn]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sortedItems.length);

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by company name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title
              sortDirection={
                sortColumn === 'city'
                  ? sortAsc
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
              onPress={() => {
                if (sortColumn === 'city') {
                  setSortAsc(!sortAsc);
                } else {
                  setSortColumn('city');
                  setSortAsc(true);
                }
              }}
            >
              City
            </DataTable.Title>
            <DataTable.Title>State</DataTable.Title>
            <DataTable.Title>Zip</DataTable.Title>
            <DataTable.Title
              sortDirection={
                sortColumn === 'name'
                  ? sortAsc
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
              onPress={() => {
                if (sortColumn === 'name') {
                  setSortAsc(!sortAsc);
                } else {
                  setSortColumn('name');
                  setSortAsc(true);
                }
              }}
            >
              Name
            </DataTable.Title>
            <DataTable.Title>Registration #</DataTable.Title>
            <DataTable.Title>Website</DataTable.Title>
          </DataTable.Header>

          {sortedItems.slice(from, to).map(item => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.city}</DataTable.Cell>
              <DataTable.Cell>{item.state}</DataTable.Cell>
              <DataTable.Cell>{item.zip}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.registrationNumber}</DataTable.Cell>
              <DataTable.Cell>
                <Text numberOfLines={1} ellipsizeMode="tail">{item.website}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
            onPageChange={newPage => setPage(newPage)}
            label={`${from + 1}-${to} of ${sortedItems.length}`}
            numberOfItemsPerPageList={ITEMS_PER_PAGE_LIST}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
            showFastPaginationControls
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
});

export default CompanyTable;
