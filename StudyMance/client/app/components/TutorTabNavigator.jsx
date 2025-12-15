import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TutorLandingScreen from '../screens/TutorLandingScreen';
import TutorMatchesScreen from '../screens/TutorMatchesScreen';
import TutorGroupsScreen from '../screens/TutorGroupsScreen';
import TutorProfileScreen from '../screens/TutorProfileScreen';

const Tab = createBottomTabNavigator();

export default function TutorTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={TutorLandingScreen} />
      <Tab.Screen name="Students" component={TutorMatchesScreen} />
      <Tab.Screen name="Groups" component={TutorGroupsScreen} />
      <Tab.Screen name="Profile" component={TutorProfileScreen} />
    </Tab.Navigator>
  );
}
