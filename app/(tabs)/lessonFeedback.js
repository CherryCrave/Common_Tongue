import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonFeedbackScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lesson Feedback</Text>
        <Text style={styles.subtitle}>Generate Lesson Evaluations</Text>
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
