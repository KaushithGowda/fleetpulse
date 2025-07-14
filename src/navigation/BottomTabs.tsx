/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompanyList from '@/src/screens/Company/CompanyList';
import DriverList from '@/src/screens/Driver/DriverList';
import Home from '@/src/screens/Home';
import Settings from '@/src/screens/Settings';
import { useColorScheme } from 'nativewind';
import { CustomButton } from '../components/FormElements/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({
  iconName,
  focused,
  size,
  color,
}: {
  iconName: string;
  focused: boolean;
  size: number;
  color: string;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.7,
      useNativeDriver: true,
    }).start();
  }, [focused, scale]);

  return (
    <Animated.View
      className={'items-center'}
      style={{ transform: [{ scale }] }}
    >
      <Icon name={iconName} size={size} color={color} />
    </Animated.View>
  );
};

function getTabBarIcon(routeName: string) {
  return ({
    color,
    size,
    focused,
  }: {
    color: string;
    size: number;
    focused: boolean;
  }) => {
    let iconName = 'home';

    if (routeName === 'CompanyTab') iconName = 'building-o';
    else if (routeName === 'DriverTab') iconName = 'truck';
    else if (routeName === 'HomeTab') iconName = 'home';
    else if (routeName === 'SettingsTab') iconName = 'cog';

    return (
      <TabIcon
        iconName={iconName}
        size={size}
        color={color}
        focused={focused}
      />
    );
  };
}

export default function BottomTabs() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: colorScheme === 'dark' ? COLORS.textGray100 : COLORS.backgroundSlate900,
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: true,
        headerTitleAlign: 'left',
        headerRightContainerStyle: { paddingRight: 18 },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
          color: colorScheme === 'dark' ? COLORS.textGray100 : COLORS.backgroundSlate900,
        },
        headerStyle: {
          backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray300 : COLORS.backgroundSlate800,
          shadowOpacity: 0,
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'light' ? COLORS.backgroundGray300 : COLORS.backgroundSlate800,
          borderTopColor: colorScheme === 'light' ? COLORS.textGray200 : COLORS.backgroundSlate800,
          position: 'absolute',
          height: 70,
          paddingTop: 5,
          paddingHorizontal: 10,
          zIndex: 10,
          borderWidth: 0,
        },
        animation: 'fade',
        freezeOnBlur: true,
        tabBarPosition: 'bottom',
      })}
    >
      <Tab.Screen name="HomeTab" options={{title:'Home'}} component={Home} />
      <Tab.Screen name="CompanyTab" component={CompanyList} options={{
        title:'Companies',
        headerRight: () => (
          <CustomButton
            onPress={() => navigation.navigate('CompanyForm')}
            rightIconName="plus"
            className='bg-green-500 px-3'
          />
        ),
      }} />
      <Tab.Screen name="DriverTab" component={DriverList} options={{
        title:'Drivers',
        headerRight: () => (
          <CustomButton
            onPress={() => navigation.navigate('DriverForm')}
            rightIconName="plus"
            className='bg-blue-500 px-3'
          />
        ),
      }} />
      <Tab.Screen name="SettingsTab" options={{title:'Settings'}} component={Settings} />
    </Tab.Navigator>
  );
}
