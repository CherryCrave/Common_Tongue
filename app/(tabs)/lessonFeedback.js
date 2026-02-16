import { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LessonFeedbackScreen() {
  const [lessonPlan, setLessonPlan] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async() => {
    if (!lessonPlan.trim()) {
      Alert.alert('Input Required', 'Please enter a lesson plan in order to get your feedback.');
      return;
    }
    setLoading(true);
    setFeedback('');

    try {
      const response = await fetch('http://10.2.15.149:3000/api/lessonFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonPlan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get feedback. Please try again later.');
      }

      setFeedback(data.feedback);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error', 
        error.message || 'Failed to get feedback. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setLessonPlan('');
    setFeedback('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lesson Feedback</Text>
          <Text style={styles.subtitle}>Generate Lesson Evaluations</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Enter Your Lesson Plan:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={15}
            placeholder="Type your lesson plan here. Include objectives etc. Be specific for the best possible feedback :D"
            placeholderTextColor="#FFB4B4"
            value={lessonPlan}
            onChangeText={setLessonPlan}
            editable={!loading}
          />
          <Text style={styles.charCount}>{lessonPlan.length} characters</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF5E4" />
            ):(
              <Text style={styles.buttonText}>Get Feedback</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {feedback && (
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackTitle}>AI Feedback:</Text>
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>{feedback}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    //alignItems: 'center',
    //justifyContent: 'center',
  },

  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginBottom: 5,
  },

  subtitle: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
    textAlign: 'center',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
  },

  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputSection: {
    marginBottom: 20,
  },

  label: {
    color: '#FF9494',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFB4B4',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 200,
  },

  charCount: {
    color: '#FFB4B4',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  submitButton: {
    backgroundColor: '#FF9494',
  },

  clearButton: {
    backgroundColor: '#FFB4B4',
  },

  buttonText: {
    color: '#FFF5E4',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  feedbackSection: {
    marginTop: 20,
  },

  feedbackTitle: {
    color: '#FF9494',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  feedbackBox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFB4B4',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  feedbackText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
});
