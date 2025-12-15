// navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Matches from '../screens/Matches';
import Groups from '../screens/Groups';
import Tutors from '../screens/Tutors';
import TutorManagement from '../screens/TutorManagement';
import MatchesManagement from '../screens/MatchesManagement';
import SelectUniversityScreen from '../screens/SelectUniversityScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Auth flow */}
        <Stack.Screen name="SelectUniversity" component={SelectUniversityScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} /> 
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Matches" component={Matches} />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="Tutors" component={Tutors} />
        <Stack.Screen name="TutorManagement" component={TutorManagement} /> 
        <Stack.Screen name="MatchesManagement" component={MatchesManagement} />


        
        
        {/* Main app */}
        <Stack.Screen name="Landing" component={TabNavigator} />
      </Stack.Navigator>

  );
}
