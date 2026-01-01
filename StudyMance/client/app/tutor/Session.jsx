import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TutorSessionsScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    sessionType: 'all', // 'all', 'group', 'individual'
    status: 'all', // 'all', 'confirmed', 'pending'
    dateRange: 'thisWeek', // 'today', 'thisWeek', 'thisMonth', 'custom'
  });

  // Dummy data for sessions
  const upcomingSessions = [
    {
      id: 1,
      title: 'Calculus I - Limits & Derivatives',
      module: 'MAT101 - Calculus I',
      date: '2024-01-15',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      type: 'Group Session',
      students: [
        { id: 1, name: 'Sarah M', avatarColor: '#FF6B6B' },
        { id: 2, name: 'John D', avatarColor: '#4ECDC4' },
        { id: 3, name: 'Alex T', avatarColor: '#FFD166' },
      ],
      location: 'Room 302, Math Building',
      status: 'confirmed',
      joinLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      id: 2,
      title: 'Physics Mechanics Review',
      module: 'PHYS101 - Mechanics',
      date: '2024-01-16',
      time: '2:00 PM - 3:30 PM',
      duration: '1.5 hours',
      type: 'One-on-One',
      student: { id: 4, name: 'Emily R', avatarColor: '#A78BFA' },
      location: 'Online - Google Meet',
      status: 'confirmed',
      joinLink: 'https://meet.google.com/xyz-uvw-rst',
    },
    {
      id: 3,
      title: 'Organic Chemistry Lab Prep',
      module: 'CHEM101 - Organic Chemistry',
      date: '2024-01-17',
      time: '4:00 PM - 6:00 PM',
      duration: '2 hours',
      type: 'Group Session',
      students: [
        { id: 5, name: 'Michael B', avatarColor: '#06D6A0' },
        { id: 6, name: 'Lisa P', avatarColor: '#118AB2' },
      ],
      location: 'Chemistry Lab 4',
      status: 'pending',
      notes: 'Bring lab safety equipment',
    },
    {
      id: 4,
      title: 'Calculus II - Integration',
      module: 'MAT201 - Calculus II',
      date: '2024-01-18',
      time: '9:00 AM - 11:00 AM',
      duration: '2 hours',
      type: 'Group Session',
      students: [
        { id: 7, name: 'David L', avatarColor: '#EF476F' },
        { id: 8, name: 'Sophia K', avatarColor: '#FFD166' },
        { id: 9, name: 'James W', avatarColor: '#06D6A0' },
        { id: 10, name: 'Olivia M', avatarColor: '#118AB2' },
      ],
      location: 'Room 305, Math Building',
      status: 'confirmed',
    },
  ];

  const pastSessions = [
    {
      id: 101,
      title: 'Linear Algebra Basics',
      module: 'MAT202 - Linear Algebra',
      date: '2024-01-10',
      time: '1:00 PM - 3:00 PM',
      duration: '2 hours',
      type: 'Group Session',
      studentsCount: 6,
      attendance: 5,
      materials: 3,
      feedback: 4.8,
      earnings: '$120.00',
    },
    {
      id: 102,
      title: 'Physics Tutoring Session',
      module: 'PHYS101 - Mechanics',
      date: '2024-01-08',
      time: '3:00 PM - 4:00 PM',
      duration: '1 hour',
      type: 'One-on-One',
      student: { name: 'Robert T', avatarColor: '#A78BFA' },
      attendance: 1,
      materials: 2,
      feedback: 5.0,
      earnings: '$60.00',
    },
    {
      id: 103,
      title: 'Calculus Review Session',
      module: 'MAT101 - Calculus I',
      date: '2024-01-05',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      type: 'Group Session',
      studentsCount: 8,
      attendance: 7,
      materials: 4,
      feedback: 4.5,
      earnings: '$160.00',
    },
  ];

  const stats = {
    totalSessions: 24,
    hoursThisWeek: 12,
    attendanceRate: '92%',
    avgRating: 4.7,
  };

  // Filter sessions based on active tab and filters
  const getFilteredSessions = () => {
    const sessions = activeTab === 'upcoming' ? upcomingSessions : pastSessions;
    
    let filtered = sessions;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.module.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply session type filter
    if (filters.sessionType !== 'all') {
      filtered = filtered.filter(session => 
        session.type.toLowerCase().includes(filters.sessionType.toLowerCase())
      );
    }
    
    // Apply status filter (for upcoming sessions)
    if (activeTab === 'upcoming' && filters.status !== 'all') {
      filtered = filtered.filter(session => session.status === filters.status);
    }
    
    return filtered;
  };

  const handleStartSession = (session) => {
    Alert.alert(
      'Start Session',
      `Are you ready to start "${session.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Start Session', onPress: () => {
          // Navigate to session room or start video call
          console.log('Starting session:', session.id);
        }}
      ]
    );
  };

  const handleViewDetails = (session) => {
    navigation.navigate('SessionDetails', { sessionId: session.id, isPast: activeTab === 'past' });
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setFilters({ ...filters, dateRange: 'custom' });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const SessionCard = ({ session }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => handleViewDetails(session)}
    >
      <View style={styles.sessionHeader}>
        <View style={styles.sessionTypeBadge}>
          <Text style={[
            styles.sessionTypeText,
            { color: session.type === 'Group Session' ? '#4F46E5' : '#10B981' }
          ]}>
            {session.type}
          </Text>
        </View>
        {activeTab === 'upcoming' && (
          <View style={[
            styles.statusBadge,
            { backgroundColor: session.status === 'confirmed' ? '#D1FAE5' : '#FEF3C7' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: session.status === 'confirmed' ? '#065F46' : '#92400E' }
            ]}>
              {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </Text>
          </View>
        )}
      </View>
      
      <Text style={styles.sessionTitle}>{session.title}</Text>
      <Text style={styles.sessionModule}>{session.module}</Text>
      
      <View style={styles.sessionDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            {formatDate(session.date)} • {session.time}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{session.duration}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{session.location}</Text>
        </View>
      </View>
      
      {activeTab === 'upcoming' ? (
        <View style={styles.sessionFooter}>
          {/* Students Avatars */}
          <View style={styles.studentsContainer}>
            {session.type === 'Group Session' ? (
              <>
                <View style={styles.avatarGroup}>
                  {session.students.slice(0, 3).map((student, index) => (
                    <View 
                      key={student.id}
                      style={[
                        styles.avatar,
                        { 
                          backgroundColor: student.avatarColor,
                          marginLeft: index > 0 ? -10 : 0,
                          zIndex: 3 - index
                        }
                      ]}
                    >
                      <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                    </View>
                  ))}
                  {session.students.length > 3 && (
                    <View style={[styles.avatar, styles.moreAvatar]}>
                      <Text style={styles.moreText}>+{session.students.length - 3}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.studentCount}>
                  {session.students.length} students
                </Text>
              </>
            ) : (
              <View style={styles.singleStudent}>
                <View style={[styles.avatar, { backgroundColor: session.student.avatarColor }]}>
                  <Text style={styles.avatarText}>{session.student.name.charAt(0)}</Text>
                </View>
                <Text style={styles.studentName}>{session.student.name}</Text>
              </View>
            )}
          </View>
          
          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              session.status === 'pending' ? styles.pendingButton : styles.confirmedButton
            ]}
            onPress={() => session.status === 'confirmed' ? handleStartSession(session) : null}
          >
            <Text style={styles.actionButtonText}>
              {session.status === 'confirmed' ? 'Start Session' : 'Awaiting Confirmation'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.pastSessionFooter}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={14} color="#6B7280" />
              <Text style={styles.statText}>
                {session.studentsCount || 1} students
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle-outline" size={14} color="#6B7280" />
              <Text style={styles.statText}>
                {session.attendance} attended
              </Text>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star-outline" size={14} color="#6B7280" />
              <Text style={styles.statText}>
                {session.feedback} ★
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={14} color="#6B7280" />
              <Text style={styles.earningsText}>{session.earnings}</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => handleViewDetails(session)}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
            <Ionicons name="chevron-forward" size={16} color="#4F46E5" />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilterModal}
      onRequestClose={() => setShowFilterModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filter Sessions</Text>
            <TouchableOpacity onPress={() => setShowFilterModal(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Session Type</Text>
            <View style={styles.filterOptions}>
              {['all', 'group', 'individual'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterOption,
                    filters.sessionType === type && styles.filterOptionActive
                  ]}
                  onPress={() => setFilters({ ...filters, sessionType: type })}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.sessionType === type && styles.filterOptionTextActive
                  ]}>
                    {type === 'all' ? 'All Types' : type === 'group' ? 'Group' : 'One-on-One'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {activeTab === 'upcoming' && (
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.filterOptions}>
                {['all', 'confirmed', 'pending'].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filterOption,
                      filters.status === status && styles.filterOptionActive
                    ]}
                    onPress={() => setFilters({ ...filters, status })}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      filters.status === status && styles.filterOptionTextActive
                    ]}>
                      {status === 'all' ? 'All Status' : status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Date Range</Text>
            <View style={styles.filterOptions}>
              {['thisWeek', 'today', 'thisMonth', 'custom'].map(range => (
                <TouchableOpacity
                  key={range}
                  style={[
                    styles.filterOption,
                    filters.dateRange === range && styles.filterOptionActive
                  ]}
                  onPress={() => {
                    if (range === 'custom') {
                      setShowDatePicker(true);
                    }
                    setFilters({ ...filters, dateRange: range });
                  }}
                >
                  <Text style={[
                    styles.filterOptionText,
                    filters.dateRange === range && styles.filterOptionTextActive
                  ]}>
                    {range === 'thisWeek' ? 'This Week' : 
                     range === 'today' ? 'Today' : 
                     range === 'thisMonth' ? 'This Month' : 'Custom Date'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilterModal(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setFilters({
                sessionType: 'all',
                status: 'all',
                dateRange: 'thisWeek',
              });
              setSearchQuery('');
            }}
          >
            <Text style={styles.resetButtonText}>Reset All Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const filteredSessions = getFilteredSessions();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>My Sessions</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('CreateSession')}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.createButtonText}>New Session</Text>
          </TouchableOpacity>
        </View>
        
        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>Total Sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.hoursThisWeek}h</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.attendanceRate}</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats.avgRating}</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search sessions by title or module..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter" size={20} color="#4F46E5" />
            {Object.values(filters).some(f => f !== 'all') && (
              <View style={styles.filterBadge} />
            )}
          </TouchableOpacity>
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              Upcoming ({upcomingSessions.length})
            </Text>
            {activeTab === 'upcoming' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              Past ({pastSessions.length})
            </Text>
            {activeTab === 'past' && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Sessions List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={60} color="#D1D5DB" />
            <Text style={styles.emptyTitle}>No sessions found</Text>
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'No sessions match your search. Try different keywords.'
                : `You don't have any ${activeTab} sessions scheduled.`
              }
            </Text>
            <TouchableOpacity
              style={styles.createSessionButton}
              onPress={() => navigation.navigate('CreateSession')}
            >
              <Text style={styles.createSessionButtonText}>Create New Session</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      {/* Filter Modal */}
      <FilterModal />
      
      {/* Date Picker */}
      {showDatePicker && Platform.OS === 'ios' && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  filterButton: {
    padding: 8,
    position: 'relative',
  },
  filterBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4F46E5',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 40,
    height: 3,
    backgroundColor: '#4F46E5',
    borderRadius: 1.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTypeBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sessionTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  sessionModule: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  sessionDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentsContainer: {
    flex: 1,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  moreAvatar: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },
  moreText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
  },
  studentCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  singleStudent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentName: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 140,
    alignItems: 'center',
  },
  confirmedButton: {
    backgroundColor: '#4F46E5',
  },
  pendingButton: {
    backgroundColor: '#F3F4F6',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  pendingButtonText: {
    color: '#6B7280',
  },
  pastSessionFooter: {
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
  },
  earningsText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
  },
  viewDetailsText: {
    color: '#4F46E5',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  createSessionButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createSessionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  filterOptionActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#4F46E5',
  },
  applyButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  resetButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});