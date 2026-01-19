import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>Discuss with fellow teachers</Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
  },
});
