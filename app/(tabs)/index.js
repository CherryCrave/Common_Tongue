import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Common Tongue</Text>
        <Text style={styles.subtitle}>Streamline your EFL teaching</Text>
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
  welcomeText: {
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
