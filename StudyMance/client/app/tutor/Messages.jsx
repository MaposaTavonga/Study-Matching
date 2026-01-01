import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MessagesScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'groups'
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [messageDraft, setMessageDraft] = useState('');
  const flatListRef = useRef();

  // Dummy data for conversations
  const conversations = [
    {
      id: 1,
      type: 'individual',
      name: 'Sarah M',
      avatarColor: '#FF6B6B',
      lastMessage: 'Thank you for the clarification on limits!',
      lastTime: '10:30 AM',
      unreadCount: 3,
      isOnline: true,
      studentId: 101,
      module: 'MAT101 - Calculus I',
    },
    {
      id: 2,
      type: 'group',
      name: 'Calculus I Study Group',
      avatarColor: '#4F46E5',
      lastMessage: 'Emily: When is our next session?',
      lastTime: 'Yesterday',
      unreadCount: 0,
      memberCount: 8,
      students: ['Sarah M', 'John D', 'Alex T', 'Emma W', 'Michael B', 'Lisa P', 'David L', 'Sophia K'],
    },
    {
      id: 3,
      type: 'individual',
      name: 'John D',
      avatarColor: '#4ECDC4',
      lastMessage: 'I\'ve completed the practice problems',
      lastTime: '2 days ago',
      unreadCount: 0,
      isOnline: false,
      studentId: 102,
      module: 'PHYS101 - Mechanics',
    },
    {
      id: 4,
      type: 'individual',
      name: 'Alex T',
      avatarColor: '#FFD166',
      lastMessage: 'Can we reschedule our session to Friday?',
      lastTime: '3 days ago',
      unreadCount: 1,
      isOnline: true,
      studentId: 103,
      module: 'CHEM101 - Organic Chemistry',
    },
    {
      id: 5,
      type: 'group',
      name: 'Physics Study Group',
      avatarColor: '#06D6A0',
      lastMessage: 'Meeting notes from yesterday attached',
      lastTime: '1 week ago',
      unreadCount: 0,
      memberCount: 5,
      students: ['John D', 'Robert T', 'Olivia M', 'James W', 'Emily R'],
    },
    {
      id: 6,
      type: 'individual',
      name: 'Emma W',
      avatarColor: '#A78BFA',
      lastMessage: 'Thank you for the feedback!',
      lastTime: '1 week ago',
      unreadCount: 0,
      isOnline: false,
      studentId: 104,
      module: 'MAT201 - Calculus II',
    },
    {
      id: 7,
      type: 'group',
      name: 'Chemistry Lab Group',
      avatarColor: '#EF476F',
      lastMessage: 'Reminder: Lab safety quiz tomorrow',
      lastTime: '2 weeks ago',
      unreadCount: 0,
      memberCount: 4,
      students: ['Alex T', 'Lisa P', 'Michael B', 'Sophia K'],
    },
    {
      id: 8,
      type: 'individual',
      name: 'Michael B',
      avatarColor: '#118AB2',
      lastMessage: 'I need help with integration problems',
      lastTime: '2 weeks ago',
      unreadCount: 0,
      isOnline: true,
      studentId: 105,
      module: 'MAT202 - Linear Algebra',
    },
  ];

  // Dummy data for messages in a conversation
  const conversationMessages = {
    1: [
      {
        id: 1,
        sender: 'tutor',
        text: 'Hi Sarah, how can I help you today?',
        time: '9:45 AM',
        status: 'read',
      },
      {
        id: 2,
        sender: 'student',
        text: 'I\'m having trouble understanding limits approaching infinity',
        time: '9:46 AM',
      },
      {
        id: 3,
        sender: 'tutor',
        text: 'No problem! Let me explain with an example.',
        time: '9:48 AM',
        status: 'read',
      },
      {
        id: 4,
        sender: 'tutor',
        text: 'Consider lim(x→∞) (3x² + 2x + 1) / (x² + 4). The key is to divide numerator and denominator by the highest power of x.',
        time: '9:50 AM',
        status: 'read',
      },
      {
        id: 5,
        sender: 'student',
        text: 'That makes sense! So it would simplify to 3/1 = 3?',
        time: '9:52 AM',
      },
      {
        id: 6,
        sender: 'tutor',
        text: 'Exactly! You got it. Here are some practice problems to try.',
        time: '9:53 AM',
        status: 'delivered',
        attachment: {
          type: 'pdf',
          name: 'Limits_Practice.pdf',
          size: '2.4 MB',
        },
      },
      {
        id: 7,
        sender: 'student',
        text: 'Thank you for the clarification on limits! I\'ll work on these problems.',
        time: '10:30 AM',
      },
    ],
  };

  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  // Filter conversations based on active tab and search
  const getFilteredConversations = () => {
    let filtered = conversations;
    
    // Apply tab filter
    if (activeTab === 'unread') {
      filtered = filtered.filter(conv => conv.unreadCount > 0);
    } else if (activeTab === 'groups') {
      filtered = filtered.filter(conv => conv.type === 'group');
    } else if (activeTab === 'individual') {
      filtered = filtered.filter(conv => conv.type === 'individual');
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (conv.module && conv.module.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  // Load messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const conversationId = selectedConversation.id;
      const initialMessages = conversationMessages[conversationId] || [];
      setMessages(initialMessages);
      
      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'tutor',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate student reply after 2 seconds
    setTyping(true);
    setTimeout(() => {
      const studentReply = {
        id: messages.length + 2,
        sender: 'student',
        text: 'Thanks! I\'ll review this.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, studentReply]);
      setTyping(false);
      
      // Scroll to bottom
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 2000);
  };

  const handleStartNewConversation = () => {
    setShowNewMessageModal(true);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    // Mark as read
    conversation.unreadCount = 0;
  };

  const ConversationItem = ({ conversation }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => handleSelectConversation(conversation)}
      activeOpacity={0.7}
    >
      <View style={styles.conversationLeft}>
        <View style={[styles.avatar, { backgroundColor: conversation.avatarColor }]}>
          {conversation.type === 'group' ? (
            <Ionicons name="people" size={24} color="#fff" />
          ) : (
            <Text style={styles.avatarText}>{conversation.name.charAt(0)}</Text>
          )}
          {conversation.type === 'individual' && conversation.isOnline && (
            <View style={styles.onlineIndicator} />
          )}
        </View>
        
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName}>{conversation.name}</Text>
            <Text style={styles.conversationTime}>{conversation.lastTime}</Text>
          </View>
          
          <Text 
            style={[
              styles.conversationMessage,
              conversation.unreadCount > 0 && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>
          
          {conversation.module && (
            <View style={styles.moduleTag}>
              <Text style={styles.moduleText}>{conversation.module}</Text>
            </View>
          )}
          
          {conversation.type === 'group' && (
            <View style={styles.groupInfo}>
              <Ionicons name="people-outline" size={12} color="#9CA3AF" />
              <Text style={styles.groupCount}>{conversation.memberCount} members</Text>
            </View>
          )}
        </View>
      </View>
      
      {conversation.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{conversation.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const MessageBubble = ({ message, isLast }) => (
    <View style={[
      styles.messageContainer,
      message.sender === 'tutor' ? styles.tutorMessage : styles.studentMessage,
    ]}>
      {message.sender === 'student' && selectedConversation && (
        <View style={[styles.smallAvatar, { backgroundColor: selectedConversation.avatarColor }]}>
          <Text style={styles.smallAvatarText}>{selectedConversation.name.charAt(0)}</Text>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        message.sender === 'tutor' ? styles.tutorBubble : styles.studentBubble,
      ]}>
        <Text style={[
          styles.messageText,
          message.sender === 'tutor' ? styles.tutorMessageText : styles.studentMessageText,
        ]}>
          {message.text}
        </Text>
        
        <View style={styles.messageFooter}>
          <Text style={styles.messageTime}>{message.time}</Text>
          
          {message.sender === 'tutor' && (
            <Ionicons 
              name={message.status === 'read' ? 'checkmark-done' : 'checkmark'} 
              size={14} 
              color={message.status === 'read' ? '#4F46E5' : '#9CA3AF'} 
              style={styles.statusIcon}
            />
          )}
        </View>
        
        {message.attachment && (
          <TouchableOpacity style={styles.attachment}>
            <Ionicons 
              name={message.attachment.type === 'pdf' ? 'document-text' : 'document'} 
              size={20} 
              color="#4F46E5" 
            />
            <View style={styles.attachmentInfo}>
              <Text style={styles.attachmentName}>{message.attachment.name}</Text>
              <Text style={styles.attachmentSize}>{message.attachment.size}</Text>
            </View>
            <Ionicons name="download-outline" size={20} color="#4F46E5" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const ConversationList = () => (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerSubtitle}>
              {getFilteredConversations().length} conversations
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.newMessageButton}
            onPress={handleStartNewConversation}
          >
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.newMessageText}>New</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {['all', 'unread', 'individual', 'groups'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Conversations List */}
      <FlatList
        data={getFilteredConversations()}
        renderItem={({ item }) => <ConversationItem conversation={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons 
              name={activeTab === 'unread' ? 'notifications-off' : 'chatbubbles-outline'} 
              size={60} 
              color="#D1D5DB" 
            />
            <Text style={styles.emptyTitle}>
              {searchQuery ? 'No matches found' : 'No conversations yet'}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'Try searching with different keywords'
                : activeTab === 'unread' 
                  ? 'You\'re all caught up!'
                  : 'Start a conversation with your students'
              }
            </Text>
            <TouchableOpacity
              style={styles.startConversationButton}
              onPress={handleStartNewConversation}
            >
              <Text style={styles.startConversationText}>Start New Conversation</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );

  const ChatScreen = () => (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.container}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedConversation(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          
          <View style={styles.chatHeaderInfo}>
            <View style={[styles.avatar, { backgroundColor: selectedConversation.avatarColor }]}>
              {selectedConversation.type === 'group' ? (
                <Ionicons name="people" size={24} color="#fff" />
              ) : (
                <Text style={styles.avatarText}>{selectedConversation.name.charAt(0)}</Text>
              )}
              {selectedConversation.type === 'individual' && selectedConversation.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>
            
            <View style={styles.chatHeaderText}>
              <Text style={styles.chatName}>{selectedConversation.name}</Text>
              {selectedConversation.type === 'individual' ? (
                <Text style={styles.chatStatus}>
                  {selectedConversation.isOnline ? 'Online' : 'Last seen recently'}
                </Text>
              ) : (
                <Text style={styles.chatStatus}>
                  {selectedConversation.memberCount} members • {selectedConversation.students?.slice(0, 3).join(', ')}
                  {selectedConversation.students?.length > 3 && '...'}
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="call-outline" size={22} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="videocam-outline" size={22} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerAction}>
              <Ionicons name="ellipsis-vertical" size={22} color="#4F46E5" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item, index }) => (
            <MessageBubble 
              message={item} 
              isLast={index === messages.length - 1}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={
            <View style={styles.dateSeparator}>
              <Text style={styles.dateText}>Today</Text>
            </View>
          }
        />
        
        {/* Typing Indicator */}
        {typing && (
          <View style={styles.typingIndicator}>
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>typing...</Text>
            </View>
          </View>
        )}
        
        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Ionicons name="attach" size={24} color="#4F46E5" />
          </TouchableOpacity>
          
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={`Message ${selectedConversation.name}`}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
              maxLength={500}
            />
            {newMessage.length > 0 && (
              <Text style={styles.charCount}>{newMessage.length}/500</Text>
            )}
          </View>
          
          {newMessage.trim() ? (
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.voiceButton}>
              <Ionicons name="mic" size={22} color="#4F46E5" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const NewMessageModal = () => (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>New Message</Text>
          <TouchableOpacity onPress={() => setShowNewMessageModal(false)}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students or groups..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <Text style={styles.modalSectionTitle}>Recent Conversations</Text>
        <ScrollView style={styles.modalList}>
          {conversations.slice(0, 5).map(conv => (
            <TouchableOpacity
              key={conv.id}
              style={styles.modalConversationItem}
              onPress={() => {
                setSelectedConversation(conv);
                setShowNewMessageModal(false);
              }}
            >
              <View style={[styles.avatar, { backgroundColor: conv.avatarColor }]}>
                {conv.type === 'group' ? (
                  <Ionicons name="people" size={20} color="#fff" />
                ) : (
                  <Text style={styles.avatarText}>{conv.name.charAt(0)}</Text>
                )}
              </View>
              <View style={styles.modalConversationInfo}>
                <Text style={styles.modalConversationName}>{conv.name}</Text>
                {conv.module && (
                  <Text style={styles.modalConversationModule}>{conv.module}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={() => navigation.navigate('CreateGroup')}
        >
          <View style={[styles.avatar, { backgroundColor: '#4F46E5' }]}>
            <Ionicons name="people-add" size={20} color="#fff" />
          </View>
          <Text style={styles.createGroupText}>Create New Group</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {selectedConversation ? (
        <ChatScreen />
      ) : (
        <ConversationList />
      )}
      
      {showNewMessageModal && <NewMessageModal />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Conversation List Styles
  header: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  newMessageButton: {
    flexDirection: 'row',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newMessageText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4F46E5',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -8,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#4F46E5',
    borderRadius: 1.5,
  },
  conversationsList: {
    padding: 20,
    paddingBottom: 100,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  conversationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#fff',
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  conversationTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  conversationMessage: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
  },
  unreadMessage: {
    color: '#1F2937',
    fontWeight: '500',
  },
  moduleTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 6,
  },
  moduleText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  groupCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadBadge: {
    backgroundColor: '#4F46E5',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  
  // Chat Screen Styles
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatHeaderText: {
    marginLeft: 12,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  chatStatus: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAction: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    padding: 20,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  tutorMessage: {
    justifyContent: 'flex-end',
  },
  studentMessage: {
    justifyContent: 'flex-start',
  },
  smallAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  smallAvatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
  },
  tutorBubble: {
    backgroundColor: '#EEF2FF',
    borderBottomRightRadius: 4,
  },
  studentBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  tutorMessageText: {
    color: '#1F2937',
  },
  studentMessageText: {
    color: '#1F2937',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginRight: 4,
  },
  statusIcon: {
    marginLeft: 2,
  },
  attachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  attachmentInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  attachmentSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  dateSeparator: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateText: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  typingBubble: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typingText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
    maxHeight: 100,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    color: '#1F2937',
    maxHeight: 80,
  },
  charCount: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    fontSize: 11,
    color: '#9CA3AF',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  startConversationButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  startConversationText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  
  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  modalList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalConversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalConversationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  modalConversationName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  modalConversationModule: {
    fontSize: 14,
    color: '#6B7280',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  createGroupText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginLeft: 12,
  },
});