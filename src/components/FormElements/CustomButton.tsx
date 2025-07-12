import React from 'react';
import { useColorScheme } from 'nativewind';

import { COLORS } from '@/src/constants/colors';

import { TouchableOpacity, Text, TouchableOpacityProps, View } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CustomButtonProps = {
    title?: string;
    onPress: () => void;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
    rightIconName?: string;
} & TouchableOpacityProps;

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    disabled = false,
    className = '',
    textClassName = '',
    rightIconName,
    ...rest
}) => {
    const { colorScheme } = useColorScheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
            style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundSlate700 : COLORS.backgroundSlate900 }}
            className={`h-12 rounded-lg justify-center items-center px-2 ${disabled ? 'opacity-60' : ''} ${className}`}
            {...rest}
        >
            <View className="flex-row items-center gap-x-2">
                {
                    title &&
                    <Text className={`text-gray-100 font-bold ${textClassName}`}>
                        {title}
                    </Text>
                }
                {rightIconName && (
                    <MaterialCommunityIcons name={rightIconName} size={18} color={'#fff'} />
                )}
            </View>
        </TouchableOpacity>
    );
};