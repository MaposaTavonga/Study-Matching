import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AvatarPlaceholder from '../../assets/images/icon.png';

// Sample student data
const students = [
  {
    id: 1,
    name: 'John Doe',
    course: 'Computer Science',
    year: 3,
    progress: 60,
    strongModules: ['Operating Systems', 'Databases'],
    weakModules: ['Algorithms'],
    availableTimes: ['Mon 10-12', 'Thu 12-14'],
  },
  {
    id: 2,
    name: 'Mary Smith',
    course: 'Computer Science',
    year: 3,
    progress: 55,
    strongModules: ['Algorithms', 'Data Structures'],
    weakModules: ['Networking'],
    availableTimes: ['Mon 10-12', 'Wed 14-16'],
  },
   {
    id: 3,
    name: 'Mary Smith',
    course: 'Computer Science',
    year: 3,
    progress: 55,
    strongModules: ['Algorithms', 'Data Structures'],
    weakModules: ['Networking'],
    availableTimes: ['Mon 10-12', 'Wed 14-16'],
  },
  // Add more students
];

// Matching function
const matchStudents = (currentStudent, allStudents) => {
  return allStudents
    .filter(s => s.id !== currentStudent.id)
    .map(s => {
      let score = 0;

      
      currentStudent.weakModules.forEach(weak => {
        if (s.strongModules.includes(weak)) score += 2;
      });

  
      currentStudent.weakModules.forEach(weak => {
        if (s.weakModules.includes(weak)) score += 1;
      });

      // Similar progress
      const progressDiff = Math.abs(currentStudent.progress - s.progress);
      if (progressDiff <= 10) score += 2;
      else if (progressDiff <= 20) score += 1;

      // Availability overlap
      const overlap = currentStudent.availableTimes.filter(t => s.availableTimes.includes(t));
      score += overlap.length * 3;

      // Same course/year
      if (currentStudent.course === s.course) score += 1;
      if (currentStudent.year === s.year) score += 1;

      return { student: s, score };
    })
    .sort((a, b) => b.score - a.score);
};

export default function Matches() {
  const currentStudent = {
    id: 0,
    name: 'Sarah Mokoena',
    course: 'Computer Science',
    year: 3,
    progress: 53,
    strongModules: ['Data Structures', 'Algorithms'],
    weakModules: ['Operating Systems', 'Networking'],
    availableTimes: ['Mon 10-12', 'Wed 14-16'],
  };

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const matched = matchStudents(currentStudent, students);
    setMatches(matched);
  }, []);

  return (
    <ScrollView style={s.container}>
      <Text style={s.title}>Find Study Partners</Text>

      {matches.map(({ student, score }) => (
        <View key={student.id} style={s.card}>
          <View style={s.cardHeader}>
            <Image source={AvatarPlaceholder} style={s.avatar} />
            <View style={s.cardInfo}>
              <Text style={s.name}>{student.name}</Text>
              <Text style={s.details}>{student.course}, Year {student.year}</Text>
              <Text style={s.details}>Score: {score}</Text>
            </View>
          </View>

          <View style={s.modules}>
            <Text style={s.sectionTitle}>Strengths:</Text>
            <View style={s.tagsContainer}>
              {student.strongModules.map((mod, i) => (
                <Text key={i} style={[s.tag, s.strengthTag]}>{mod}</Text>
              ))}
            </View>

            <Text style={s.sectionTitle}>Weaknesses:</Text>
            <View style={s.tagsContainer}>
              {student.weakModules.map((mod, i) => (
                <Text key={i} style={[s.tag, s.weaknessTag]}>{mod}</Text>
              ))}
            </View>
          </View>

          <TouchableOpacity style={s.joinButton}>
            <Text style={s.joinButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
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
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardInfo: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  details: {
    fontSize: 12,
    color: '#6B7280',
  },
  modules: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  strengthTag: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  weaknessTag: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
  },
  joinButton: {
    marginTop: 12,
    backgroundColor: '#4A56E2',
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
