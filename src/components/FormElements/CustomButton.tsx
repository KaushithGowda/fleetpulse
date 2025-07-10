import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
} & TouchableOpacityProps;

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading = false,
    disabled = false,
    className = '',
    textClassName = '',
    ...rest
}) => {
    const { colorScheme } = useColorScheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            className={`h-12 bg-gray-900 dark:bg-white rounded-lg justify-center items-center mt-4 ${disabled || isLoading ? 'opacity-60' : ''} ${className}`}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator color={colorScheme === 'dark' ? '#000' : '#fff'} />
            ) : (
                <Text className={`text-white dark:text-gray-900 font-bold ${textClassName}`}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};