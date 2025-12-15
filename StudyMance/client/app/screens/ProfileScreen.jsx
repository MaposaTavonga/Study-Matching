
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import AvatarPlaceholder from '../../assets/images/icon.png';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
     const [activeTab, setActiveTab] = useState('Account');
  return (
    <ScrollView style={s.container} showsVerticalScrollIndicator={false}>
      {/* Header with Back Button */}
      <View style={s.header}>
        <TouchableOpacity 
          style={s.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#4A56E2" />
        </TouchableOpacity>
        <Text style={s.title}>My Profile</Text>
        <View style={s.headerRight} />
      </View>

      {/* Profile Avatar with Badge */}
      <View style={s.avatarContainer}>
        <View style={s.avatarWrapper}>
          <Image source={AvatarPlaceholder} style={s.avatar} />
          <View style={s.onlineIndicator} />
        </View>
        <Text style={s.name}>Sarah Mokoena</Text>
        <Text style={s.studentId}>Student #2023123456</Text>
        <View style={s.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={s.ratingText}>4.9 • Computer Science</Text>
        </View>
      </View>

      {/* Quick Stats - Progress Focus */}
      <View style={s.statsContainer}>
        <View style={s.statItem}>
          <Text style={s.statNumber}>42</Text>
          <Text style={s.statLabel}>Sessions</Text>
        </View>
        <View style={s.statDivider} />
        <View style={s.statItem}>
          <Text style={s.statNumber}>15</Text>
          <Text style={s.statLabel}>Modules</Text>
        </View>
        <View style={s.statDivider} />
        <View style={s.statItem}>
          <Text style={s.statNumber}>8</Text>
          <Text style={s.statLabel }>Tests Completed</Text>
        </View>
      </View>

      {/* Profile Info Card */}
      <View style={s.card}>
        <View style={s.cardHeader}>
          <Ionicons name="person-circle" size={20} color="#4A56E2" />
          <Text style={s.cardTitle}>Personal Information</Text>
        </View>
        
        <View style={s.row}>
          <View style={s.labelContainer}>
            <Ionicons name="school" size={16} color="#6B7280" />
            <Text style={s.label}>University</Text>
          </View>
          <Text style={s.value}>University of Johannesburg</Text>
        </View>

        <View style={s.divider} />

        <View style={s.row}>
          <View style={s.labelContainer}>
            <Ionicons name="mail" size={16} color="#6B7280" />
            <Text style={s.label}>Email</Text>
          </View>
          <Text style={s.value}>sarah@uj.ac.za</Text>
        </View>

        <View style={s.divider} />

        <View style={s.row}>
          <View style={s.labelContainer}>
            <Ionicons name="book" size={16} color="#6B7280" />
            <Text style={s.label}>Course</Text>
          </View>
          <Text style={s.value}>BSc Computer Science, Year 3</Text>
        </View>

        <View style={s.divider} />

        <View style={s.row}>
          <View style={s.labelContainer}>
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text style={s.label}>Member Since</Text>
          </View>
          <Text style={s.value}>January 2023</Text>
        </View>
      </View>

      {/* Progress Overview Card */}
      <View style={s.card}>
        <View style={s.cardHeader}>
          <Ionicons name="trending-up" size={20} color="#10B981" />
          <Text style={s.cardTitle}>Progress Overview</Text>
        </View>
        
        <View style={s.progressOverview}>
          <View style={s.progressCircle}>
            <Text style={s.progressPercent}>53%</Text>
            <Text style={s.progressSubtitle}>Overall</Text>
          </View>
          
          <View style={s.progressBreakdown}>
            <View style={s.breakdownItem}>
              <View style={s.breakdownLeft}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={s.breakdownLabel}>Completed</Text>
              </View>
              <Text style={s.breakdownValue}>8/15</Text>
            </View>
            
            <View style={s.breakdownItem}>
              <View style={s.breakdownLeft}>
                <Ionicons name="play-circle" size={16} color="#4A56E2" />
                <Text style={s.breakdownLabel}>In Progress</Text>
              </View>
              <Text style={s.breakdownValue}>5/15</Text>
            </View>
            
            <View style={s.breakdownItem}>
              <View style={s.breakdownLeft}>
                <Ionicons name="time" size={16} color="#6B7280" />
                <Text style={s.breakdownLabel}>Upcoming</Text>
              </View>
              <Text style={s.breakdownValue}>2/15</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Recent Progress Section */}
     {/*
     
     <View style={s.achievementsCard}>
        <View style={s.cardHeader}>
          <Ionicons name="rocket" size={20} color="#FF6B35" />
          <Text style={s.cardTitle}>Recent Progress</Text>
        </View>
        <View style={s.achievementsContainer}>
          <View style={s.achievementItem}>
            <View style={[s.achievementIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="checkmark-done" size={20} color="#1976D2" />
            </View>
            <Text style={s.achievementText}>Data Structures{'\n'}Completed</Text>
          </View>
          <View style={s.achievementItem}>
            <View style={[s.achievementIcon, { backgroundColor: '#F0F9FF' }]}>
              <Ionicons name="trending-up" size={20} color="#0369A1" />
            </View>
            <Text style={s.achievementText}>5 Modules{'\n'}In Progress</Text>
          </View>
        </View>
      </View>
     */} 
     {/* Strengths & Weaknesses Card */}
<View style={s.card}>
  <View style={s.cardHeader}>
    <Ionicons name="bar-chart" size={20} color="#F59E0B" />
    <Text style={s.cardTitle}>Strengths & Weaknesses</Text>
  </View>

  {/* Strengths */}
  <View style={s.section}>
    <Text style={s.sectionTitle}>Strengths</Text>
    <View style={s.tagsContainer}>
      <Text style={[s.tag, s.strengthTag]}>Data Structures</Text>
      <Text style={[s.tag, s.strengthTag]}>Algorithms</Text>
      <Text style={[s.tag, s.strengthTag]}>Databases</Text>
    </View>
  </View>

  {/* Weaknesses */}
  <View style={s.section}>
    <Text style={s.sectionTitle}>Weaknesses</Text>
    <View style={s.tagsContainer}>
      <Text style={[s.tag, s.weaknessTag]}>Operating Systems</Text>
      <Text style={[s.tag, s.weaknessTag]}>Networking</Text>
    </View>
  </View>
</View>


        {/* Action Buttons */}
      <View style={s.actionsContainer}>
        <TouchableOpacity style={[s.actionButton, s.primaryButton]}>
          <Ionicons name="create" size={20} color="#FFFFFF" />
          <Text style={s.primaryButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[s.actionButton, s.secondaryButton]}>
          <Ionicons name="settings" size={20} color="#4A56E2" />
          <Text style={s.secondaryButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 60,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  headerRight: {
    width: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0369A1',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A56E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F1F5F9',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
    flex: 1,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#4A56E2',
  },
  secondaryButton: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#4A56E2',
    fontWeight: '700',
    fontSize: 16,
  },
  achievementsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  achievementsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  // New Progress Styles
  progressOverview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  progressCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 8,
    borderColor: '#4A56E2',
  },
  progressPercent: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4A56E2',
  },
  progressSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  progressBreakdown: {
    flex: 1,
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  section: {
  marginBottom: 16,
},
sectionTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1E293B',
  marginBottom: 8,
},
tagsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 8,
},
tag: {
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 12,
  fontSize: 12,
  fontWeight: '600',
  color: '#111827',
},
strengthTag: {
  backgroundColor: '#D1FAE5',
  color: '#065F46',
},
weaknessTag: {
  backgroundColor: '#FEE2E2',
  color: '#B91C1C',
},

});