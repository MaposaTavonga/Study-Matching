import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SuccessStories({ stories }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Success Stories</Text>
      {stories.map((story) => (
        <View key={story.id} style={styles.card}>
          <Text style={styles.storyText}>"{story.text}"</Text>
          <Text style={styles.author}>- {story.author}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginVertical: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3, elevation: 3, marginBottom: 12 },
  storyText: { fontSize: 14, color: '#666', lineHeight: 20, fontStyle: 'italic', marginBottom: 8 },
  author: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', textAlign: 'right' },
});
