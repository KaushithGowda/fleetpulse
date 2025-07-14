import React from 'react';
import { useAuthStore } from '@/src/store/useAuthStore';
import { useColorScheme } from 'nativewind';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from '@/src/constants/colors';

import BottomTabs from '@/src/navigation/BottomTabs';
import AuthStack from '@/src/navigation/AuthStack';
import DriverForm from '@/src/screens/Driver/DriverForm';
import CompanyForm from '@/src/screens/Company/CompanyForm';
import DriverList from '@/src/screens/Driver/DriverList';
import CompanyList from '@/src/screens/Company/CompanyList';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colorScheme } = useColorScheme();
  const { user, hasHydrated } = useAuthStore();
  if (!hasHydrated) return null;

  if (!user) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator screenOptions={() => ({
      headerStyle: {
        backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray300 : COLORS.backgroundSlate800,
        shadowOpacity: 0,
      }
    })}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerTitle: '', headerBackTitle: 'Back', headerShown:false }}
      />
      <Stack.Screen
        name="DriverList"
        component={DriverList}
      />
      <Stack.Screen
        name="DriverForm"
        component={DriverForm}
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
      <Stack.Screen
        name="CompanyList"
        component={CompanyList}
      />
      <Stack.Screen
        name="CompanyForm"
        component={CompanyForm}
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
