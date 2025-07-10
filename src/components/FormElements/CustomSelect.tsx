/* eslint-disable react-native/no-inline-styles */
import { useColorScheme } from 'nativewind';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { View, Text } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

type Option = {
    label: string;
    value: string;
};

type CustomSelectProps = {
    className?: string;
    label?: string;
    placeholder?: string;
    items: Option[];
    value: string;
    disabled?: boolean;
    onValueChange: (value: string) => void;
    error: FieldError | undefined;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
    className,
    label,
    placeholder = 'Select an option',
    items,
    value,
    onValueChange,
    disabled,
    error,
}) => {
    const { colorScheme } = useColorScheme();
    return (
        <View className={`gap-y-2 ${className}`}>
            {label && (
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </Text>
            )}
            <View className={`h-14 rounded-md bg-white dark:bg-black px-4 justify-center`}>
                <ModalSelector
                    data={items.map((item) => ({ label: item.label, key: item.value }))}
                    onChange={(option) => onValueChange(option.key)}
                    disabled={disabled}
                    cancelText="Cancel"
                    animationType="fade"
                    backdropPressToClose={true}
                    initValue={!value ? placeholder : undefined}
                    selectedKey={value}
                    style={{ backgroundColor: colorScheme === 'dark' ? '#000' : '#fff', borderRadius: 8 }}
                    selectStyle={{
                        height: 56,
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        borderRadius: 8,
                    }}
                    selectTextStyle={{
                        fontSize: 16,
                        color: colorScheme === 'dark' ? '#fff' : '#000',
                    }}
                    initValueTextStyle={{
                        fontSize: 16,
                        color: '#9CA3AF',
                    }}
                />
            </View>
            {error?.message && (
                <Text className="text-red-400 text-sm px-5">{error?.message}</Text>
            )}
        </View>
    );
};