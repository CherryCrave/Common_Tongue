import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://10.2.15.149:3000';

export default function ChatScreen() {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('Guest');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const connect = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedUsername = await AsyncStorage.getItem('username');

        if (!isMounted) return;

        setUserId(storedUserId);
        setUsername(storedUsername || 'Guest');

        const socket = io(SERVER_URL, {
          transports: ['websocket'],
          auth: {
            token,
            username: storedUsername || 'Guest',
          },
        });

        socketRef.current = socket;
        setConnecting(true);

        socket.on('connect', () => {
          setConnected(true);
          setConnecting(false);
        });

        socket.on('disconnect', () => {
          setConnected(false);
        });

        socket.on('connect_error', (err) => {
          console.error('Socket connect_error:', err?.message || err);
          setConnected(false);
          setConnecting(false);
        });

        socket.on('chat:history', (history) => {
          setMessages(Array.isArray(history) ? history : []);
        });

        socket.on('chat:message', (message) => {
          setMessages((prev) => [...prev, message].slice(-200));
        });
      } catch (err) {
        console.error('Chat connect error:', err);
        setConnecting(false);
      }
    };

    connect();

    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      Alert.alert('Empty message', 'Type a message first.');
      return;
    }

    const socket = socketRef.current;
    if (!socket || !socket.connected) {
      Alert.alert('Not connected', 'Chat is not connected yet. Please wait a moment and try again.');
      return;
    }

    setText('');
    setSending(true);

    socket.emit('chat:message', { text: trimmed }, (ack) => {
      setSending(false);
      if (!ack?.ok) {
        Alert.alert('Send failed', ack?.error || 'Failed to send message.');
      }
    });
  };

  const renderMessage = ({ item }) => {
    const isMine =
      (item?.user?.userId && userId && String(item.user.userId) === String(userId)) ||
      (!item?.user?.userId && item?.user?.username && item.user.username === username);

    return (
      <View style={[styles.messageRow, isMine ? styles.messageRowMine : styles.messageRowOther]}>
        {!isMine && (
          <Text style={styles.messageMeta}>{item?.user?.username || 'Guest'}</Text>
        )}
        <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleOther]}>
          <Text style={[styles.bubbleText, isMine ? styles.bubbleTextMine : styles.bubbleTextOther]}>
            {item?.text}
          </Text>
        </View>
        <Text style={styles.messageTime}>
          {item?.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>Discuss with fellow teachers</Text>
        <Text style={styles.status}>
          {connecting ? 'Connecting…' : connected ? 'Online' : 'Offline'}
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message…"
          placeholderTextColor="#FFB4B4"
          value={text}
          onChangeText={setText}
          editable={!sending}
        />
        <TouchableOpacity
          style={[styles.sendButton, (sending || !connected) && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={sending || !connected}
        >
          {sending ? (
            <ActivityIndicator color="#FFF5E4" />
          ) : (
            <Text style={styles.sendButtonText}> Send </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 4,
  },
  subtitle: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
  },
  status: {
    marginTop: 6,
    color: '#FFB4B4',
    fontSize: 12,
    fontFamily: 'Arial',
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  messageRow: {
    marginBottom: 10,
    maxWidth: '85%',
  },
  messageRowMine: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  messageRowOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageMeta: {
    color: '#FF9494',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bubble: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
  },
  bubbleMine: {
    backgroundColor: '#FF9494',
    borderColor: '#FF9494',
  },
  bubbleOther: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFB4B4',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Arial',
  },
  bubbleTextMine: {
    color: '#FFF5E4',
  },
  bubbleTextOther: {
    color: '#333',
  },
  messageTime: {
    marginTop: 4,
    color: '#FFB4B4',
    fontSize: 11,
    fontFamily: 'Arial',
  },

  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: '#FFB4B4',
    backgroundColor: '#FFF5E4',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFB4B4',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FF9494',
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFF5E4',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
});
