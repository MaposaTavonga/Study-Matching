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
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample tutor requests data
const tutorRequestsData = [
  {
    id: '1',
    tutor: {
      name: 'Dr. Sarah Mokoena',
      subject: 'Computer Science',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      experience: '11 years',
      price: 45,
      responseTime: '2 hours'
    },
    status: 'pending', // pending, accepted, declined, completed, cancelled
    requestDate: '2024-01-10T14:30:00',
    proposedTimes: [
      'Mon Jan 15, 2:00 PM',
      'Wed Jan 17, 3:30 PM',
      'Fri Jan 19, 10:00 AM'
    ],
    message: 'I need help with algorithms and data structures for my upcoming exam. I struggle with dynamic programming concepts.',
    subjects: ['Algorithms', 'Data Structures'],
    duration: '60 minutes',
    frequency: 'Weekly',
    matchScore: 92,
    tutorResponse: null,
    isUrgent: true
  },
  {
    id: '2',
    tutor: {
      name: 'Prof. Alex Chen',
      subject: 'Computer Science',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      experience: '15 years',
      price: 60,
      responseTime: '1 hour'
    },
    status: 'accepted',
    requestDate: '2024-01-08T09:15:00',
    proposedTimes: [
      'Tue Jan 16, 4:00 PM'
    ],
    message: 'Looking for help with operating systems and networking concepts.',
    subjects: ['Operating Systems', 'Networking'],
    duration: '90 minutes',
    frequency: 'Bi-weekly',
    matchScore: 88,
    tutorResponse: 'I\'d be happy to help you with OS and networking! I have extensive experience in these areas. Tuesday at 4 PM works perfectly for me.',
    scheduledSession: '2024-01-16T16:00:00',
    sessionsCompleted: 0,
    isUrgent: false
  },
  {
    id: '3',
    tutor: {
      name: 'James Wilson',
      subject: 'Physics',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      experience: '12 years',
      price: 50,
      responseTime: '4 hours'
    },
    status: 'declined',
    requestDate: '2024-01-05T16:45:00',
    proposedTimes: [
      'Thu Jan 11, 2:00 PM'
    ],
    message: 'Need assistance with electromagnetism and quantum physics topics.',
    subjects: ['Electromagnetism', 'Quantum Physics'],
    duration: '120 minutes',
    frequency: 'Once',
    matchScore: 85,
    tutorResponse: 'Unfortunately, I\'m fully booked for the requested time and don\'t have availability for physics tutoring at the moment.',
    declineReason: 'Schedule conflict',
    isUrgent: false
  },
  {
    id: '4',
    tutor: {
      name: 'Maria Rodriguez',
      subject: 'Mathematics',
      image: 'https://images.unsplash.com/photo-1551836026-d5c88ac5d2d3?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      experience: '8 years',
      price: 35,
      responseTime: '6 hours'
    },
    status: 'completed',
    requestDate: '2023-12-15T11:20:00',
    proposedTimes: [
      'Mon Dec 18, 3:00 PM'
    ],
    message: 'Help needed with calculus and linear algebra final exam preparation.',
    subjects: ['Calculus', 'Linear Algebra'],
    duration: '90 minutes',
    frequency: 'Weekly',
    matchScore: 78,
    tutorResponse: 'I can help you prepare for your calculus and linear algebra exams. Monday at 3 PM works well!',
    scheduledSession: '2023-12-18T15:00:00',
    sessionsCompleted: 8,
    finalRating: 5,
    isUrgent: false
  },
  {
    id: '5',
    tutor: {
      name: 'Dr. Michael Brown',
      subject: 'Chemistry',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      experience: '10 years',
      price: 55,
      responseTime: '3 hours'
    },
    status: 'pending',
    requestDate: '2024-01-11T10:00:00',
    proposedTimes: [
      'Thu Jan 18, 1:00 PM',
      'Fri Jan 19, 11:00 AM'
    ],
    message: 'Struggling with organic chemistry mechanisms and reaction pathways.',
    subjects: ['Organic Chemistry'],
    duration: '60 minutes',
    frequency: 'Weekly',
    matchScore: 81,
    tutorResponse: null,
    isUrgent: true
  }
];

