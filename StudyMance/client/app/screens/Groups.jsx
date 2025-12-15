import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Modal,
  FlatList
} from 'react-native';
import AvatarPlaceholder from '../../assets/images/icon.png';

// Sample student data
const students = [
  { id: 1, name: 'John', course: 'CS', year: 3, progress: 60, strongModules: ['OS','Databases'], weakModules: ['Algorithms'], availableTimes: ['Mon 10-12','Thu 12-14'] },
  { id: 2, name: 'Mary', course: 'CS', year: 3, progress: 55, strongModules: ['Algorithms','Data Structures'], weakModules: ['Networking'], availableTimes: ['Mon 10-12','Wed 14-16'] },
  { id: 3, name: 'Peter', course: 'CS', year: 3, progress: 50, strongModules: ['Networking'], weakModules: ['Data Structures'], availableTimes: ['Mon 10-12','Wed 14-16'] },
  { id: 4, name: 'Linda', course: 'CS', year: 3, progress: 58, strongModules: ['OS'], weakModules: ['Databases'], availableTimes: ['Tue 14-16','Thu 12-14'] },
  { id: 5, name: 'Mark', course: 'CS', year: 3, progress: 52, strongModules: ['Databases'], weakModules: ['Networking'], availableTimes: ['Wed 14-16'] },
];

// All available modules for filtering
const ALL_MODULES = ['OS', 'Databases', 'Algorithms', 'Data Structures', 'Networking'];

// Seed student
const currentStudent = {
  id: 0,
  name: 'Sarah',
  course: 'CS',
  year: 3,
  progress: 53,
  strongModules: ['Data Structures','Algorithms'],
  weakModules: ['OS','Networking'],
  availableTimes: ['Mon 10-12','Wed 14-16'],
};

// Matching score function
const matchScore = (studentA, studentB) => {
  let score = 0;
  studentA.weakModules.forEach(weak => { 
    if(studentB.strongModules.includes(weak)) score += 2; 
  });
  studentA.weakModules.forEach(weak => { 
    if(studentB.weakModules.includes(weak)) score += 1; 
  });
  
  const progressDiff = Math.abs(studentA.progress - studentB.progress);
  if(progressDiff <= 10) score += 2; 
  else if(progressDiff <= 20) score += 1;
  
  const overlap = studentA.availableTimes.filter(t => studentB.availableTimes.includes(t));
  score += overlap.length * 3;
  
  if(studentA.course === studentB.course) score += 1;
  if(studentA.year === studentB.year) score += 1;
  
  return score;
};

