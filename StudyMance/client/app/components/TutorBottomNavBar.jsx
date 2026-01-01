// app/components/TutorBottomNavBar.jsx
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TutorBottomNavBar({ activeTab, onTabPress }) {
  const navigation = useNavigation();

 
  const tabs = [
    { route: '/tutor', label: '🏠', title: 'Home' },
    { route: '/tutor/Session', label: '📅', title: 'Sessions' },
    { route: '/tutor/messages', label: '💬', title: 'Messages' },
    { route: '/tutor/TutorProfileScreen', label: '👤', title: 'Profile' },
  ];
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#E5E7EB',
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => {
              onTabPress(tab.name);
              navigation.navigate(tab.name);
            }}
            style={{ alignItems: 'center' }}
          >
            <Text style={{ fontSize: 24, opacity: isActive ? 1 : 0.5 }}>{tab.label}</Text>
            <Text style={{ fontSize: 12, fontWeight: isActive ? '700' : '400', color: isActive ? '#4F46E5' : '#6B7280' }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
