import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { useGetCompanies } from '@/src/hooks/company/useGetCompanies';
import { useIsFetching } from '@tanstack/react-query';

import { COLORS } from '@/src/constants/colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { CompanyType } from '@/src/types/company';

import { View, Text, TouchableOpacity, Linking, Alert, Share } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { EntityTable } from '@/src/components/EntityTable';
import { EntityBottomSheet } from '@/src/components/EntityBottomSheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { showToast } from '@/src/utils/showToast';
import { useDeleteCompany } from '@/src/hooks/company/useDeleteCompany';

const numberOfItemsPerPageList = [5, 10, 50];

const CompanyList = () => {
  const { colorScheme } = useColorScheme();
  const isFetching = useIsFetching();
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  const { companies, total, refetch } = useGetCompanies({
    search: debouncedQuery,
    limit: itemsPerPage,
    offset: page * itemsPerPage,
  });

  useFocusEffect(
    useCallback(() => {
      setSearchQuery('');
      refetch();
    }, [refetch])
  );

  const ShareDetails = async () => {
    if (!selectedCompany) return;
    showToast({
      isSuccess: true,
      successTitle: 'Sharing ➡️',
      successDesc: `${selectedCompany.companyName} company details`
    })
    const message = `
    Company: ${selectedCompany.companyName}
    Established: ${selectedCompany.establishedOn}
    Reg No: ${selectedCompany.registrationNumber}
    Website: ${selectedCompany.website}

    Address: 
    ${selectedCompany.address1}${selectedCompany.address2 ? `, ${selectedCompany.address2}` : ''}
    ${selectedCompany.city}, ${selectedCompany.state} - ${selectedCompany.zipCode}

    Contact:
    ${selectedCompany.primaryFirstName} ${selectedCompany.primaryLastName}
    Email: ${selectedCompany.primaryEmail}
    Mobile: ${selectedCompany.primaryMobile}`.trim();

    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Sharing failed", "Something went wrong while trying to share the company details.");
    }
  }

  const { deleteCompany } = useDeleteCompany();

  const handleDeleteCompanies = () => {
    Alert.alert('Delete Driver', `Are you sure you want to Delete ${selectedCompany?.companyName} ?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          if (selectedCompany?.id) {
            const response = await deleteCompany(selectedCompany?.id);
            if (response.success) {
              bottomSheetRef.current?.close();
              setSelectedCompany(null);
              refetch();
            }
          }
        }
      },
    ]);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}>
      {(companies.length === 0 && !(debouncedQuery.length > 0) && !isFetching) ? (
        <View className="flex-1 items-center justify-center px-4">
          <MaterialCommunityIcons name="office-building-outline" size={80} color={colorScheme === 'light' ? COLORS.textSlate900 : COLORS.textGray100} />
          <Text className="text-gray-900 font-semibold dark:text-gray-100 text-center text-3xl mb-8">
            Get Started
          </Text>
          <Text className="text-gray-900 dark:text-gray-100 text-center text-sm mb-2">
            Add your first company and manage your ops like a pro!
          </Text>
          <CustomButton
            title='Add Company'
            rightIconName='office-building-outline'
            onPress={() => navigation.navigate('CompanyForm')}
          />
        </View>
      ) : (
        <EntityTable<CompanyType>
          data={companies}
          columns={[
            { key: 'companyName', title: 'Company Name', sortable: true },
            { key: 'establishedOn', title: 'Established On', sortable: true },
            { key: 'website', title: 'Website', sortable: true },
            { key: 'registrationNumber', title: 'Reg No', sortable: true },
            { key: 'address1', title: 'Address 1' },
            { key: 'address2', title: 'Address 2' },
            { key: 'country', title: 'Country', sortable: true },
            { key: 'city', title: 'City', sortable: true },
            { key: 'state', title: 'State', sortable: true },
            { key: 'zipCode', title: 'Zip', sortable: true },
            { key: 'primaryFirstName', title: 'FirstName', sortable: true },
            { key: 'primaryLastName', title: 'LastName', sortable: true },
            { key: 'primaryEmail', title: 'Email', sortable: true },
            { key: 'primaryMobile', title: 'Mobile', sortable: true },
          ]}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          page={page}
          setPage={setPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          totalItems={total}
          screenType='company'
          filterPlaceholder="Search companies..."
          paginationView={selectedCompany !== null ? false : true}
          onRowPress={(driver) => {
            setSelectedCompany(driver);
            bottomSheetRef.current?.snapToIndex(0);
          }}
          className='relative flex-1 my-1 px-4'
        />
      )}
      <EntityBottomSheet setState={setSelectedCompany} bottomSheetRef={bottomSheetRef}>
        {selectedCompany &&
          <View className="gap-y-2">
            <View className="flex-row justify-between mb-3">
              <CustomButton
                onPress={() => ShareDetails()}
                disabled={!selectedCompany}
                rightIconName='share-variant'
                className='bg-green-500 px-3'
              />
              <View className='flex-row gap-x-2'>
                <CustomButton
                  onPress={() => navigation.navigate('CompanyForm',{
                    company: selectedCompany
                  })}
                  rightIconName='square-edit-outline'
                  className='bg-green-500 px-3'
                />
                <CustomButton
                  onPress={() => handleDeleteCompanies()}
                  rightIconName='delete'
                  className='px-3'
                />
              </View>
            </View>

            <Text className="text-slate-900 dark:text-gray-100 text-sm mb-1 px-1">Company Details</Text>

            <View className="flex-row bg-gray-200 dark:bg-slate-900 p-4 mb-4 rounded-xl">
              <View className="flex items-center justify-center mr-4">
                <View className="w-28 h-28 rounded-full bg-green-500 justify-center items-center">
                  <Text className="text-white font-extrabold text-5xl">{selectedCompany.companyName.charAt(0)}</Text>
                </View>
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Name</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.companyName}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Established On</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{new Date(selectedCompany.establishedOn).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Registration No.</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.registrationNumber}</Text>
                </View>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Company Website</Text>
            <View className="rounded-xl bg-gray-200 dark:bg-slate-900 p-4 mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Website</Text>
                <View className='flex-row items-center justify-center gap-x-3'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.website}</Text>
                  <TouchableOpacity onPress={() => {
                    Clipboard.setString(selectedCompany.website)
                    showToast({
                      isSuccess: true,
                      successTitle: 'Copied ✅',
                      successDesc: `${selectedCompany.companyName}'s web link copied`
                    })
                  }}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={async () => {
                    const supported = await Linking.canOpenURL(selectedCompany.website);
                    if (supported) {
                      showToast({
                        isSuccess: true,
                        successTitle: `Redirecting to '${selectedCompany.website}'`,
                      })
                      Linking.openURL(selectedCompany.website);
                    } else {
                      Alert.alert("Invalid URL", "Cannot open the provided website.");
                    }
                  }}>
                    <MaterialCommunityIcons name="link" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Company Address</Text>
            <View className="rounded-xl bg-gray-200 dark:bg-slate-900 p-4 mb-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Address</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">
                  {selectedCompany.address1}{selectedCompany.address2 ? `, ${selectedCompany.address2}` : ''}
                </Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">City</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.city}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">State</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.state}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Zip Code</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.zipCode}</Text>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Contact Person</Text>

            <View className="rounded-xl bg-gray-200 dark:bg-slate-900 p-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Full Name</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">
                  {selectedCompany.primaryFirstName} {selectedCompany.primaryLastName}
                </Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Email</Text>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.primaryEmail}</Text>
                  <TouchableOpacity onPress={() => {
                    Clipboard.setString(selectedCompany.primaryEmail)
                    showToast({
                      isSuccess: true,
                      successTitle: 'Copied ✅',
                      successDesc: `${selectedCompany.primaryFirstName}'s email address copied`
                    })
                  }}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Mobile</Text>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.primaryMobile}</Text>
                  <TouchableOpacity onPress={() => {
                    Clipboard.setString(selectedCompany.primaryMobile)
                    showToast({
                      isSuccess: true,
                      successTitle: 'Copied ✅',
                      successDesc: `${selectedCompany.primaryFirstName}'s phone number copied`
                    })
                  }}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View >
        }
      </EntityBottomSheet >
    </View >
  );
}

export default CompanyList;