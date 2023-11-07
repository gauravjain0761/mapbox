import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import TabScreen from '../common/tabs/BottomTabs';
import { dataStore } from '../globalState/store';
import PublicRoutes from '../publicScreens/PublicRoutes';
import SplashScreen from '../splash/SplashScreen';
import auth from "@react-native-firebase/auth";

export default function AllStack() {
  const Stack = createNativeStackNavigator();
  const isLoggedIn = dataStore.useState(s => s.isLoggedIn);

  // const [lsuItem, setLsuItem] = React.useState<any>('');
  // async function retrieveData() {
  //   try {
  //     const value = await AsyncStorage.getItem('key');
  //     if (value !== null) {
  //       console.log('Retrieved data:', value);
  //       setLsuItem(value);
  //     } else {
  //       console.log('No data found.');
  //     }
  //   } catch (error) {
  //     console.log('Error retrieving data:', error);
  //   }
  // }

  // React.useEffect(() => {
  //   retrieveData();
  // }, []);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  
  if (!user) return <PublicRoutes />;
  return (
    <>
      <Stack.Navigator
        initialRouteName="TabScreen"
        screenOptions={{ headerShown: false }}>
        {/* <Stack.Scrpeen name="SplashScreen" component={SplashScreen} /> */}
        <Stack.Screen name="TabScreen" component={TabScreen} />
      </Stack.Navigator>
    </>
  );
}
