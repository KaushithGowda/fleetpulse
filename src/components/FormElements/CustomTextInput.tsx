import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, Text, TouchableOpacity } from 'react-native';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { COLORS } from '@/src/constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type CustomTextInputProps = {
    className?: string;
    placeholder: string;
    returnKeyType: TextInputProps['returnKeyType'];
    keyboardType: TextInputProps['keyboardType'];
    onChangeText: (text: string) => void;
    onSubmitEditing?: TextInputProps['onSubmitEditing'];
    value: string;
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoCorrect?: TextInputProps['autoCorrect'];
    textContentType?: TextInputProps['textContentType'];
    disabled?: boolean;
    multiline?: TextInputProps['multiline'];
    numberOfLines?: TextInputProps['numberOfLines'];
    maxLength?: TextInputProps['maxLength'];
    onBlur?: TextInputProps['onBlur'];
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    label?: string;
    iconName?: string;
    onIconPress?: () => void;
    isSecureEntry?: boolean;
    toggleSecureEntry?: () => void;
    inputMode: TextInputProps['inputMode']
    autoComplete?: TextInputProps['autoComplete'],
    autoFocus?: TextInputProps['autoFocus'],
    defaultValue?: TextInputProps['defaultValue']
};

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
    ({ className, placeholder, returnKeyType, keyboardType, onChangeText, onSubmitEditing, error, label, autoCapitalize, autoCorrect, isSecureEntry, toggleSecureEntry, iconName = '', onIconPress, textContentType, disabled, maxLength, multiline, numberOfLines, onBlur, value, inputMode, autoComplete, autoFocus, defaultValue, ...rest }, ref) => {
        const {colorScheme} = useColorScheme();
        return (
            <View className="gap-y-2 relative">
                {label && (
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">
                        {label}
                    </Text>
                )}

                <TextInput
                    ref={ref}
                    placeholder={placeholder}
                    placeholderTextColor={colorScheme === 'light' ? COLORS.textSlate900 : COLORS.textGray100}
                    returnKeyType={returnKeyType}
                    keyboardType={keyboardType}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700 }}
                    className={`text-slate-900 dark:text-gray-100 h-14 rounded-lg px-4 text-base ${disabled ? 'opacity-50' : ''} ${className}`}
                    onBlur={onBlur}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={isSecureEntry}
                    textContentType={textContentType}
                    editable={!disabled}
                    maxLength={maxLength}
                    numberOfLines={numberOfLines}
                    multiline={multiline}
                    autoCorrect={autoCorrect}
                    value={value}
                    inputMode={inputMode}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    defaultValue={defaultValue}
                    {...rest}
                />
                {toggleSecureEntry && (
                    <TouchableOpacity
                        onPress={toggleSecureEntry}
                        className="absolute right-4 top-4"
                    >
                        <Text className="text-sm text-gray-900 dark:text-white font-medium">
                            {isSecureEntry ? 'Show' : 'Hide'}
                        </Text>
                    </TouchableOpacity>
                )}
                {
                    iconName?.length > 0 &&
                    <TouchableOpacity
                        onPress={onIconPress}
                        className="absolute right-4 top-4"
                    >
                        <MaterialCommunityIcons name={iconName} size={24} color="#4B5563" />
                    </TouchableOpacity>
                }
                {typeof error?.message === 'string' && (
                    <Text className="text-red-400 text-sm px-5">{error.message}</Text>
                )}
            </View>
        );
    }
);

CustomTextInput.displayName = 'CustomTextInput';