import { useRef, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { Linking, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '@/src/constants/colors';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompanyType } from '@/src/types/company';

import { View, Text, TouchableOpacity } from 'react-native';
import { CustomButton } from '@/src/components/FormElements/CustomButton';
import { EntityTable } from '@/src/components/EntityTable';
import { EntityBottomSheet } from '@/src/components/EntityBottomSheet';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';

import { fakeCompanies } from '@/src/data/fakeStats';
import { useColorScheme } from 'nativewind';

const CompanyList = () => {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);

  const ShareDetails = async () => {
    if (!selectedCompany) return;
    const message = `
    Company: ${selectedCompany.name}
    Established: ${selectedCompany.establishedOn}
    Reg No: ${selectedCompany.registrationNumber}
    Website: ${selectedCompany.website}

    Address: 
    ${selectedCompany.address1}${selectedCompany.address2 ? `, ${selectedCompany.address2}` : ''}
    ${selectedCompany.city}, ${selectedCompany.state} - ${selectedCompany.zipCode}

    Contact:
    ${selectedCompany.contactFirstName} ${selectedCompany.contactLastName}
    Email: ${selectedCompany.contactEmail}
    Mobile: ${selectedCompany.contactMobile}`.trim();

    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert("Sharing failed", "Something went wrong while trying to share the company details.");
    }
  }

  return (
    <View className="flex-1 px-4" style={{ backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300 }}>
      {(fakeCompanies.length === 0) ? (
        <View className="flex-1 items-center justify-center">
          <MaterialCommunityIcons name="truck" size={80} color={colorScheme === 'light' ? COLORS.textSlate900 : COLORS.textGray100} />
          <Text className="text-gray-900 font-semibold dark:text-gray-100 text-center text-3xl mb-8">
            Get Started
          </Text>
          <Text className="text-gray-900 dark:text-gray-100 text-center text-sm mb-2">
            Add your first company and manage your ops like a pro!
          </Text>
          <CustomButton
            title='Add Driver'
            rightIconName='office-building-outline'
            onPress={() => navigation.navigate('DriverForm')}
          />
        </View>
      ) : (
        <EntityTable<CompanyType>
          screenType='company'
          data={fakeCompanies}
          columns={[
            { key: 'name', title: 'Company Name', sortable: true },
            { key: 'establishedOn', title: 'Established On', sortable: true },
            { key: 'website', title: 'Website', sortable: true },
            { key: 'registrationNumber', title: 'Reg No', sortable: true },
            { key: 'address1', title: 'Address 1' },
            { key: 'address2', title: 'Address 2' },
            { key: 'country', title: 'Country', sortable: true },
            { key: 'city', title: 'City', sortable: true },
            { key: 'state', title: 'State', sortable: true },
            { key: 'zipCode', title: 'Zip', sortable: true },
            { key: 'contactFirstName', title: 'FirstName', sortable: true },
            { key: 'contactLastName', title: 'LastName', sortable: true },
            { key: 'contactEmail', title: 'Email', sortable: true },
            { key: 'contactMobile', title: 'Mobile', sortable: true },
          ]}

          filterPlaceholder="Search companies..."
          onRowPress={(driver) => {
            setSelectedCompany(driver);
            bottomSheetRef.current?.snapToIndex(0);
          }}
          className='relative flex-1 my-1'
        />
      )}
      <EntityBottomSheet bottomSheetRef={bottomSheetRef}>
        {selectedCompany && (
          <View className="gap-y-2">
            <View className="flex-row justify-between mb-3">
              <CustomButton
                onPress={() => ShareDetails()}
                disabled={!selectedCompany}
                rightIconName='share-variant'
                className='bg-green-500 px-3'
              />
              <CustomButton
                onPress={() => navigation.navigate('DriverForm')}
                rightIconName='square-edit-outline'
                className='bg-green-500 px-3'
              />
            </View>

            <Text className="text-slate-900 dark:text-gray-100 text-sm mb-1 px-1">Company Details</Text>

            <View className="flex-row bg-gray-100 dark:bg-slate-900 p-4 mb-4 rounded-xl">
              <View className="flex items-center justify-center mr-4">
                <View className="w-28 h-28 rounded-full bg-green-500 justify-center items-center">
                  <Text className="text-white font-extrabold text-5xl">{selectedCompany.name.charAt(0)}</Text>
                </View>
              </View>
              <View className="flex-1 justify-center">
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Name</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.name}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Established On</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.establishedOn}</Text>
                </View>
                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                  <Text className="text-slate-500 dark:text-slate-400 text-sm">Registration No.</Text>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.registrationNumber}</Text>
                </View>
              </View>
            </View>

            <Text className="text-slate-500 dark:text-slate-400 text-sm mb-1 px-1">Company Website</Text>
            <View className="rounded-xl bg-gray-100 dark:bg-slate-900 p-4 mb-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Website</Text>
                <View className='flex-row items-center justify-center gap-x-3'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.website}</Text>
                  <TouchableOpacity onPress={() => Clipboard.setString(selectedCompany.website)}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={async () => {
                    const supported = await Linking.canOpenURL(selectedCompany.website);
                    if (supported) {
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
            <View className="rounded-xl bg-gray-100 dark:bg-slate-900 p-4 mb-4">
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

            <View className="rounded-xl bg-gray-100 dark:bg-slate-900 p-4">
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Full Name</Text>
                <Text className="text-slate-900 dark:text-gray-100 text-sm">
                  {selectedCompany.contactFirstName} {selectedCompany.contactLastName}
                </Text>
              </View>
              <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-2 mb-2">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Email</Text>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.contactEmail}</Text>
                  <TouchableOpacity onPress={() => Clipboard.setString(selectedCompany.contactEmail)}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-slate-500 dark:text-slate-400 text-sm">Mobile</Text>
                <View className='flex-row items-center justify-center gap-x-2'>
                  <Text className="text-slate-900 dark:text-gray-100 text-sm">{selectedCompany.contactMobile}</Text>
                  <TouchableOpacity onPress={() => Clipboard.setString(selectedCompany.contactMobile)}>
                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View >
        )
        }
      </EntityBottomSheet >
    </View >
  );
}

export default CompanyList;