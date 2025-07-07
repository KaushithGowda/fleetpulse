import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompanyList from '@/src/screens/Company/CompanyList';
import DriverList from '@/src/screens/Driver/DriverList';
import Home from '@/src/screens/Home';
import Settings from '@/src/screens/Settings';
import { useColorScheme } from 'nativewind';

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

    if (routeName === 'Companies') iconName = 'building-o';
    else if (routeName === 'Drivers') iconName = 'truck';
    else if (routeName === 'Home') iconName = 'home';
    else if (routeName === 'Settings') iconName = 'cog';

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
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: getTabBarIcon(route.name),
          tabBarActiveTintColor: '#e91e63',
          headerShown: true,
          tabBarShowLabel: true,
          // eslint-disable-next-line react/no-unstable-nested-components
          headerRight: () => (
            <MaterialIcon
              name={colorScheme === 'dark' ? 'light-mode' : 'dark-mode'}
              size={20}
              color={'#000'}
              onPress={() => toggleColorScheme()}
            />
          ),
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#181719' : '#ffffff',
            position: 'absolute',
            height: 70,
            paddingTop: 15,
            paddingHorizontal: 10,
            borderColor: colorScheme === 'dark' ? '#181719' : '#ffffff',
          },
          animation: 'fade',
          freezeOnBlur: true,
          tabBarPosition: 'bottom',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Companies" component={CompanyList} />
        <Tab.Screen name="Drivers" component={DriverList} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  );
}