// Form groups function
const formStudyGroups = (seedStudent, allStudents, maxGroupSize = 4, selectedModule = null) => {
  let filteredStudents = allStudents.filter(s => s.id !== seedStudent.id);
  
  // Filter by module if selected
  if (selectedModule) {
    filteredStudents = filteredStudents.filter(student => 
      student.strongModules.includes(selectedModule) || 
      student.weakModules.includes(selectedModule)
    );
  }
  
  const scores = filteredStudents
    .map(s => ({ 
      student: s, 
      score: matchScore(seedStudent, s),
      matchingModules: seedStudent.weakModules.filter(weak => 
        s.strongModules.includes(weak)
      )
    }))
    .sort((a, b) => b.score - a.score);
  
  const group = [seedStudent];
  for (let i = 0; i < scores.length && group.length < maxGroupSize; i++) {
    group.push({ ...scores[i].student, matchScore: scores[i].score, matchingModules: scores[i].matchingModules });
  }
  return group;
};

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const group1 = formStudyGroups(currentStudent, students, 5, selectedModule);
    const group2 = formStudyGroups(students[3], students, 5, selectedModule);
    setGroups([group1, group2]);
  }, [selectedModule]);

  const toggleExpand = (idx) => {
    setExpandedGroups(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleJoinGroup = (group) => {
    setSelectedGroup(group);
    setModalVisible(true);
  };

  const filteredGroups = groups.filter(group => 
    group.some(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const getMatchQuality = (score) => {
    if (score >= 8) return { text: 'Excellent Match', color: '#10B981' };
    if (score >= 5) return { text: 'Good Match', color: '#3B82F6' };
    if (score >= 3) return { text: 'Fair Match', color: '#F59E0B' };
    return { text: 'Basic Match', color: '#EF4444' };
  };

  return (
    <View style={s.container}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Study Groups</Text>
        <Text style={s.subtitle}>Find your perfect study partners</Text>
      </View>

      {/* Search and Filters */}
      <View style={s.filtersContainer}>
        <View style={s.searchContainer}>
          <TextInput
            style={s.searchInput}
            placeholder="Search students or courses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.modulesScroll}>
          <TouchableOpacity 
            style={[s.moduleChip, !selectedModule && s.moduleChipActive]}
            onPress={() => setSelectedModule(null)}
          >
            <Text style={[s.moduleChipText, !selectedModule && s.moduleChipTextActive]}>
              All Modules
            </Text>
          </TouchableOpacity>
          {ALL_MODULES.map(module => (
            <TouchableOpacity 
              key={module}
              style={[s.moduleChip, selectedModule === module && s.moduleChipActive]}
              onPress={() => setSelectedModule(selectedModule === module ? null : module)}
            >
              <Text style={[s.moduleChipText, selectedModule === module && s.moduleChipTextActive]}>
                {module}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Groups List */}
      <ScrollView style={s.groupsList} showsVerticalScrollIndicator={false}>
        <Text style={s.resultsText}>
          {filteredGroups.length} {filteredGroups.length === 1 ? 'Group' : 'Groups'} Found
          {selectedModule && ` for ${selectedModule}`}
        </Text>

        {filteredGroups.map((group, idx) => {
          const isExpanded = expandedGroups[idx];
          const visibleMembers = isExpanded ? group : group.slice(0, 3);
          const matchQuality = getMatchQuality(group[1]?.matchScore || 0);

          return (
            <View key={idx} style={s.groupCard}>
              <View style={s.groupHeader}>
                <View>
                  <Text style={s.groupTitle}>Study Group {idx + 1}</Text>
                  <Text style={s.groupSubtitle}>
                    {group.length} members • {matchQuality.text}
                  </Text>
                </View>
                <View style={[s.matchBadge, { backgroundColor: matchQuality.color }]}>
                  <Text style={s.matchScore}>{group[1]?.matchScore || 0}</Text>
                </View>
              </View>

              {/* Members Grid */}
              <View style={s.membersContainer}>
                {visibleMembers.map((student, studentIdx) => (
                  <View key={student.id} style={[
                    s.memberCard,
                    studentIdx === 0 && s.currentUserCard
                  ]}>
                    <Image source={AvatarPlaceholder} style={s.avatar} />
                    <Text style={s.name}>{student.name}</Text>
                    <Text style={s.details}>{student.course}, Year {student.year}</Text>
                    {student.matchScore > 0 && (
                      <View style={s.scoreBadge}>
                        <Text style={s.scoreText}>+{student.matchScore}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>

              {/* Expand/Collapse */}
              {group.length > 3 && (
                <TouchableOpacity 
                  style={s.seeMoreButton}
                  onPress={() => toggleExpand(idx)}
                >
                  <Text style={s.seeMoreText}>
                    {isExpanded ? 'Show Less' : `Show ${group.length - 3} More Members`}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Matching Modules */}
              {group[1]?.matchingModules?.length > 0 && (
                <View style={s.matchingContainer}>
                  <Text style={s.matchingTitle}>They can help you with:</Text>
                  <View style={s.matchingModules}>
                    {group[1].matchingModules.map(module => (
                      <View key={module} style={s.helpModuleChip}>
                        <Text style={s.helpModuleText}>{module}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity 
                style={s.joinButton}
                onPress={() => handleJoinGroup(group)}
              >
                <Text style={s.joinButtonText}>Join This Group</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Join Group Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={s.modalContainer}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Join Study Group?</Text>
            <Text style={s.modalSubtitle}>
              You're about to join a group with {selectedGroup?.length || 0} members
            </Text>
            
            <View style={s.modalActions}>
              <TouchableOpacity 
                style={[s.modalButton, s.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={s.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[s.modalButton, s.confirmButton]}
                onPress={() => {
                  setModalVisible(false);
                  // Handle join logic here
                  alert('Successfully joined the study group!');
                }}
              >
                <Text style={s.confirmButtonText}>Join Group</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC', 
    paddingHorizontal: 20, 
    paddingTop: 60 
  },
  header: {
    marginBottom: 24,
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#1E293B', 
    marginBottom: 4 
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  modulesScroll: {
    flexGrow: 0,
  },
  moduleChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleChipActive: {
    backgroundColor: '#4A56E2',
  },
  moduleChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  moduleChipTextActive: {
    color: '#FFFFFF',
  },
  groupsList: {
    flex: 1,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 16,
  },
  groupCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 20, 
    padding: 20, 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 12, 
    elevation: 5 
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  groupTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginBottom: 4 
  },
  groupSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  matchBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchScore: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  membersContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 12,
    marginBottom: 12,
  },
  memberCard: { 
    width: 100, 
    alignItems: 'center', 
    marginBottom: 12,
    position: 'relative',
  },
  currentUserCard: {
    opacity: 0.8,
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    marginBottom: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  name: { 
    fontSize: 14, 
    fontWeight: '700', 
    color: '#111827', 
    textAlign: 'center' 
  },
  details: { 
    fontSize: 12, 
    color: '#6B7280', 
    textAlign: 'center' 
  },
  scoreBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#10B981',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  seeMoreButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  seeMoreText: { 
    color: '#4A56E2', 
    fontWeight: '600', 
    fontSize: 14,
  },
  matchingContainer: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  matchingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  matchingModules: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  helpModuleChip: {
    backgroundColor: '#4A56E2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  helpModuleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  joinButton: { 
    backgroundColor: '#4A56E2', 
    paddingVertical: 14, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#4A56E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  joinButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  confirmButton: {
    backgroundColor: '#4A56E2',
  },
  cancelButtonText: {
    color: '#64748B',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});