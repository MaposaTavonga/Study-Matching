import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TutorProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            backgroundColor: '#4F46E5',
            paddingTop: 60,
            paddingBottom: 24,
            paddingHorizontal: 20,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={26} color="#fff" />
            </TouchableOpacity>

            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>
              Tutor Profile
            </Text>

            <TouchableOpacity>
              <Ionicons name="settings-outline" size={22} color="#E0E7FF" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#3730A3',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 4,
                borderColor: '#fff',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 36, fontWeight: '800' }}>
                EC
              </Text>
            </View>

            <Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: '800',
                marginTop: 12,
              }}
            >
              Dr. Emily Carter
            </Text>

            <Text style={{ color: '#E0E7FF', fontSize: 14, marginTop: 4 }}>
              Mathematics & Physics Tutor
            </Text>

            {/* Rating */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                backgroundColor: 'rgba(255,255,255,0.15)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
              }}
            >
              <Ionicons name="star" size={16} color="#FACC15" />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  marginLeft: 6,
                }}
              >
                4.9 (128 reviews)
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            marginHorizontal: 20,
            marginTop: -20,
            borderRadius: 20,
            paddingVertical: 20,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {[
            { label: 'Students', value: '42' },
            { label: 'Sessions', value: '186' },
            { label: 'Groups', value: '6' },
          ].map((item, index) => (
            <View key={index} style={{ flex: 1, alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: '#4F46E5',
                }}
              >
                {item.value}
              </Text>
              <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Info Cards */}
        <View style={{ padding: 20 }}>
          {/* About */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: 8,
              }}
            >
              About
            </Text>
            <Text style={{ color: '#4B5563', lineHeight: 20 }}>
              Passionate tutor with 8+ years of experience helping university
              students excel in Mathematics and Physics. Specializes in exam
              preparation and concept mastery.
            </Text>
          </View>

          {/* Subjects */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: 12,
              }}
            >
              Subjects Taught
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {['MAT101', 'MAT201', 'PHYS101', 'PHYS201'].map((subj) => (
                <View
                  key={subj}
                  style={{
                    backgroundColor: '#EEF2FF',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: '#4F46E5',
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {subj}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Availability */}
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: 12,
              }}
            >
              Availability
            </Text>

            <Text style={{ color: '#4B5563' }}>
              Mon – Fri • 09:00 – 18:00
            </Text>
          </View>

          {/* Actions */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#4F46E5',
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('EditTutorProfile')}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#F1F5F9',
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('TutorSettings')}
            >
              <Text style={{ color: '#4F46E5', fontWeight: '700' }}>
                Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
