import React from 'react';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function AppNavigator() {
  const { user, hasHydrated } = useAuthStore();

  return hasHydrated ? user ? <AuthStack /> : <BottomTabs /> : null;
}
