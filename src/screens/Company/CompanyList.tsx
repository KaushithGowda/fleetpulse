/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DataTable, Menu } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';
import { fakeCompanies } from '@/src/data/fakeStats';
import { CompanyType } from '@/src/types/company';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetCompany } from '@/src/components/Company/BottomSheetCompany';

const numberOfItemsPerPageList = [5, 10, 50];

const CompanyList = () => {
  const { colorScheme } = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType>();
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[2]);
  const [menuVisible, setMenuVisible] = useState(false);
  // Sorting state
  const [sortColumn, setSortColumn] = useState<
    | 'name'
    | 'establishedOn'
    | 'registrationNumber'
    | 'website'
    | 'city'
    | 'state'
    | 'zipCode'
    | 'contactFirstName'
    | 'contactLastName'
    | 'contactEmail'
    | 'contactMobile'
  >('name');
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

  const handleRowPress = useCallback((company: CompanyType) => {
    setSelectedCompany(company);
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const filteredCompanies = useMemo(() => {
    return fakeCompanies.filter(company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Sorted companies based on sortColumn & sortDirection
  const sortedCompanies = useMemo(() => {
    return [...filteredCompanies].sort((a, b) => {
      let fieldA: string = '';
      let fieldB: string = '';

      switch (sortColumn) {
        case 'name':
          fieldA = a.name.toLowerCase();
          fieldB = b.name.toLowerCase();
          break;
        case 'establishedOn':
          fieldA = a.establishedOn.toLowerCase();
          fieldB = b.establishedOn.toLowerCase();
          break;
        case 'registrationNumber':
          fieldA = a.registrationNumber.toLowerCase();
          fieldB = b.registrationNumber.toLowerCase();
          break;
        case 'website':
          fieldA = a.website.toLowerCase();
          fieldB = b.website.toLowerCase();
          break;
        case 'city':
          fieldA = a.city.toLowerCase();
          fieldB = b.city.toLowerCase();
          break;
        case 'state':
          fieldA = a.state.toLowerCase();
          fieldB = b.state.toLowerCase();
          break;
        case 'zipCode':
          fieldA = a.zipCode.toLowerCase();
          fieldB = b.zipCode.toLowerCase();
          break;
        case 'contactFirstName':
          fieldA = a.contactFirstName.toLowerCase();
          fieldB = b.contactFirstName.toLowerCase();
          break;
        case 'contactLastName':
          fieldA = a.contactLastName.toLowerCase();
          fieldB = b.contactLastName.toLowerCase();
          break;
        case 'contactEmail':
          fieldA = a.contactEmail.toLowerCase();
          fieldB = b.contactEmail.toLowerCase();
          break;
        case 'contactMobile':
          fieldA = a.contactMobile.toLowerCase();
          fieldB = b.contactMobile.toLowerCase();
          break;
      }

      const comparison = fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      return sortDirection === 'ascending' ? comparison : -comparison;
    });
  }, [filteredCompanies, sortColumn, sortDirection]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredCompanies.length);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 p-4 bg-white dark:bg-black">
        <TextInput
          className="mb-4 p-2 border rounded text-black dark:text-white dark:border-gray-600"
          placeholder="Search companies..."
          placeholderTextColor="#6b7280"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <ScrollView>
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title
                  style={{ minWidth: 60 }}
                >
                  <View>
                    <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Icon</Text>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('name');
                    setSortDirection(prev => (sortColumn === 'name' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Name</Text>
                    </View>
                    <View>
                      {sortColumn === 'name' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('establishedOn');
                    setSortDirection(prev => (sortColumn === 'establishedOn' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Established On</Text>
                    </View>
                    <View>
                      {sortColumn === 'establishedOn' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('registrationNumber');
                    setSortDirection(prev => (sortColumn === 'registrationNumber' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Registration</Text>
                    </View>
                    <View>
                      {sortColumn === 'registrationNumber' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 200, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('website');
                    setSortDirection(prev => (sortColumn === 'website' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Website</Text>
                    </View>
                    <View>
                      {sortColumn === 'website' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title style={{ minWidth: 200 }}>
                  <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Address 1</Text>
                </DataTable.Title>
                <DataTable.Title style={{ minWidth: 150 }}>
                  <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Address 2</Text>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 120, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('city');
                    setSortDirection(prev => (sortColumn === 'city' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>City</Text>
                    </View>
                    <View>
                      {sortColumn === 'city' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 80, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('state');
                    setSortDirection(prev => (sortColumn === 'state' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>State</Text>
                    </View>
                    <View>
                      {sortColumn === 'state' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 100, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('zipCode');
                    setSortDirection(prev => (sortColumn === 'zipCode' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Zip Code</Text>
                    </View>
                    <View>
                      {sortColumn === 'zipCode' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('contactFirstName');
                    setSortDirection(prev => (sortColumn === 'contactFirstName' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Contact First Name</Text>
                    </View>
                    <View>
                      {sortColumn === 'contactFirstName' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('contactLastName');
                    setSortDirection(prev => (sortColumn === 'contactLastName' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Contact Last Name</Text>
                    </View>
                    <View>
                      {sortColumn === 'contactLastName' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 250, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('contactEmail');
                    setSortDirection(prev => (sortColumn === 'contactEmail' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Contact Email</Text>
                    </View>
                    <View>
                      {sortColumn === 'contactEmail' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
                <DataTable.Title
                  style={{ minWidth: 150, flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setSortColumn('contactMobile');
                    setSortDirection(prev => (sortColumn === 'contactMobile' && prev === 'ascending' ? 'descending' : 'ascending'));
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                    <View>
                      <Text className={'text-sm font-semibold text-gray-800 dark:text-white'}>Contact Mobile</Text>
                    </View>
                    <View>
                      {sortColumn === 'contactMobile' ? (
                        <MaterialCommunityIcons
                          name={sortDirection === 'ascending' ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color="#6B7280"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="arrow-up-down"
                          size={12}
                          color="#9CA3AF"
                        />
                      )}
                    </View>
                  </View>
                </DataTable.Title>
              </DataTable.Header>

              {sortedCompanies.slice(from, to).map(company => (
                <TouchableOpacity key={company.id} onPress={() => handleRowPress(company)}>
                  <DataTable.Row>
                    <DataTable.Cell style={{ minWidth: 60, paddingVertical: 8 }}>
                      <View className="w-8 h-8 rounded-full bg-green-600 dark:bg-green-500 justify-center items-center">
                        <Text className="text-white font-bold text-lg">{company.name.charAt(0)}</Text>
                      </View>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.name}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.establishedOn}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.registrationNumber}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 200 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.website}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 200 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.address1}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.address2}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 120 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.city}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 80 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.state}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 100 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.zipCode}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.contactFirstName}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.contactLastName}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 250 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.contactEmail}</DataTable.Cell>
                    <DataTable.Cell style={{ minWidth: 150 }} textStyle={{ fontSize: 12, fontWeight: 400, color: colorScheme === 'light' ? '#504f58' : '#fff' }}>{company.contactMobile}</DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              ))}
            </DataTable>
          </ScrollView>
        </ScrollView>
        <View className="bg-white dark:bg-black pb-20 border-t border-gray-200 dark:border-gray-700">
          <View className="flex-row items-center justify-end px-4 py-2">
            <Text className="text-sm text-gray-700 dark:text-gray-300">Rows per page</Text>
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuVisible(menuVisible => !menuVisible)}
                  className="flex-row items-center mt-1 ml-2 px-2 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                >
                  <Text className="text-sm text-gray-800 dark:text-white mr-2">{itemsPerPage}</Text>
                  <MaterialCommunityIcons
                    name={menuVisible ? 'chevron-up' : 'chevron-down'}
                    size={18}
                    color={colorScheme === 'dark' ? '#fff' : '#000'}
                  />
                </TouchableOpacity>
              }
            >
              {numberOfItemsPerPageList.map((num) => (
                <Menu.Item
                  key={num}
                  onPress={() => {
                    setItemsPerPage(num);
                    setMenuVisible(false);
                  }}
                  titleStyle={{ fontSize: 14 }}
                  title={`${num}`}
                />
              ))}
            </Menu>
          </View>
          <DataTable.Pagination
            page={page}
            numberOfPages={totalPages}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${filteredCompanies.length}`}
            showFastPaginationControls
            numberOfItemsPerPage={itemsPerPage}
            paginationControlRippleColor="#ccc"
          />
        </View>
        <BottomSheetCompany selectedCompany={selectedCompany} bottomSheetRef={bottomSheetRef} />
      </View>
    </GestureHandlerRootView>
  );
};

export default CompanyList;
