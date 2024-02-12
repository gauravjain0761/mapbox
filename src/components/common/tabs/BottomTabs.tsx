import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../../home/HomeScreen';
import InsightScreen from '../../insight/InsightScreen';
import NoteScreen from '../../notes/NoteScreen';
import ProfileScreen from '../../profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoteEditScreen from '../../notes/NoteEditScreen';


export function NotesRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator
        initialRouteName="NoteScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="NoteScreen" component={NoteScreen} />
        <Stack.Screen name="NoteEditScreen" component={NoteEditScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function TabScreen() {
  const Tab = createBottomTabNavigator();
  // const tabDetails:any =[
  // ]
  return (
    <Tab.Navigator
      initialRouteName={'Stack'}
      // tabBarOptions={{
      //   activeTintColor: 'blue',
      //   inactiveTintColor: 'gray',
      //   labelStyle: {fontSize: 10, fontFamily: 'Poppins-Regular'},
      // }}
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: '#EE82EE',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={30} color={color} />
          ),
        }}
        name="Stack"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="description" size={30} color={color} />
          ),
        }}
        name="TabSchool"
        component={NotesRoutes}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: ({color}) => (
            <Entypo name="shop" color={color} size={26} />
          ),
        }}
        name="TabClasses"
        component={InsightScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="person-circle" color={color} size={26} />
          ),
        }}
        name="TabBooks"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
