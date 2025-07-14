/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { useGetDrivers } from '@/src/hooks/driver/useGetDrivers';
import { useIsFetching } from '@tanstack/react-query';

import { COLORS } from '@/src/constants/colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DriverType } from '@/src/types/driver';

import { View, Text, Alert, Share, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { EntityTable, formatExperience } from '@/src/components/EntityTable';
import { EntityBottomSheet } from '@/src/components/EntityBottomSheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { Transition } from '@/src/components/Transistions/Transition';
import { showToast } from '@/src/utils/showToast';
import { useDeleteDriver } from '@/src/hooks/driver/useDeleteDriver';

const numberOfItemsPerPageList = [5, 10, 50];

const DriverList = () => {
  const { colorScheme } = useColorScheme();
  const isFetching = useIsFetching();
  const [selectedDriver, setSelectedDriver] = useState<DriverType | null>(null);

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

  const { drivers, total, refetch } = useGetDrivers({
    search: debouncedQuery,
    limit: itemsPerPage,
    offset: page * itemsPerPage
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedDriver(null);
        setSearchQuery('')
      };
    }, [])
  );

  const ShareDetails = async () => {
    if (!selectedDriver) return;
    const message = `
    Driver: ${selectedDriver.firstName} ${selectedDriver.lastName}
    DOB: ${selectedDriver.dateOfBirth}
    License No: ${selectedDriver.licenseNumber}
    Experience: ${selectedDriver.licenseStartDate} yrs

    Contact:
    Email: ${selectedDriver.email}
    Mobile: ${selectedDriver.mobile}

    Address:
    ${selectedDriver.address1}${selectedDriver.address2 ? `, ${selectedDriver.address2}` : ''}
    ${selectedDriver.city}, ${selectedDriver.state} - ${selectedDriver.zipCode}`.trim();
    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Sharing failed", "Something went wrong while sharing driver details.");
    }
  }

  const { deleteDriver } = useDeleteDriver();

  const handleDeleteDriver = () => {
    Alert.alert('Delete Driver', `Are you sure you want to Delete ${selectedDriver?.firstName} ?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          if (selectedDriver?.id) {
            const response = await deleteDriver(selectedDriver?.id);
            if (response.success) {
              bottomSheetRef.current?.close();
              setSelectedDriver(null);
              refetch();
            }
          }
        }
      },
    ]);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}>
      <Transition>
        {(drivers.length === 0 && !(debouncedQuery.length > 0) && !isFetching) ? (
          <View className="flex-1 items-center justify-center px-4">
            <MaterialCommunityIcons name="truck" size={80} color={colorScheme === 'light' ? COLORS.textSlate900 : COLORS.textGray100} />
            <Text className="text-gray-900 font-semibold dark:text-gray-100 text-center text-3xl mb-8">
              Get Started
            </Text>
            <Text className="text-gray-900 dark:text-gray-100 text-center text-sm mb-2">
              Add your first driver and manage your ops like a pro!
            </Text>
            <CustomButton
              title='Add Driver'
              rightIconName='plus'
              onPress={() => navigation.navigate('DriverForm')}
            />
          </View>
        ) : (
          <EntityTable<DriverType>
            data={drivers}
            columns={[
              { key: 'firstName', title: 'Driver First Name', sortable: true },
              { key: 'lastName', title: 'Driver Last Name', sortable: true },
              { key: 'email', title: 'E-mail', sortable: true },
              { key: 'mobile', title: 'Mobile', sortable: true },
              { key: 'dateOfBirth', title: 'Date of Birth', sortable: true },
              { key: 'licenseNumber', title: 'License No', sortable: true },
              { key: 'licenseStartDate', title: 'Experience', sortable: true },
              { key: 'address1', title: 'Address 1' },
              { key: 'address2', title: 'Address 2' },
              { key: 'country', title: 'Country', sortable: true },
              { key: 'city', title: 'City', sortable: true },
              { key: 'state', title: 'State', sortable: true },
              { key: 'zipCode', title: 'Zip', sortable: true },
            ]}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            totalItems={total}
            screenType='driver'
            filterPlaceholder="Search drivers..."
            paginationView={selectedDriver !== null ? false : true}
            onRowPress={(driver) => {
              setSelectedDriver(driver);
              bottomSheetRef.current?.snapToIndex(0);
            }}
            className='relative flex-1 my-1 px-4'
          />
        )}
        <EntityBottomSheet setState={setSelectedDriver} bottomSheetRef={bottomSheetRef}>
          {selectedDriver &&
            <View className="gap-y-2">
              <View className="flex-row justify-between mb-3">
                <CustomButton
                  onPress={() => ShareDetails()}
                  rightIconName='share-variant'
                  className='px-3'
                />
                <View className='flex-row gap-x-2'>
                  <CustomButton
                    onPress={() => navigation.navigate('DriverForm', {
                      driver: selectedDriver
                    })}
                    rightIconName='square-edit-outline'
                    className='px-3'
                  />
                  <CustomButton
                    onPress={() => handleDeleteDriver()}
                    rightIconName='delete'
                    className='px-3'
                  />
                </View>
              </View>

              <Text className="text-slate-900 dark:text-gray-100 text-sm mb-1 px-1">Driver Info</Text>

              <View className="flex-row bg-gray-200 dark:bg-slate-900 p-4 mb-4 rounded-xl">
                <View className="flex items-center justify-center mr-4">
                  <View className="w-28 h-28 rounded-full bg-blue-500 justify-center items-center">
                    <Text className="text-white font-extrabold text-5xl">{selectedDriver.firstName.charAt(0)}</Text>
                  </View>
                </View>
                <View className="flex-1 justify-center">
                  <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                    <Text className="text-slate-500 dark:text-slate-400 text-sm">First Name</Text>
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.firstName}</Text>
                  </View>
                  <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                    <Text className="text-slate-500 dark:text-slate-400 text-sm">Last Name</Text>
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.lastName}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-slate-500 dark:text-slate-400 text-sm">Date of Birth</Text>
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{new Date(selectedDriver.dateOfBirth).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}</Text>
                  </View>
                </View>
              </View>

              <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">License & Contact</Text>
              <View className="rounded-xl bg-gray-200 dark:bg-slate-900 p-4 mb-4">
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">License No.</Text>
                  <View className="flex-row items-center gap-x-3">
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.licenseNumber}</Text>
                    <TouchableOpacity onPress={() => {
                      Clipboard.setString(selectedDriver.licenseNumber)
                      showToast({
                        isSuccess: true,
                        successTitle: 'Copied ✅',
                        successDesc: `${selectedDriver.firstName}'s license number copied`
                      })
                    }}>
                      <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Experience</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{formatExperience(selectedDriver.licenseStartDate)}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Email</Text>
                  <View className="flex-row items-center gap-x-3">
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.email}</Text>
                    <TouchableOpacity onPress={() => {
                      Clipboard.setString(selectedDriver.email)
                      showToast({
                        isSuccess: true,
                        successTitle: 'Copied ✅',
                        successDesc: `${selectedDriver.firstName}'s email address copied`
                      })
                    }}>
                      <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Mobile</Text>
                  <View className="flex-row items-center gap-x-3">
                    <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.mobile}</Text>
                    <TouchableOpacity onPress={() => {
                      Clipboard.setString(selectedDriver.mobile)
                      showToast({
                        isSuccess: true,
                        successTitle: 'Copied ✅',
                        successDesc: `${selectedDriver.firstName}'s phone number copied`
                      })
                    }}>
                      <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Address</Text>
              <View className="rounded-xl bg-gray-200 dark:bg-slate-900 p-4">
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Address</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">
                    {selectedDriver.address1}{selectedDriver.address2 ? `, ${selectedDriver.address2}` : ''}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">City</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.city}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">State</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.state}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Zip Code</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.zipCode}</Text>
                </View>
              </View>
            </View>
          }
        </EntityBottomSheet>
      </Transition>
    </View>
  );
};

export default DriverList;
