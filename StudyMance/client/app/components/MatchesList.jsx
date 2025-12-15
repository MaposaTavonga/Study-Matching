import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Simple star component (uses Text star char to avoid icon dependency)
const StarRating = ({ rating = 5 }) => {
  return (
    <View style={s.starRow}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Text key={i} style={[s.star, i < rating ? s.starFilled : s.starEmpty]}>★</Text>
      ))}
    </View>
  );
};

export default function MatchesList({ matches = [] }) {
  const navigation = useNavigation();
  return (
    <View style={s.wrapper}>
      <View style={s.headerRow}>
        <Text style={s.sectionTitle}>Your Matches Today</Text>

        <TouchableOpacity onPress={() => navigation.navigate('MatchesManagement')} style={s.managePill}>
          <Text style={s.managePillText}>Manage Matches</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        {matches.map((m) => (
          <View key={m.id} style={s.card}>
            {/* Avatar top-left inside the card */}
            {m.profilePic ? (
              <Image source={{ uri: m.profilePic }} style={s.avatarImage} />
            ) : (
              <View style={s.avatarPlaceholder}>
                <Text style={s.avatarText}>{m.initials}</Text>
              </View>
            )}

            {/* Card inner content */}
            <View style={s.cardBody}>
              <Text style={s.name} numberOfLines={1}>{m.name}</Text>
              <Text style={s.course} numberOfLines={1}>{m.course}</Text>

              {/* Star rating */}
              <StarRating rating={m.rating ?? 5} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: {
    marginVertical: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  managePill: {
    backgroundColor: '#EEF2FF', // pale indigo
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  managePillText: {
     color: '#007AFF', fontSize: 12.5, fontWeight: '500'
  },

  scrollContent: {
    paddingLeft: 12,
    paddingRight: 20,
    alignItems: 'center',
  },

  card: {
  width: 140, // narrower since vertical layout
  minHeight: 180,
  marginRight: 14,
  borderRadius: 16,
  backgroundColor: '#FFFFFF',
  paddingVertical: 16,
  alignItems: 'center', // center everything
  justifyContent: 'center',
  // shadow (iOS)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 4,
  borderWidth: 1,
  borderColor: '#F1F5F9',
},

avatarImage: {
  width: 64,
  height: 64,
  borderRadius: 32,
  borderWidth: 2,
  borderColor: '#EEF2FF',
  marginBottom: 10,
},

avatarPlaceholder: {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: '#EEF2FF',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E6E9FF',
  marginBottom: 10,
},

name: {
  fontSize: 14,
  fontWeight: '700',
  color: '#0F172A',
  marginBottom: 4,
   textAlign: 'center',
},

course: {
  fontSize: 12,
  color: '#6B7280',
  marginBottom: 8,
   textAlign: 'center',
},

starRow: {
  flexDirection: 'row',
  justifyContent: 'center',
},

  star: {
    fontSize: 14,
    marginRight: 4,
  },
  starFilled: {
    color: '#FBBF24', // gold
  },
  starEmpty: {
    color: '#E5E7EB', // light grey
  },
});
