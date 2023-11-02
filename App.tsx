import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AllStack from './src/components/stacks/AllStack';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'seashell'}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ThemeProvider>
            <AllStack />
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
