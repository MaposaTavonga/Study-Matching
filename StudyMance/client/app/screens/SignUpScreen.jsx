import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Later connect this to your backend / Firebase
    console.log('Signed up:', { firstName, surname, studentNumber, university, email, password });
    navigation.navigate('Login'); // Redirect to login after sign-up
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <View style={s.card}>
        <Text style={s.title}>Create Your Account</Text>
        <Text style={s.subtitle}>Join the community of learners 🌱</Text>

        {/* First Name */}
        <TextInput
          style={s.input}
          placeholder="First Name"
          placeholderTextColor="#9CA3AF"
          value={firstName}
          onChangeText={setFirstName}
        />

        {/* Surname */}
        <TextInput
          style={s.input}
          placeholder="Surname"
          placeholderTextColor="#9CA3AF"
          value={surname}
          onChangeText={setSurname}
        />

        {/* Student Number */}
        <TextInput
          style={s.input}
          placeholder="Student Number"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={studentNumber}
          onChangeText={setStudentNumber}
        />

        {/* University */}
        <TextInput
          style={s.input}
          placeholder="University"
          placeholderTextColor="#9CA3AF"
          value={university}
          onChangeText={setUniversity}
        />

        {/* Email */}
        <TextInput
          style={s.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <TextInput
          style={s.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm password */}
        <TextInput
          style={s.input}
          placeholder="Confirm Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Sign Up button */}
        <TouchableOpacity style={s.signUpBtn} onPress={handleSignUp}>
          <Text style={s.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Already have an account */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={s.loginText}>
            Already have an account? <Text style={s.loginLink}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 20,
    marginTop: 4,
  },
  input: {
    width: '100%',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
  },
  signUpBtn: {
    backgroundColor: '#4A56E2',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#6B7280',
    fontSize: 13.5,
  },
  loginLink: {
    color: '#4A56E2',
    fontWeight: '600',
  },
});
