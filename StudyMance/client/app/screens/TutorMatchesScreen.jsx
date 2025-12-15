import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TutorMatchesScreen() {
  const navigation = useNavigation();

  // Dummy matched students data
  const matches = [
    {
      id: 1,
      name: 'Sarah M',
      module: 'MAT101 – Calculus I',
      lastMessage: 'Thanks! See you tomorrow.',
      matchedOn: '2 days ago',
      avatarColor: '#6366F1',
      status: 'active',
    },
    {
      id: 2,
      name: 'John D',
      module: 'PHYS101 – Mechanics',
      lastMessage: 'Can we reschedule?',
      matchedOn: '1 week ago',
      avatarColor: '#22C55E',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Alex T',
      module: 'CHEM101 – Organic Chemistry',
      lastMessage: 'Session was great!',
      matchedOn: '3 weeks ago',
      avatarColor: '#F59E0B',
      status: 'active',
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
          Your Matches
        </Text>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700' }}>
          Students You Tutor
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {matches.map((student) => (
          <View
            key={student.id}
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
            {/* Top Row */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Avatar */}
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: student.avatarColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
                  {student.name.charAt(0)}
                </Text>
              </View>

              {/* Info */}
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#1F2937' }}>
                  {student.name}
                </Text>
                <Text style={{ fontSize: 13, color: '#6B7280' }}>
                  {student.module}
                </Text>
              </View>

              {/* Status */}
              <View
                style={{
                  backgroundColor:
                    student.status === 'active' ? '#ECFDF5' : '#FEF3C7',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '600',
                    color:
                      student.status === 'active' ? '#16A34A' : '#D97706',
                  }}
                >
                  {student.status.toUpperCase()}
                </Text>
              </View>
            </View>

            {/* Last message */}
            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                color: '#374151',
              }}
              numberOfLines={1}
            >
              💬 {student.lastMessage}
            </Text>

            {/* Footer */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 14,
              }}
            >
              <Text style={{ fontSize: 12, color: '#9CA3AF' }}>
                Matched {student.matchedOn}
              </Text>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#EEF2FF',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('Chat', { userId: student.id })
                  }
                >
                  <Text
                    style={{
                      color: '#4F46E5',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Chat
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#4F46E5',
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    navigation.navigate('StudentProfile', {
                      studentId: student.id,
                    })
                  }
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: '600',
                    }}
                  >
                    Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
