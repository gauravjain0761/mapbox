import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SignIn from './SignIn';
import Register from './Register';
import SplashScreen from '../splash/SplashScreen';
import FirstScreen from '../registerScreens/FirstScreen';

export default function PublicRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="FirstScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </>
  );
}
