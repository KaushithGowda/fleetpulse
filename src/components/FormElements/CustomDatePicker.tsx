

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FieldError } from 'react-hook-form';
import { format } from 'date-fns';

type CustomDatePickerProps = {
  placeholder: string,
  label?: string;
  value: Date | undefined;
  onChange: (date: Date) => void;
  error?: FieldError;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  placeholder,
  label,
  value,
  onChange,
  error,
}) => {
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
        className="h-14 px-4 justify-center rounded-lg bg-white dark:bg-gray-800"
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