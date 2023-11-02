import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TabScreen from '../common/tabs/BottomTabs';
import { dataStore } from '../globalState/store';
import PublicRoutes from '../publicScreens/PublicRoutes';
import SplashScreen from '../splash/SplashScreen';

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

  if (!isLoggedIn) return <PublicRoutes />;
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
