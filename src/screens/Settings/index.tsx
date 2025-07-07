import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  Image,
} from 'react-native';
import { useColorScheme } from 'nativewind';
import { useAuthStore } from '@/src/store/useAuthStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Settings = () => {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();
  const { colorScheme, setColorScheme } = useColorScheme();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: logout },
    ]);
  };

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="flex-1 px-4 pt-5 bg-gray-100 dark:bg-black"
    >
      <TouchableOpacity className="flex-row items-center justify-between mb-5 p-4 bg-white dark:bg-gray-900 rounded-xl">
        <View className="flex-row items-center gap-4">
          <Image
            source={require('@/src/assets/icon.png')}
            className="w-20 h-20 rounded-full border"
            resizeMode="cover"
          />
          <View className="flex flex-col">
            <View className="flex-row items-center gap-1">
              <Text className="text-lg font-bold text-black dark:text-white capitalize">
                {'Username'}
              </Text>
              <MaterialIcons name="verified" size={18} color="#3b82f6" />
            </View>
            <Text className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email || 'user@email.com'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="mt-2 gap-y-2">
        <View className="flex-row justify-between items-center p-4 rounded-md bg-white dark:bg-gray-900">
          <Text className="text-sm text-black dark:text-white">Theme</Text>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={value => setColorScheme(value ? 'dark' : 'light')}
            thumbColor={colorScheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row justify-between items-center p-5 rounded-md bg-white dark:bg-gray-900"
        >
          <Text className="text-sm text-red-600">Logout</Text>
          <MaterialIcons name="logout" size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
