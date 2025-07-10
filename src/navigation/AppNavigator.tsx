import React from 'react';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import { useAuthStore } from '@/src/store/useAuthStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DriverForm from '@/src/screens/Driver/DriverForm';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, hasHydrated } = useAuthStore();
  if (!hasHydrated) return null;

  if (user) {
    return <AuthStack />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerTitle: '', headerBackTitle: 'Back' }}
      />
      <Stack.Screen
        name="DriverForm"
        component={DriverForm}
        options={{ headerBackTitle: 'Back', headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
