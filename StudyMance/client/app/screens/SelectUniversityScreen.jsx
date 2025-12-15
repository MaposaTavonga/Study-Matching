import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const universities = [
  'University of Cape Town',
  'University of the Witwatersrand',
  'University of Pretoria',
  'University of Johannesburg',
  'Stellenbosch University',
];

export default function SelectUniversityScreen({ navigation }) {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [role, setRole] = useState(null);

  const canContinue = selectedUniversity && role;

  const handleContinue = () => {
    navigation.navigate('Login', {
      university: selectedUniversity,
      role,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={s.title}>Let’s get started 🎓</Text>
      <Text style={s.subtitle}>
        Select your university and role
      </Text>

      {/* University selection */}
      <Text style={s.sectionTitle}>Your University</Text>
      {universities.map((uni) => (
        <TouchableOpacity
          key={uni}
          style={[
            s.option,
            selectedUniversity === uni && s.optionSelected,
          ]}
          onPress={() => setSelectedUniversity(uni)}
        >
          <Text
            style={[
              s.optionText,
              selectedUniversity === uni && s.optionTextSelected,
            ]}
          >
            {uni}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Role selection */}
      <Text style={s.sectionTitle}>I am a...</Text>
      <View style={s.roleRow}>
        <TouchableOpacity
          style={[
            s.roleCard,
            role === 'student' && s.roleSelected,
          ]}
          onPress={() => setRole('student')}
        >
          <Text style={s.roleText}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            s.roleCard,
            role === 'tutor' && s.roleSelected,
          ]}
          onPress={() => setRole('tutor')}
        >
          <Text style={s.roleText}>Tutor / Lecturer</Text>
        </TouchableOpacity>
      </View>

      {/* Continue */}
      <TouchableOpacity
        style={[s.continueBtn, !canContinue && s.disabled]}
        disabled={!canContinue}
        onPress={handleContinue}
      >
        <Text style={s.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 20,
    marginBottom: 8,
  },
  option: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  optionSelected: {
    borderColor: '#4A56E2',
    backgroundColor: '#EEF2FF',
  },
  optionText: {
    color: '#374151',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#4A56E2',
    fontWeight: '600',
  },
  roleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  roleSelected: {
    borderColor: '#4A56E2',
    backgroundColor: '#EEF2FF',
  },
  roleText: {
    fontWeight: '600',
    color: '#111827',
  },
  continueBtn: {
    backgroundColor: '#4A56E2',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  disabled: {
    opacity: 0.5,
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
