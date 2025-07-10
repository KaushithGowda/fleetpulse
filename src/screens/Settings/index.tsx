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
import { COLORS } from '@/src/constants/colors';

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
      className="flex-1 px-4 pt-5"
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: colorScheme === 'dark' ? COLORS.backgroundSlate800 : COLORS.backgroundGray300
      }}
    >
      <TouchableOpacity className="flex-row items-center justify-between mb-5 p-4 rounded-xl" style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700}}>
        <View className="flex-row items-center gap-4">
          <Image
            source={require('@/src/assets/icon.png')}
            className="w-20 h-20 rounded-full border"
            resizeMode="cover"
          />
          <View className="flex flex-col">
            <View className="flex-row items-center gap-1">
              <Text className="text-lg font-bold text-slate-900 dark:text-gray-100 capitalize">
                {'Username'}
              </Text>
              <MaterialIcons name="verified" size={18} color={COLORS.textBlue500} />
            </View>
            <Text className="text-xs text-slate-500 dark:text-slate-400">
              {user?.email || 'user@email.com'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View className="mt-2 gap-y-3">
        <View style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700}} className="flex-row justify-between items-center p-4 rounded-md">
          <Text className="text-sm font-bold text-black dark:text-white">Theme</Text>
          <Switch
            value={colorScheme === 'dark'}
            onValueChange={value => setColorScheme(value ? 'dark' : 'light')}
          />
        </View>

        <TouchableOpacity
          onPress={handleLogout}
           style={{ backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray100 : COLORS.backgroundSlate700}}
          className="flex-row justify-between items-center p-5 rounded-md"
        >
          <Text className="text-sm font-bold" style={{color: COLORS.textRed600}}>Logout</Text>
          <MaterialIcons name="logout" size={25} color={COLORS.textRed600} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
