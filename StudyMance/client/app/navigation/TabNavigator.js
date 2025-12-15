// navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
  
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>

      <Tab.Screen name="Home" component={LandingScreen} />
      {/* You can add more tabs here later */}
    </Tab.Navigator>
  );
}
