import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PLACEHOLDER_IMAGES = [
  require('../../assets/images/icon.png'),
];
const DEFAULT_PLACEHOLDER = require('../../assets/images/icon.png');


export default function TutorsList({ tutors }) {
  const navigation = useNavigation();
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Tutors</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TutorManagement')}>
          <Text style={styles.manageLink}>See All Tutors</Text>
        </TouchableOpacity>

 
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {tutors.map((tutor, index) => (
          <View key={tutor.id} style={styles.card}>
            {/* Avatar */}
            <Image
              source={tutor.photo ? { uri: tutor.photo } : PLACEHOLDER_IMAGES[index] || DEFAULT_PLACEHOLDER}
              style={styles.avatar}
            />

            {/* Info Section */}
            <View style={styles.infoSection}>
              <Text style={styles.tutorName}>{tutor.name}</Text>
              <Text style={styles.moduleName}>{tutor.module}</Text>

              <View style={styles.ratingPriceRow}>
                {/* Stars */}
                <View style={styles.ratingRow}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Ionicons
                      key={idx}
                      name="star"
                      size={16}
                      color={idx < Math.floor(tutor.rating) ? '#FFD700' : '#E0E0E0'}
                    />
                  ))}
                  <Text style={styles.ratingText}> {tutor.rating}</Text>
                </View>

                {/* Price */}
                <Text style={styles.price}>{tutor.price}</Text>
              </View>
            </View>

            {/* Book Button */}
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { 
    marginVertical: 16,
    marginHorizontal: 16,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1a1a1a' 
  },
  manageLink: { 
    color: '#007AFF', 
    fontSize: 14, 
    fontWeight: '500' 
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30,
    backgroundColor: '#F3F4F6', 
    marginRight: 12,
  },

  infoSection: { 
    flex: 1,
  },
  tutorName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#111827',
    marginBottom: 2,
  },
  moduleName: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginBottom: 6,
    fontStyle: 'italic',
  },

  ratingPriceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A56E2',
  },

  bookButton: {
    backgroundColor: '#4A56E2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    marginLeft: 12,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
