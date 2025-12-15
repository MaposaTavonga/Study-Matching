import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  Switch,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample study partners data
const studyPartnersData = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      course: 'Computer Science',
      year: 3,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      grade: 'A-',
      studyStyle: 'Collaborative',
      strengths: ['Algorithms', 'Data Structures'],
      weaknesses: ['Networking']
    },
    matchDate: '2024-01-10T14:30:00',
    status: 'active', // active, paused, completed
    studySessions: [
      {
        id: '1',
        date: '2024-01-15T16:00:00',
        duration: 120,
        subject: 'Data Structures',
        rating: 5,
        notes: 'Great session on binary trees and graphs'
      },
      {
        id: '2',
        date: '2024-01-08T14:00:00',
        duration: 90,
        subject: 'Algorithms',
        rating: 4,
        notes: 'Worked on dynamic programming problems'
      }
    ],
    upcomingSessions: [
      {
        id: '1',
        date: '2024-01-22T15:00:00',
        duration: 120,
        subject: 'Algorithm Analysis'
      }
    ],
    availability: ['Mon 2-4 PM', 'Wed 10-12 PM', 'Fri 3-5 PM'],
    sharedSubjects: ['CS301', 'CS304', 'MATH202'],
    studyGoals: ['Exam prep', 'Project collaboration'],
    communication: {
      lastMessage: '2 hours ago',
      unread: 2,
      preferred: 'in-app' // in-app, whatsapp, discord
    },
    performance: {
      sessionsCompleted: 8,
      averageRating: 4.5,
      consistency: 85
    },
    notes: 'Very knowledgeable in algorithms, great at explaining complex concepts'
  },
  {
    id: '2',
    user: {
      name: 'Sarah Chen',
      course: 'Computer Science',
      year: 3,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      grade: 'B+',
      studyStyle: 'Structured',
      strengths: ['Database Systems', 'Web Development'],
      weaknesses: ['Operating Systems']
    },
    matchDate: '2024-01-05T09:15:00',
    status: 'active',
    studySessions: [
      {
        id: '1',
        date: '2024-01-12T13:00:00',
        duration: 90,
        subject: 'Database Design',
        rating: 5,
        notes: 'ER diagrams and normalization'
      }
    ],
    upcomingSessions: [
      {
        id: '1',
        date: '2024-01-19T14:00:00',
        duration: 120,
        subject: 'SQL Optimization'
      }
    ],
    availability: ['Tue 1-3 PM', 'Thu 9-11 AM'],
    sharedSubjects: ['CS301', 'CS305'],
    studyGoals: ['Weekly study sessions', 'Assignment help'],
    communication: {
      lastMessage: '1 day ago',
      unread: 0,
      preferred: 'whatsapp'
    },
    performance: {
      sessionsCompleted: 3,
      averageRating: 4.7,
      consistency: 90
    },
    notes: 'Excellent at database concepts, very organized study approach'
  },
  {
    id: '3',
    user: {
      name: 'Mike Rodriguez',
      course: 'Software Engineering',
      year: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      grade: 'A',
      studyStyle: 'Intensive',
      strengths: ['Software Design', 'Testing'],
      weaknesses: ['Theory']
    },
    matchDate: '2023-12-20T11:20:00',
    status: 'paused',
    studySessions: [
      {
        id: '1',
        date: '2023-12-28T10:00:00',
        duration: 180,
        subject: 'Software Architecture',
        rating: 5,
        notes: 'System design patterns and principles'
      },
      {
        id: '2',
        date: '2024-01-05T14:00:00',
        duration: 120,
        subject: 'Testing Strategies',
        rating: 4,
        notes: 'Unit testing and integration testing'
      }
    ],
    upcomingSessions: [],
    availability: ['Mon 10-12 PM', 'Wed 2-4 PM', 'Fri 1-3 PM'],
    sharedSubjects: ['CS304', 'SE301'],
    studyGoals: ['Project work', 'Code reviews'],
    communication: {
      lastMessage: '1 week ago',
      unread: 0,
      preferred: 'discord'
    },
    performance: {
      sessionsCompleted: 12,
      averageRating: 4.8,
      consistency: 95
    },
    notes: 'Paused until exams are over'
  },
  {
    id: '4',
    user: {
      name: 'Emily Davis',
      course: 'Computer Science',
      year: 2,
      image: 'https://images.unsplash.com/photo-1551836026-d5c88ac5d2d3?w=150&h=150&fit=crop&crop=face',
      grade: 'B',
      studyStyle: 'Flexible',
      strengths: ['Programming', 'Math'],
      weaknesses: ['Algorithms']
    },
    matchDate: '2023-11-15T16:45:00',
    status: 'completed',
    studySessions: [
      {
        id: '1',
        date: '2023-11-22T15:00:00',
        duration: 90,
        subject: 'Java Programming',
        rating: 4,
        notes: 'Object-oriented programming basics'
      },
      {
        id: '2',
        date: '2023-11-29T15:00:00',
        duration: 120,
        subject: 'Data Structures',
        rating: 5,
        notes: 'Linked lists and arrays'
      }
    ],
    upcomingSessions: [],
    availability: ['Tue 3-5 PM', 'Thu 11-1 PM'],
    sharedSubjects: ['CS201', 'MATH202'],
    studyGoals: ['Foundation building'],
    communication: {
      lastMessage: '2 weeks ago',
      unread: 0,
      preferred: 'in-app'
    },
    performance: {
      sessionsCompleted: 6,
      averageRating: 4.3,
      consistency: 75
    },
    notes: 'Completed course requirements, may reconnect next semester'
  }
];

