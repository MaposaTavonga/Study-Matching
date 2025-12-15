import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function TutorBottomNavBar({ activeTab, onTabPress, navigation }) {
const tabs = [
  { name: 'Home', route: 'TutHome', icon: 'home-outline', activeIcon: 'home' },
  { name: 'Students', route: 'tutStudents', icon: 'people-outline', activeIcon: 'people' },
  { name: 'Groups', route: 'TutGroups', icon: 'layers-outline', activeIcon: 'layers' },
  { name: 'Profile', route: 'TutProfile', icon: 'person-outline', activeIcon: 'person' },
];
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: 70, justifyContent: 'space-around', alignItems: 'center' }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={{ alignItems: 'center', flex: 1 }}
            onPress={() => {
              onTabPress(tab.name);
              navigation.navigate(tab.route); // <-- React Navigation
            }}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? '#4A56E2' : '#9CA3AF'}
            />
            <Text style={{ fontSize: 12, color: isActive ? '#4A56E2' : '#6B7280', fontWeight: isActive ? '700' : '500', marginTop: 2 }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
