import React from 'react';
import BottomTabs from '@/src/navigation/BottomTabs';
import AuthStack from '@/src/navigation/AuthStack';
import { useAuthStore } from '@/src/store/useAuthStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverForm from '@/src/screens/Driver/DriverForm';
import CompanyForm from '@/src/screens/Company/CompanyForm';
import DriverList from '@/src/screens/Driver/DriverList';
import CompanyList from '@/src/screens/Company/CompanyList';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, hasHydrated } = useAuthStore();
  if (!hasHydrated) return null;

  if (user) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
      />
      <Stack.Screen
        name="DriverList"
        component={DriverList}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DriverForm"
        component={DriverForm}
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
      <Stack.Screen
        name="CompanyList"
        component={CompanyList}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompanyForm"
        component={CompanyForm}
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
