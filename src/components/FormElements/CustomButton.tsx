import { useColorScheme } from 'nativewind';
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CustomButtonProps = {
    title?: string;
    onPress: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
    textClassName?: string;
    rightIconName?: string;
} & TouchableOpacityProps;

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    isLoading = false,
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
            disabled={disabled || isLoading}
            activeOpacity={0.8}
            className={`h-12 rounded-lg justify-center items-center px-2 ${disabled || isLoading ? 'opacity-60' : ''} ${className}`}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator color={colorScheme === 'dark' ? '#000' : '#fff'} />
            ) : (
                <View className="flex-row items-center gap-x-2">
                    {
                        title &&
                        <Text className={`text-white font-bold ${textClassName}`}>
                            {title}
                        </Text>
                    }
                    {rightIconName && (
                        <MaterialCommunityIcons name={rightIconName} size={18} color={'#fff'} />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};