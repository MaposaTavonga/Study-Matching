import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TutorGroupsScreen() {
  const navigation = useNavigation();

  // Dummy tutor groups data
  const groups = [
    {
      id: 1,
      name: 'Calculus I – Exam Prep',
      module: 'MAT101',
      members: 8,
      nextSession: 'Tomorrow, 16:00',
      duration: '2 hrs',
      level: 'Beginner',
      color: '#6366F1',
    },
    {
      id: 2,
      name: 'Physics Mechanics Intensive',
      module: 'PHYS101',
      members: 5,
      nextSession: 'Fri, 14:00',
      duration: '1.5 hrs',
      level: 'Intermediate',
      color: '#22C55E',
    },
    {
      id: 3,
      name: 'Organic Chemistry Crash Course',
      module: 'CHEM101',
      members: 10,
      nextSession: 'Mon, 10:00',
      duration: '2 hrs',
      level: 'Advanced',
      color: '#F59E0B',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#4F46E5',
          paddingVertical: 18,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Text style={{ color: '#E0E7FF', fontSize: 14 }}>
          Your Groups
        </Text>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
          Study Groups You Manage
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {groups.map((group) => (
          <View
            key={group.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            {/* Header Row */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: group.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                  {group.module.charAt(0)}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#1F2937',
                  }}
                >
                  {group.name}
                </Text>
                <Text style={{ fontSize: 13, color: '#6B7280' }}>
                  {group.module} • {group.level}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#EEF2FF',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color: '#4F46E5',
                  }}
                >
                  GROUP
                </Text>
              </View>
            </View>

            {/* Group Info */}
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 13, color: '#6B7280' }}>
                👥 {group.members} students
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
                📅 Next: {group.nextSession}
              </Text>
              <Text style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>
                ⏱️ Duration: {group.duration}
              </Text>
            </View>

            {/* Actions */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 16,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: '#4F46E5',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  flex: 1,
                  marginRight: 8,
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('GroupDetails', {
                    groupId: group.id,
                  })
                }
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                >
                  Open Group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#F1F5F9',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  flex: 1,
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('GroupChat', {
                    groupId: group.id,
                  })
                }
              >
                <Text
                  style={{
                    color: '#4F46E5',
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
