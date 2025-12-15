import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function GroupsList({ groups = [] }) {
  return (
    <View style={s.wrapper}>
      {/* Header */}
      <View style={s.headerRow}>
        <Text style={s.title}>Your Study Groups</Text>
        <TouchableOpacity style={s.managePill}>
          <Text style={s.managePillText}>Manage Groups</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal scroll of group cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {groups.map((g) => (
          <View key={g.id} style={s.card}>
            <Text style={s.groupName}>{g.name}</Text>

            <View style={s.details}>
              <Text style={s.detail}>
                <Text style={s.label}>Module: </Text>{g.module}
              </Text>
              <Text style={s.detail}>
                <Text style={s.label}>Tutor: </Text>{g.tutor}
              </Text>
              <Text style={s.detail}>
                <Text style={s.label}>Time: </Text>{g.time}
              </Text>
            </View>

            <View style={s.buttonsRow}>
              <TouchableOpacity style={s.joinBtn}>
                <Text style={s.joinBtnText}>Join Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.detailsBtn}>
                <Text style={s.detailsBtnText}>View Details</Text>
              </TouchableOpacity>
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
    marginHorizontal: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  managePill: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  managePillText: {
    color: '#007AFF',
    fontSize: 12.5,
    fontWeight: '500',
  },

  card: {
    width: 260, // enough to fully display all text/buttons
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginRight: 12, // spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },

  groupName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  details: {
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    color: '#374151',
  },
  detail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 3,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },

  joinBtn: {
    flex: 1,
    backgroundColor: '#4A56E2',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },

  joinBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },

  detailsBtn: {
    flex: 1,
    borderColor: '#4A56E2',
    borderWidth: 1.5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },

  detailsBtnText: {
    color: '#4A56E2',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});
