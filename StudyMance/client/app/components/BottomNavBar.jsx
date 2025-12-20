import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar({ activeTab, onTabPress }) {
    const navigation = useNavigation();
  const tabs = [
    { name: 'Home', icon: 'home-outline', activeIcon: 'home' },
    { name: 'Matches', icon: 'heart-outline', activeIcon: 'heart' },
    { name: 'Groups', icon: 'people-outline', activeIcon: 'people' },
    { name: 'Tutors', icon: 'school-outline', activeIcon: 'school' },
    { name: 'Profile', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingVertical: 6,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      {tabs.map((tab) => {
        const isActive = tab.name === activeTab;
        return (
          <TouchableOpacity
            key={tab.name}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: 2,
            }}
            onPress={() => {
              onTabPress(tab.name);
              navigation.navigate(tab.name); 
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={22}
              color={isActive ? '#4A56E2' : '#9CA3AF'}
            />
            <Text
              style={{
                fontSize: 12,
                color: isActive ? '#4A56E2' : '#6B7280',
                fontWeight: isActive ? '700' : '500',
                marginTop: 2,
              }}
            >
              {tab.name}
            </Text>

            {/* small underline indicator */}
            <View
              style={{
                height: 2,
                width: 20,
                backgroundColor: isActive ? '#4A56E2' : 'transparent',
                borderRadius: 1,
                marginTop: 3,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
