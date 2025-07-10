import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '@/src/constants/colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DriverType } from '@/src/types/driver';

import { View, Text } from 'react-native';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { EntityTable } from '@/src/components/EntityTable';
import { EntityBottomSheet } from '@/src/components/EntityBottomSheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';

import { fakeDrivers } from '@/src/data/fakeStats';
import { useColorScheme } from 'nativewind';

const DriverList = () => {
  const {colorScheme} = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDriver, setSelectedDriver] = useState<DriverType | null>(null);

  return (
    <View className="flex-1 px-4" style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}>
      {(fakeDrivers.length === 0) ? (
        <View className="flex-1 items-center justify-center">
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
      )}
      <EntityBottomSheet bottomSheetRef={bottomSheetRef}>
        {selectedDriver && (
          <View className="gap-y-2">
            <View className="flex-row justify-between">
              <CustomButton
                onPress={() => { }}
                rightIconName='share-variant'
              />
              <CustomButton
                onPress={() => navigation.navigate('DriverForm')}
                rightIconName='square-edit-outline'
              />
            </View>

            <Text className="text-slate-900 dark:text-gray-100 text-sm mb-1 px-1">Driver Info</Text>

            <View className="flex-row bg-gray-100 dark:bg-slate-900 p-4 mb-4 rounded-xl">
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
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.dob}</Text>
                </View>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">License & Contact</Text>
            <View className="rounded-xl bg-gray-100 dark:bg-slate-900 p-4 mb-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">License #</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.licenseNumber}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Experience (yrs)</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.experience}</Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Email</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.email}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Mobile</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedDriver.mobile}</Text>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Address</Text>
            <View className="rounded-xl bg-gray-100 dark:bg-slate-900 p-4">
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
        )}
      </EntityBottomSheet>
    </View>
  );
};

export default DriverList;
