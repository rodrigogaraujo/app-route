import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

import theme from './src/global/styles/theme';
import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
    </AppProvider>
  );
}
