/* eslint-disable react-native/no-inline-styles */
import type { CompanyType } from '@/src/types/company';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useColorScheme } from 'nativewind';
import { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type BottomSheetCompanyProps = {
    selectedCompany?: CompanyType;
    bottomSheetRef: React.RefObject<BottomSheet | null>;
};

export const BottomSheetCompany = ({ selectedCompany, bottomSheetRef }: BottomSheetCompanyProps) => {
    const { colorScheme } = useColorScheme();
    const renderBackdrop = useCallback(
        (props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );
    return <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={['40%', '70%', '100%']}
        backdropComponent={renderBackdrop}
        handleStyle={{
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#000'
        }}
        handleIndicatorStyle={{
            backgroundColor: colorScheme === 'light' ? '#f5f5f5' : '#000'
        }}
    >
        <BottomSheetScrollView
            className="bg-gray-100 dark:bg-black"
            contentContainerStyle={{ padding: 20 }}
        >
            <View className="bg-gray-100 dark:bg-black pb-10 pt-2">
                {selectedCompany && (
                    <View className="gap-y-2">
                        <View className="flex-row justify-between px-2">
                            <TouchableOpacity className="mb-2">
                                <MaterialCommunityIcons name="share-variant" size={24} color="#4B5563" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="square-edit-outline" size={28} color="#4B5563" />
                            </TouchableOpacity>
                        </View>

                        {/* Section Title: Company Details */}
                        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">Company Details</Text>

                        {/* Company Details Section (icon moved inside card, vertical layout) */}
                        <View className="mt-0 flex-row">
                            <View className="flex-row bg-white dark:bg-gray-900 p-4 mb-4 rounded-xl flex-1">
                                <View className="items-center justify-center mr-4">
                                    <View className="w-28 h-28 rounded-full bg-green-600 dark:bg-green-500 justify-center items-center">
                                        <Text className="text-white font-extrabold text-5xl">{selectedCompany.name.charAt(0)}</Text>
                                    </View>
                                </View>
                                <View className="flex-1 justify-center">
                                    <View>
                                        <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                            <Text className="text-gray-500 dark:text-gray-400 text-sm">Name</Text>
                                            <Text className="text-black dark:text-white text-sm">{selectedCompany.name}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                            <Text className="text-gray-500 dark:text-gray-400 text-sm">Established On</Text>
                                            <Text className="text-black dark:text-white text-sm">{selectedCompany.establishedOn}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                            <Text className="text-gray-500 dark:text-gray-400 text-sm">Registration</Text>
                                            <Text className="text-black dark:text-white text-sm">{selectedCompany.registrationNumber}</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center">
                                            <Text className="text-gray-500 dark:text-gray-400 text-sm">Website</Text>
                                            <View className="flex-row items-center">
                                                <Text className="text-black dark:text-white mr-1 text-sm">{selectedCompany.website}</Text>
                                                <TouchableOpacity className='mr-1'>
                                                    <MaterialCommunityIcons name="link-variant" size={20} color="#4B5563" />
                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Section Title: Company Address */}
                        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">Company Address</Text>

                        {/* Company Location Section */}
                        <View className="rounded-xl bg-white dark:bg-gray-900 p-4 mb-4">
                            <View>
                                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">Address</Text>
                                    <Text className="text-black dark:text-white text-right text-sm">
                                        {selectedCompany.address1}{selectedCompany.address2 ? `, ${selectedCompany.address2}` : ''}
                                    </Text>
                                </View>
                                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">City</Text>
                                    <Text className="text-black dark:text-white text-sm">{selectedCompany.city}</Text>
                                </View>
                                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">State</Text>
                                    <Text className="text-black dark:text-white text-sm">{selectedCompany.state}</Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">Zip Code</Text>
                                    <Text className="text-black dark:text-white text-sm">{selectedCompany.zipCode}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Section Title: Contact Person */}
                        <Text className="text-gray-500 dark:text-gray-400 text-sm mb-1 px-1">Contact Person</Text>

                        {/* Contact Person Section */}
                        <View className="rounded-xl bg-white dark:bg-gray-900 p-4">
                            <View>
                                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">Name</Text>
                                    <Text className="text-black dark:text-white text-sm">{selectedCompany.contactFirstName} {selectedCompany.contactLastName}</Text>
                                </View>
                                <View className="flex-row justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 mb-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">Email</Text>
                                    <View className="flex-row items-center">
                                        <Text className="text-black dark:text-white mr-1 text-sm">{selectedCompany.contactEmail}</Text>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-gray-500 dark:text-gray-400 text-sm">Mobile</Text>
                                    <View className="flex-row items-center">
                                        <Text className="text-black dark:text-white mr-1 text-sm">{selectedCompany.contactMobile}</Text>
                                        <TouchableOpacity>
                                            <MaterialCommunityIcons name="content-copy" size={20} color="#4B5563" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </BottomSheetScrollView>
    </BottomSheet>
}