import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/lib/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Provider } from './src/providers';
import { useEffect } from 'react';

function App() {
  const { colorScheme } = useColorScheme();
  useEffect(() => {
    const prepare = async () => {
      try {
        // ⏳ Call your async APIs here
        // await Promise.all([
        //   fetchDrivers(),
        //   fetchCompanies(),
        //   fetchUserSettings(),
        // ]);
        // setTimeout(()=>{},5000)
      } catch (e) {
        console.warn('Error during splash API calls', e);
      } finally {
        RNBootSplash.hide({ fade: true });
      }
    };

    prepare();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider>
        <StatusBar
          barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
          translucent
        />
        <NavigationContainer
          ref={navigationRef}
          onReady={() => RNBootSplash.hide({ fade: true })}
        >
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