const statusFilters = [
  { key: 'all', label: 'All Requests' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'declined', label: 'Declined' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' }
];

export default function Tutors() {
  const [requests, setRequests] = useState(tutorRequestsData);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const filteredRequests = requests.filter(request => {
    const statusMatch = selectedStatus === 'all' || request.status === selectedStatus;
    const searchMatch = request.tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      request.tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      request.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'accepted': return '#10B981';
      case 'declined': return '#EF4444';
      case 'completed': return '#6B7280';
      case 'cancelled': return '#94A3B8';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return 'time';
      case 'accepted': return 'checkmark-circle';
      case 'declined': return 'close-circle';
      case 'completed': return 'trophy';
      case 'cancelled': return 'ban';
      default: return 'help';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending Review';
      case 'accepted': return 'Accepted';
      case 'declined': return 'Declined';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return status;
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

  const handleCancelRequest = (requestId) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: 'cancelled' } : request
    ));
    setCancelModalVisible(false);
  };

  const handleResendRequest = (requestId) => {
    // In a real app, this would resend the request to the tutor
    alert('Request has been resent to the tutor!');
  };

  const handleContactTutor = (requestId) => {
    // In a real app, this would open a chat with the tutor
    alert('Opening chat with tutor...');
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const getStats = () => {
    const pending = requests.filter(r => r.status === 'pending').length;
    const accepted = requests.filter(r => r.status === 'accepted').length;
    const completed = requests.filter(r => r.status === 'completed').length;
    const total = requests.length;
    return { pending, accepted, completed, total };
  };

  const stats = getStats();

  const renderRequestCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.requestCard}
      onPress={() => {
        setSelectedRequest(item);
        setDetailModalVisible(true);
      }}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.tutorInfo}>
          <Image source={{ uri: item.tutor.image }} style={styles.tutorImage} />
          <View style={styles.tutorDetails}>
            <Text style={styles.tutorName}>{item.tutor.name}</Text>
            <Text style={styles.tutorSubject}>{item.tutor.subject}</Text>
            <View style={styles.tutorMeta}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.rating}>{item.tutor.rating}</Text>
              <Text style={styles.experience}>• {item.tutor.experience}</Text>
            </View>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Ionicons name={getStatusIcon(item.status)} size={14} color="#FFFFFF" />
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
          {item.isUrgent && (
            <View style={styles.urgentBadge}>
              <Ionicons name="flash" size={12} color="#FFFFFF" />
              <Text style={styles.urgentText}>Urgent</Text>
            </View>
          )}
        </View>
      </View>

      {/* Request Details */}
      <View style={styles.requestDetails}>
        <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
        
        <View style={styles.subjectsContainer}>
          {item.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectTag}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
        </View>

        <View style={styles.requestMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#64748B" />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="repeat" size={14} color="#64748B" />
            <Text style={styles.metaText}>{item.frequency}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="cash" size={14} color="#64748B" />
            <Text style={styles.metaText}>${item.tutor.price}/hr</Text>
          </View>
        </View>

        {/* Tutor Response Preview */}
        {item.tutorResponse && (
          <View style={styles.responsePreview}>
            <Text style={styles.responseLabel}>Tutor's Response:</Text>
            <Text style={styles.responseText} numberOfLines={2}>{item.tutorResponse}</Text>
          </View>
        )}

        {/* Proposed Times */}
        <View style={styles.timesContainer}>
          <Text style={styles.timesLabel}>Proposed Times:</Text>
          <View style={styles.timesList}>
            {item.proposedTimes.map((time, index) => (
              <View key={index} style={styles.timeTag}>
                <Ionicons name="calendar" size={12} color="#4A56E2" />
                <Text style={styles.timeText}>{formatDate(time)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Footer Actions */}
      <View style={styles.cardFooter}>
        <Text style={styles.requestDate}>
          Sent {getTimeAgo(item.requestDate)}
        </Text>
        
        <View style={styles.actionButtons}>
          {item.status === 'pending' && (
            <>
              <TouchableOpacity 
                style={[styles.actionButton, styles.cancelButton]}
                onPress={(e) => {
                  e.stopPropagation();
                  setSelectedRequest(item);
                  setCancelModalVisible(true);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionButton, styles.messageButton]}
                onPress={(e) => {
                  e.stopPropagation();
                  handleContactTutor(item.id);
                }}
              >
                <Ionicons name="chatbubble" size={14} color="#4A56E2" />
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </>
          )}
          
          {item.status === 'declined' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.resendButton]}
              onPress={(e) => {
                e.stopPropagation();
                handleResendRequest(item.id);
              }}
            >
              <Text style={styles.resendButtonText}>Resend Request</Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'accepted' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.scheduleButton]}
              onPress={(e) => {
                e.stopPropagation();
                handleContactTutor(item.id);
              }}
            >
              <Ionicons name="calendar" size={14} color="#FFFFFF" />
              <Text style={styles.scheduleButtonText}>Schedule Session</Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'completed' && item.finalRating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>Your rating:</Text>
              <View style={styles.stars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Ionicons 
                    key={star}
                    name={star <= item.finalRating ? "star" : "star-outline"}
                    size={16}
                    color="#FFD700"
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Tutor Requests</Text>
          <Text style={styles.headerSubtitle}>Manage your tutoring requests</Text>
        </View>
      </View>

      {/* Stats Overview */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.statsOverview}
      >
        <View style={[styles.statCard, styles.totalCard]}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total Requests</Text>
        </View>
        <View style={[styles.statCard, styles.pendingCard]}>
          <Text style={styles.statNumber}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statCard, styles.acceptedCard]}>
          <Text style={styles.statNumber}>{stats.accepted}</Text>
          <Text style={styles.statLabel}>Accepted</Text>
        </View>
        <View style={[styles.statCard, styles.completedCard]}>
          <Text style={styles.statNumber}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </ScrollView>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search requests by tutor or subject..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Status Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
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

      {/* Requests List */}
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestCard}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.requestsList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4A56E2']}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#CCC" />
            <Text style={styles.emptyStateTitle}>No requests found</Text>
            <Text style={styles.emptyStateText}>
              {selectedStatus !== 'all' || searchQuery
                ? 'Try adjusting your filters or search'
                : 'You haven\'t made any tutor requests yet'
              }
            </Text>
            <TouchableOpacity style={styles.findTutorsButton}>
              <Text style={styles.findTutorsButtonText}>Find Tutors</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Cancel Request Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cancelModalVisible}
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="warning" size={48} color="#F59E0B" style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Cancel Request?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to cancel your request to {selectedRequest?.tutor.name}? 
              This action cannot be undone.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalCancel]}
                onPress={() => setCancelModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Keep Request</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalConfirm]}
                onPress={() => handleCancelRequest(selectedRequest?.id)}
              >
                <Text style={styles.modalConfirmText}>Cancel Request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Request Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={detailModalVisible}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, styles.detailModal]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request Details</Text>
              <TouchableOpacity onPress={() => setDetailModalVisible(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            {selectedRequest && (
              <ScrollView style={styles.detailContent}>
                {/* Tutor Info */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Tutor Information</Text>
                  <View style={styles.tutorInfoDetail}>
                    <Image source={{ uri: selectedRequest.tutor.image }} style={styles.detailTutorImage} />
                    <View>
                      <Text style={styles.detailTutorName}>{selectedRequest.tutor.name}</Text>
                      <Text style={styles.detailTutorSubject}>{selectedRequest.tutor.subject}</Text>
                      <Text style={styles.detailTutorRating}>
                        ⭐ {selectedRequest.tutor.rating} • {selectedRequest.tutor.experience}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Request Details */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Your Request</Text>
                  <Text style={styles.detailMessage}>{selectedRequest.message}</Text>
                  
                  <View style={styles.detailGrid}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>{selectedRequest.duration}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Frequency</Text>
                      <Text style={styles.detailValue}>{selectedRequest.frequency}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Rate</Text>
                      <Text style={styles.detailValue}>${selectedRequest.tutor.price}/hr</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Match Score</Text>
                      <Text style={styles.detailValue}>{selectedRequest.matchScore}%</Text>
                    </View>
                  </View>
                </View>

                {/* Subjects */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Subjects</Text>
                  <View style={styles.detailSubjects}>
                    {selectedRequest.subjects.map((subject, index) => (
                      <View key={index} style={styles.detailSubjectTag}>
                        <Text style={styles.detailSubjectText}>{subject}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Proposed Times */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Proposed Times</Text>
                  {selectedRequest.proposedTimes.map((time, index) => (
                    <View key={index} style={styles.timeDetail}>
                      <Ionicons name="calendar" size={16} color="#4A56E2" />
                      <Text style={styles.timeDetailText}>{formatDate(time)}</Text>
                    </View>
                  ))}
                </View>

                {/* Tutor Response */}
                {selectedRequest.tutorResponse && (
                  <View style={styles.detailSection}>
                    <Text style={styles.detailSectionTitle}>Tutor's Response</Text>
                    <View style={styles.responseDetail}>
                      <Text style={styles.responseDetailText}>{selectedRequest.tutorResponse}</Text>
                    </View>
                  </View>
                )}

                {/* Status Info */}
                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Request Status</Text>
                  <View style={[styles.statusDetail, { backgroundColor: getStatusColor(selectedRequest.status) }]}>
                    <Ionicons name={getStatusIcon(selectedRequest.status)} size={20} color="#FFFFFF" />
                    <Text style={styles.statusDetailText}>{getStatusText(selectedRequest.status)}</Text>
                  </View>
                  <Text style={styles.requestDateDetail}>
                    Request sent on {formatDate(selectedRequest.requestDate)}
                  </Text>
                </View>
              </ScrollView>
            )}
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
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  statsOverview: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  totalCard: { backgroundColor: '#4A56E2' },
  pendingCard: { backgroundColor: '#F59E0B' },
  acceptedCard: { backgroundColor: '#10B981' },
  completedCard: { backgroundColor: '#6B7280' },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 1,
  },
  statLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.9,
    marginBottom: 2,
    paddingBottom: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
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
    fontSize: 12,
    color: '#1E293B',
  },
filtersContainer: {
  paddingHorizontal: 16, 
  paddingVertical: 8,    // ensures vertical space for the chips
  marginBottom: 16,      // space before request list
  minHeight: 48,         // ensures the ScrollView has enough height
   // vertically center the chips
},

filterChip: {
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 10,   // tighter horizontal padding
  paddingVertical: 4,      // smaller vertical padding
  borderRadius: 16,        // slightly smaller radius
  marginRight: 6,          // keeps spacing between chips
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 3,         // slightly smaller shadow
  elevation: 2,
  minHeight: 32,           // ensures consistent height
  justifyContent: 'center', // vertically centers text
  alignItems: 'center',
},
  filterChipActive: {
    backgroundColor: '#4A56E2',
  },
 filterChipText: {
  fontSize: 12,            // smaller font to fit
  fontWeight: '600',
  color: '#64748B',
},
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  requestsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  requestCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    marginTop: 4,
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
  tutorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  tutorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  tutorDetails: {
    flex: 1,
  },
  tutorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  tutorSubject: {
    fontSize: 14,
    color: '#4A56E2',
    fontWeight: '600',
    marginBottom: 4,
  },
  tutorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 4,
    marginRight: 4,
  },
  experience: {
    fontSize: 12,
    color: '#64748B',
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
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  urgentText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  requestDetails: {
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 8,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
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
  requestMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  responsePreview: {
    backgroundColor: '#F0FDF4',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  responseLabel: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '600',
    marginBottom: 2,
  },
  responseText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  timesContainer: {
    marginBottom: 8,
  },
  timesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  timesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#4A56E2',
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestDate: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  cancelButton: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  messageButton: {
    backgroundColor: '#F1F5F9',
  },
  resendButton: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  scheduleButton: {
    backgroundColor: '#4A56E2',
  },
  cancelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#DC2626',
  },
  messageButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A56E2',
  },
  resendButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D97706',
  },
  scheduleButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
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
    marginBottom: 20,
  },
  findTutorsButton: {
    backgroundColor: '#4A56E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  findTutorsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
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
    backgroundColor: '#EF4444',
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
  detailSection: {
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  tutorInfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailTutorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  detailTutorName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  detailTutorSubject: {
    fontSize: 14,
    color: '#4A56E2',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailTutorRating: {
    fontSize: 12,
    color: '#64748B',
  },
  detailMessage: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    minWidth: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  detailSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailSubjectTag: {
    backgroundColor: '#4A56E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  detailSubjectText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  timeDetailText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  responseDetail: {
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
  },
  responseDetailText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  statusDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusDetailText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  requestDateDetail: {
    fontSize: 12,
    color: '#64748B',
  },
});