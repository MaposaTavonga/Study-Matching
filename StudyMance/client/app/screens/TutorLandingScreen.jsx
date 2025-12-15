import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TutorBottomNavBar from '../components/TutorBottomNavBar';

export default function TutorLandingScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Home');

  // Enhanced dummy data
  const requests = [
    { 
      id: 1, 
      student: 'Sarah M', 
      module: 'MAT101 - Calculus I', 
      time: 'Wed, 4:00 PM', 
      avatarColor: '#FF6B6B',
      urgency: 'high'
    },
    { 
      id: 2, 
      student: 'John D', 
      module: 'PHYS101 - Mechanics', 
      time: 'Fri, 2:00 PM', 
      avatarColor: '#4ECDC4',
      urgency: 'medium'
    },
    { 
      id: 3, 
      student: 'Alex T', 
      module: 'CHEM101 - Organic Chemistry', 
      time: 'Today, 6:00 PM', 
      avatarColor: '#FFD166',
      urgency: 'high'
    },
  ];

  const upcomingSessions = [
    { 
      id: 1, 
      module: 'MAT101 - Calculus I', 
      date: 'Mon, 3:00 PM', 
      students: 5,
      duration: '2 hours',
      type: 'Group Session'
    },
    { 
      id: 2, 
      module: 'PHYS101 - Mechanics', 
      date: 'Thu, 1:00 PM', 
      students: 3,
      duration: '1.5 hours',
      type: 'One-on-One'
    },
    { 
      id: 3, 
      module: 'MAT201 - Calculus II', 
      date: 'Tomorrow, 10:00 AM', 
      students: 8,
      duration: '2 hours',
      type: 'Group Session'
    },
  ];

  const quickStats = {
    totalStudents: 42,
    sessionsThisWeek: 8,
    pendingRequests: 3,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />

      {/* Enhanced Header */}
      <View
        style={{
          backgroundColor: '#4F46E5',
          paddingHorizontal: 20,
          paddingVertical: 18,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: '#E0E7FF', fontSize: 14, fontWeight: '500' }}>Welcome back,</Text>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '700', marginTop: 2 }}>
              Dr. Emily Carter
            </Text>
            <Text style={{ color: '#E0E7FF', fontSize: 13, fontWeight: '400', marginTop: 4 }}>
              Mathematics & Physics Tutor
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#3730A3',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#818CF8',
            }}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 18 }}>EC</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          marginTop: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 16,
          padding: 16,
        }}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>{quickStats.totalStudents}</Text>
            <Text style={{ color: '#E0E7FF', fontSize: 12, marginTop: 4 }}>Students</Text>
          </View>
          <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>{quickStats.sessionsThisWeek}</Text>
            <Text style={{ color: '#E0E7FF', fontSize: 12, marginTop: 4 }}>This Week</Text>
          </View>
          <View style={{ height: '100%', width: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: '700' }}>{quickStats.pendingRequests}</Text>
            <Text style={{ color: '#E0E7FF', fontSize: 12, marginTop: 4 }}>Pending</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }} showsVerticalScrollIndicator={false}>
        {/* Quick Actions - Improved */}
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 }}>
          Quick Actions
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          gap: 12, 
          marginBottom: 24,
          flexWrap: 'wrap'
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              minWidth: '48%',
              backgroundColor: '#4F46E5',
              padding: 18,
              borderRadius: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 4,
            }}
            onPress={() => navigation.navigate('CreateSession')}
          >
            <View style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 18, 
              backgroundColor: 'rgba(255, 255, 255, 0.2)', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginRight: 10
            }}>
              <Text style={{ color: '#fff', fontSize: 18 }}>+</Text>
            </View>
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>
              New Session
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              minWidth: '48%',
              backgroundColor: '#fff',
              padding: 18,
              borderRadius: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#E5E7EB',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
            onPress={() => navigation.navigate('Availability')}
          >
            <View style={{ 
              width: 36, 
              height: 36, 
              borderRadius: 18, 
              backgroundColor: '#EEF2FF', 
              justifyContent: 'center', 
              alignItems: 'center',
              marginRight: 10
            }}>
              <Text style={{ color: '#4F46E5', fontSize: 18 }}>📅</Text>
            </View>
            <Text style={{ color: '#4F46E5', fontWeight: '600', fontSize: 15 }}>
              Set Availability
            </Text>
          </TouchableOpacity>
        </View>

        {/* Student Requests Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937' }}>
              Student Requests
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
              <Text style={{ color: '#4F46E5', fontWeight: '600', fontSize: 14 }}>View All</Text>
            </TouchableOpacity>
          </View>

          {requests.map((r) => (
            <View
              key={r.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                borderLeftWidth: 4,
                borderLeftColor: r.urgency === 'high' ? '#EF4444' : '#F59E0B',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 20, 
                  backgroundColor: r.avatarColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12
                }}>
                  <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                    {r.student.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 16, color: '#1F2937' }}>{r.student}</Text>
                  <Text style={{ color: '#6B7280', fontSize: 13 }}>{r.module}</Text>
                </View>
                {r.urgency === 'high' && (
                  <View style={{ 
                    backgroundColor: '#FEF2F2', 
                    paddingHorizontal: 8, 
                    paddingVertical: 4, 
                    borderRadius: 12 
                  }}>
                    <Text style={{ color: '#DC2626', fontSize: 11, fontWeight: '600' }}>URGENT</Text>
                  </View>
                )}
              </View>

              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: 8 
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color: '#6B7280', fontSize: 13, marginRight: 8 }}>⏰</Text>
                  <Text style={{ color: '#374151', fontSize: 14, fontWeight: '500' }}>{r.time}</Text>
                </View>
                
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#10B981',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 10,
                      minWidth: 80,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Accept</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      backgroundColor: '#F3F4F6',
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 10,
                      minWidth: 80,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: '600' }}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Upcoming Sessions */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937' }}>
              Upcoming Sessions
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Sessions')}>
              <Text style={{ color: '#4F46E5', fontWeight: '600', fontSize: 14 }}>View Calendar</Text>
            </TouchableOpacity>
          </View>

          {upcomingSessions.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
              onPress={() => navigation.navigate('SessionDetails', { sessionId: s.id })}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16, color: '#1F2937', marginRight: 8 }}>
                      {s.module}
                    </Text>
                    <View style={{ 
                      backgroundColor: s.type === 'Group Session' ? '#EEF2FF' : '#F0FDF4',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                    }}>
                      <Text style={{ 
                        color: s.type === 'Group Session' ? '#4F46E5' : '#16A34A',
                        fontSize: 11,
                        fontWeight: '600'
                      }}>
                        {s.type}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <Text style={{ color: '#6B7280', fontSize: 13, marginRight: 12 }}>
                      📅 {s.date}
                    </Text>
                    <Text style={{ color: '#6B7280', fontSize: 13 }}>
                      ⏱️ {s.duration}
                    </Text>
                  </View>
                  
                  <Text style={{ color: '#6B7280', fontSize: 13 }}>
                    👥 {s.students} students registered
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={{
                    backgroundColor: '#F8FAFC',
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#4F46E5', fontSize: 18 }}>→</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Links */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 12 }}>
            Quick Links
          </Text>
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 12,
            justifyContent: 'space-between'
          }}>
            {[
              { title: 'Resources', icon: '📚', route: 'Resources' },
              { title: 'Messages', icon: '💬', route: 'Messages', badge: 3 },
              { title: 'Reports', icon: '📊', route: 'Reports' },
              { title: 'Settings', icon: '⚙️', route: 'Settings' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: '48%',
                  backgroundColor: '#fff',
                  padding: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                }}
                onPress={() => navigation.navigate(item.route)}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</Text>
                <Text style={{ color: '#1F2937', fontWeight: '600', fontSize: 14 }}>
                  {item.title}
                </Text>
                {item.badge && (
                  <View style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    backgroundColor: '#EF4444',
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{item.badge}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

     <TutorBottomNavBar activeTab={activeTab} onTabPress={setActiveTab} navigation={navigation} />

    </SafeAreaView>
  );
}