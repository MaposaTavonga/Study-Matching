import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import MatchesList from '../components/MatchesList';
import GroupsList from '../components/GroupsList';
import TutorsList from '../components/TutorsList';
import SuccessStories from '../components/SuccessStories';
import { Image } from 'react-native';
import Studymatchespic from '../../assets/images/Studymatchespic.png';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';

export default function LandingScreen() {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();

  // Dummy data
  const matches = [
    { id: 1, name: 'John D.', initials: 'JD', course: 'Year 2, CompSci' },
    { id: 2, name: 'Alice B.', initials: 'AB', course: 'Year 1, Maths' },
    { id: 3, name: 'Chloe C.', initials: 'CC', course: 'Year 3, Physics' },
  ];

  const groups = [
    { id: 1, name: 'Calculus Study Group', module: 'MAT101', tutor: 'Mr. Lee', time: 'Mon 4 PM' },
    { id: 3, name: 'Calculus Study Group', module: 'MAT101', tutor: 'Mr. Lee', time: 'Mon 4 PM' },
  ];

  const tutors = [
    { id: 1, subject: 'Physics 101 Help', module: 'PHYS101', name: 'Dr. Emily W', subjects: ['Physics'], time: 'Tue 3 PM', rate: 30 },
    { id: 2, subject: 'Phy', module: 'PHYS101', name: 'Dr. Emily W', subjects: ['Physics'], time: 'Tue 3 PM', rate: 30 }
  ];

  const stories = [
    { id: 1, text: 'StudyMance helped me find a study partner for Calculus – we aced our final exam! My grade improved from a C to an A.', author: 'Sarah, Year 3' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <StatusBar barStyle="light-content" backgroundColor="#4A56E2" />

      {/* Header */}
      <View style={{
        width: '100%',
        backgroundColor: '#4A56E2',
        paddingHorizontal: 16,
      
        paddingVertical: 10,
       marginBottom: 15,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12
      }}>
     
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>Hi, Sarah</Text>
          <View style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#3B46C0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
  <Text style={{ color: 'white', fontWeight: 'bold' }}>S</Text>
</TouchableOpacity>

          </View>
       

        
      </View>

  

      {/* Scrollable content */}

      <ScrollView style={{ flex: 1, marginTop: 10, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 , justifyContent:'center'}}>
            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center',width: 2/3 }}>
        <TouchableOpacity style={{
          backgroundColor: '#3B46C0',
          paddingVertical: 10,
          borderRadius: 100,
          alignItems: 'center',
          marginBottom: 8,
          
        }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Explore Study Matches</Text>
        </TouchableOpacity>

        <Text style={{  
  fontFamily: 'Inter',
  fontSize: 12,
  lineHeight: 16,
  fontWeight: '400',
  color: '#4B5563', }}>
          Connect with students in your degree, year, and modules to study smarter together.
        </Text>

            </View>
            <View style={{ flex: 1, alignItems: 'center', width: 1/3 }}>
 <Image source={Studymatchespic} style={{ width: 100, height: 100, marginLeft: 10 }} />
                </View>

    

        </View>
        <MatchesList matches={matches} />
        <GroupsList groups={groups} />
        <TutorsList tutors={tutors} />
        <SuccessStories stories={stories} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
}