const statusFilters = [
  { key: 'all', label: 'All Partners' },
  { key: 'active', label: 'Active' },
  { key: 'paused', label: 'Paused' },
  { key: 'completed', label: 'Completed' }
];

const subjectFilters = ['All Subjects', 'CS301', 'CS304', 'CS305', 'MATH202', 'SE301'];

export default function MatchesManagement() {
  const [partners, setPartners] = useState(studyPartnersData);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [sessionModalVisible, setSessionModalVisible] = useState(false);
  const [notesModalVisible, setNotesModalVisible] = useState(false);

  const filteredPartners = partners.filter(partner => {
    const statusMatch = selectedStatus === 'all' || partner.status === selectedStatus;
    const subjectMatch = selectedSubject === 'All Subjects' || 
                        partner.sharedSubjects.includes(selectedSubject);
    const searchMatch = partner.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       partner.user.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       partner.sharedSubjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return statusMatch && subjectMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'paused': return '#F59E0B';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'checkmark-circle';
      case 'paused': return 'pause-circle';
      case 'completed': return 'trophy';
      default: return 'help';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  const handleStatusChange = (partnerId, newStatus) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const handleAddSession = (partnerId, sessionData) => {
    setPartners(prev => prev.map(partner => 
      partner.id === partnerId ? {
        ...partner,
        studySessions: [...partner.studySessions, sessionData],
        performance: {
          ...partner.performance,
          sessionsCompleted: partner.performance.sessionsCompleted + 1
        }
      } : partner
    ));
    setSessionModalVisible(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const renderPartnerCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.partnerCard}
      onPress={() => {
        setSelectedPartner(item);
        setDetailModalVisible(true);
      }}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.image }} style={styles.userImage} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.userCourse}>{item.user.course}, Year {item.user.year}</Text>
            <View style={styles.userMeta}>
              <Text style={styles.userGrade}>Grade: {item.user.grade}</Text>
              <Text style={styles.userStyle}>• {item.user.studyStyle}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Ionicons name={getStatusIcon(item.status)} size={14} color="#FFFFFF" />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
          {item.communication.unread > 0 && (
            <View style={styles.messageBadge}>
              <Ionicons name="chatbubble" size={12} color="#FFFFFF" />
              <Text style={styles.messageCount}>{item.communication.unread}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Performance Stats */}
      <View style={styles.performanceStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.performance.sessionsCompleted}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.performance.averageRating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{item.performance.consistency}%</Text>
          <Text style={styles.statLabel}>Consistency</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name={item.communication.preferred === 'whatsapp' ? 'logo-whatsapp' : 
                         item.communication.preferred === 'discord' ? 'logo-discord' : 'chatbubble'} 
                   size={20} color="#4A56E2" />
          <Text style={styles.statLabel}>Chat</Text>
        </View>
      </View>

      {/* Shared Subjects */}
      <View style={styles.subjectsContainer}>
        <Text style={styles.sectionLabel}>Shared Subjects:</Text>
        <View style={styles.subjectsList}>
          {item.sharedSubjects.map((subject, index) => (
            <View key={index} style={styles.subjectTag}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Next Session */}
      {item.upcomingSessions.length > 0 && (
        <View style={styles.nextSession}>
          <Ionicons name="calendar" size={14} color="#4A56E2" />
          <Text style={styles.nextSessionText}>
            Next: {formatDate(item.upcomingSessions[0].date)} • {item.upcomingSessions[0].subject}
          </Text>
        </View>
      )}

      {/* Last Activity */}
      <View style={styles.cardFooter}>
        <Text style={styles.lastActivity}>
          Matched {getTimeAgo(item.matchDate)} • Last message: {item.communication.lastMessage}
        </Text>
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={(e) => {
              e.stopPropagation();
              // Open chat
            }}
          >
            <Ionicons name="chatbubble" size={16} color="#4A56E2" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedPartner(item);
              setSessionModalVisible(true);
            }}
          >
            <Ionicons name="add-circle" size={16} color="#10B981" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickAction}
            onPress={(e) => {
              e.stopPropagation();
              setSelectedPartner(item);
              setNotesModalVisible(true);
            }}
          >
            <Ionicons name="pencil" size={16} color="#F59E0B" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Study Partners</Text>
          <Text style={styles.headerSubtitle}>Manage your learning connections</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search partners by name, course, or subject..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
          {statusFilters.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterChip,
                selectedStatus === key && styles.filterChipActive
              ]}
              onPress={() => setSelectedStatus(key)}
            >
              <Text style={[
                styles.filterChipText,
                selectedStatus === key && styles.filterChipTextActive
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectFilters}>
          {subjectFilters.map(subject => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectFilterChip,
                selectedSubject === subject && styles.subjectFilterChipActive
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text style={[
                styles.subjectFilterChipText,
                selectedSubject === subject && styles.subjectFilterChipTextActive
              ]}>
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Partners List */}
      <FlatList
        data={filteredPartners}
        renderItem={renderPartnerCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.partnersList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A56E2']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#CCC" />
            <Text style={styles.emptyStateTitle}>No study partners found</Text>
            <Text style={styles.emptyStateText}>
              {selectedStatus !== 'all' || selectedSubject !== 'All Subjects' || searchQuery
                ? 'Try adjusting your filters or search'
                : 'Start connecting with study partners to see them here'
              }
            </Text>
          </View>
        }
      />

      {/* Partner Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.detailModal]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Partner Details</Text>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            {selectedPartner && (
              <ScrollView style={styles.detailContent}>
                {/* Detailed partner information would go here */}
                <Text style={styles.detailText}>Detailed view for {selectedPartner.user.name}</Text>
                {/* Add more detailed information as needed */}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Session Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sessionModalVisible}
        onRequestClose={() => setSessionModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="add-circle" size={48} color="#4A56E2" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Log Study Session</Text>
            <Text style={styles.modalText}>
              Add a study session with {selectedPartner?.user.name}
            </Text>
            {/* Session form would go here */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => setSessionModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirm]}
                onPress={() => {
                  // Handle session addition
                  setSessionModalVisible(false);
                }}
              >
                <Text style={styles.modalConfirmText}>Add Session</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Notes Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => setNotesModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="pencil" size={48} color="#F59E0B" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Edit Notes</Text>
            <Text style={styles.modalText}>
              Update your notes for {selectedPartner?.user.name}
            </Text>
            {/* Notes editor would go here */}
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => setNotesModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirm]}
                onPress={() => {
                  // Handle notes update
                  setNotesModalVisible(false);
                }}
              >
                <Text style={styles.modalConfirmText}>Save Notes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  statusFilters: {
    paddingLeft: 20,
    marginBottom: 8,
  },
  subjectFilters: {
    paddingLeft: 20,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterChipActive: {
    backgroundColor: '#4A56E2',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  subjectFilterChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  subjectFilterChipActive: {
    backgroundColor: '#4A56E2',
  },
  subjectFilterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  subjectFilterChipTextActive: {
    color: '#FFFFFF',
  },
  partnersList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  userCourse: {
    fontSize: 14,
    color: '#4A56E2',
    fontWeight: '600',
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userGrade: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  userStyle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  messageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  messageCount: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  performanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
  subjectsContainer: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  subjectsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subjectTag: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  nextSession: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
    gap: 6,
  },
  nextSessionText: {
    fontSize: 12,
    color: '#4A56E2',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastActivity: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  detailModal: {
    maxHeight: '80%',
    padding: 0,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    width: '100%',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalCancel: {
    backgroundColor: '#F1F5F9',
  },
  modalConfirm: {
    backgroundColor: '#4A56E2',
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailContent: {
    padding: 24,
    paddingTop: 0,
  },
  detailText: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
  },
});