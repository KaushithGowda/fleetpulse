import { View, Text, TouchableOpacity } from 'react-native';

import { useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

import { fakeDrivers } from '@/src/data/fakeStats';
import { DriverType } from '@/src/types/driver';
import { EntityTable } from '@/src/components/EntityTable';
import { EntityBottomSheet } from '@/src/components/EntityBottomSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CustomButton } from '@/src/components/FormElements/CustomButton';

const DriverList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDriver, setSelectedDriver] = useState<DriverType | null>(null);
  return (
    <View className="flex-1 px-4 bg-gray-100 dark:bg-black">
      <CustomButton
        onPress={() => navigation.navigate('DriverForm')}
        title='Add driver'
      />
      <EntityTable<DriverType>
        screenType='driver'
        data={fakeDrivers}
        columns={[
          { key: 'firstName', title: 'Driver First Name', sortable: true },
          { key: 'lastName', title: 'Driver Last Name', sortable: true },
          { key: 'email', title: 'E-mail', sortable: true },
          { key: 'mobile', title: 'Mobile#', sortable: true },
          { key: 'dob', title: 'Date of Birth', sortable: true },
          { key: 'licenseNumber', title: 'License #', sortable: true },
          { key: 'experience', title: 'Experience (yrs)', sortable: true },
          { key: 'address1', title: 'Address 1' },
          { key: 'address2', title: 'Address 2' },
          { key: 'city', title: 'City', sortable: true },
          { key: 'state', title: 'State', sortable: true },
          { key: 'zipCode', title: 'Zip Code', sortable: true },
        ]}
        filterPlaceholder="Search drivers..."
        onRowPress={(driver) => {
          setSelectedDriver(driver);
          bottomSheetRef.current?.snapToIndex(0);
        }}
        className='relative flex-1 my-1'
      />
      <EntityBottomSheet bottomSheetRef={bottomSheetRef}>
        {selectedDriver && (
          <View className="gap-y-2">
            <View className="flex-row justify-between px-2">
              <TouchableOpacity className="mb-2">
                <MaterialCommunityIcons name="share-variant" size={24} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="square-edit-outline" size={28} color="#4B5563" />
              </TouchableOpacity>
            </View>
            {/* Section Title: Driver Info */}
            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">Driver Info</Text>

            {/* Driver Info Block */}
            <View className="flex-row bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl">
              <View className="items-center justify-center mr-4">
                <View className="w-28 h-28 rounded-full bg-blue-600 dark:bg-blue-500 justify-center items-center">
                  <Text className="text-white font-extrabold text-5xl">{selectedDriver.firstName.charAt(0)}</Text>
                </View>
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">First Name</Text>
                  <Text className="text-black dark:text-white text-sm">{selectedDriver.firstName}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">Last Name</Text>
                  <Text className="text-black dark:text-white text-sm">{selectedDriver.lastName}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-500 dark:text-gray-400 text-sm">Date of Birth</Text>
                  <Text className="text-black dark:text-white text-sm">{selectedDriver.dob}</Text>
                </View>
              </View>
            </View>

            {/* License & Contact */}
            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">License & Contact</Text>
            <View className="rounded-xl bg-white dark:bg-gray-900 p-4 mb-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">License #</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.licenseNumber}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Experience (yrs)</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.experience}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Email</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.email}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Mobile</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.mobile}</Text>
              </View>
            </View>

            {/* Address */}
            <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">Address</Text>
            <View className="rounded-xl bg-white dark:bg-gray-900 p-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Address</Text>
                <Text className="text-black dark:text-white text-sm">
                  {selectedDriver.address1}{selectedDriver.address2 ? `, ${selectedDriver.address2}` : ''}
                </Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">City</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.city}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">State</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.state}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 dark:text-gray-400 text-sm">Zip Code</Text>
                <Text className="text-black dark:text-white text-sm">{selectedDriver.zipCode}</Text>
              </View>
            </View>
          </View>
        )}
      </EntityBottomSheet>
    </View>
  );
};

export default DriverList;
