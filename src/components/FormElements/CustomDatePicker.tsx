

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FieldError } from 'react-hook-form';
import { format } from 'date-fns';
import { COLORS } from '@/src/constants/colors';
import { useColorScheme } from 'nativewind';

type CustomDatePickerProps = {
  className?: string;
  placeholder: string,
  label?: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: FieldError;
  disabled?: boolean
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  className,
  placeholder,
  label,
  value,
  onChange,
  error,
  disabled
}) => {
  const { colorScheme } = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View className="gap-y-2">
      {label && (
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 px-1">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700 }}
        className={`justify-center text-slate-900 dark:text-gray-100 h-14 rounded-lg px-4 text-base ${className}`}
      >
        <Text className="text-[#9CA3AF]">
          {value ? format(value, 'PPP') : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
          disabled={disabled}
        />
      )}

      {error?.message && (
        <Text className="text-red-400 text-left text-sm px-5">
          {error.message}
        </Text>
      )}
    </View>
  );
};