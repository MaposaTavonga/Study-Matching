import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample tutor data
const tutorsData = [
  {
    id: '1',
    name: 'Sarah Mokoena',
    subject: 'Computer Science',
    bio: 'Passionate about helping students master programming fundamentals',
    experience: '11-year experienced CS tutor',
    rating: 4.9,
    reviews: 127,
    price: 45,
    availability: 'Mon-Wed, 2-5 PM',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Dr. Alex Chen',
    subject: 'Computer Science',
    bio: 'University professor with PhD in Computer Science',
    experience: '15 years teaching experience',
    rating: 4.8,
    reviews: 89,
    price: 60,
    availability: 'Mon-Wed, 2-5 PM',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    subject: 'Mathematics',
    bio: 'Specialized in calculus and advanced mathematics',
    experience: '8-year math tutor',
    rating: 4.7,
    reviews: 94,
    price: 35,
    availability: 'Tue-Thu, 10 AM-2 PM',
    image: 'https://images.unsplash.com/photo-1551836026-d5c88ac5d2d3?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'James Wilson',
    subject: 'Physics',
    bio: 'Making physics concepts easy to understand',
    experience: '12-year physics tutor',
    rating: 4.9,
    reviews: 156,
    price: 50,
    availability: 'Mon-Fri, 3-6 PM',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

// Popular subjects
const popularSubjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Economics'
];

export default function TutorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Computer Science');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadTutors();
  }, [selectedSubject]);

  const loadTutors = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filteredTutors = tutorsData.filter(tutor => 
        tutor.subject === selectedSubject
      );
      setTutors(filteredTutors);
      setLoading(false);
    }, 1000);
  };

  const loadMoreTutors = async () => {
    setLoadingMore(true);
    // Simulate loading more data
    setTimeout(() => {
      setLoadingMore(false);
    }, 1500);
  };

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutor.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTutorCard = ({ item }) => (
    <TouchableOpacity style={styles.tutorCard}>
      <View style={styles.tutorHeader}>
        <Image source={{ uri: item.image }} style={styles.tutorImage} />
        <View style={styles.tutorInfo}>
          <Text style={styles.tutorName}>{item.name}</Text>
          <Text style={styles.tutorSubject}>{item.subject}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews} reviews)</Text>
          </View>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.hour}>/hour</Text>
        </View>
      </View>
      
      <Text style={styles.tutorBio}>{item.bio}</Text>
      <Text style={styles.experience}>{item.experience}</Text>
      
      <View style={styles.availabilityContainer}>
        <Ionicons name="time-outline" size={16} color="#666" />
        <Text style={styles.availability}>{item.availability}</Text>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.messageButton}>
          <Ionicons name="chatbubble-outline" size={18} color="#4A56E2" />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingMore}>
        <ActivityIndicator size="small" color="#4A56E2" />
        <Text style={styles.loadingMoreText}>Loading more tutors...</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Tutors</Text>
        <Text style={styles.headerSubtitle}>Connect with expert tutors for personalized learning</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by subject or tutor name"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Popular Subjects */}
      <View style={styles.subjectsSection}>
        <Text style={styles.sectionTitle}>Popular Subjects</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.subjectsScroll}
        >
          {popularSubjects.map((subject, index) => (
            <TouchableOpacity
              key={subject}
              style={[
                styles.subjectChip,
                selectedSubject === subject && styles.subjectChipActive
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text style={[
                styles.subjectChipText,
                selectedSubject === subject && styles.subjectChipTextActive
              ]}>
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tutors List */}
      <View style={styles.tutorsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedSubject} Tutors ({filteredTutors.length})
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={18} color="#666" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A56E2" />
            <Text style={styles.loadingText}>Finding the best tutors...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTutors}
            renderItem={renderTutorCard}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tutorsList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#CCC" />
                <Text style={styles.emptyStateTitle}>No tutors found</Text>
                <Text style={styles.emptyStateText}>
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            }
            onEndReached={loadMoreTutors}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        )}
      </View>
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
    marginBottom: 20,
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
  subjectsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  subjectsScroll: {
    paddingLeft: 20,
  },
  subjectChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectChipActive: {
    backgroundColor: '#4A56E2',
  },
  subjectChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  subjectChipTextActive: {
    color: '#FFFFFF',
  },
  tutorsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    marginLeft: 4,
  },
  tutorsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tutorCard: {
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
  tutorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  tutorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  tutorInfo: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#64748B',
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A56E2',
  },
  hour: {
    fontSize: 12,
    color: '#64748B',
  },
  tutorBio: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 6,
  },
  experience: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 12,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  availability: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A56E2',
  },
  bookButton: {
    flex: 2,
    backgroundColor: '#4A56E2',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#4A56E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
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
  loadingMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadingMoreText: {
    fontSize: 14,
    color: '#64748B',
  },
});