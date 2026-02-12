import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTheUserData = async() => {
      try{
        const storedUsername = await AsyncStorage.getItem('username');
        const storedUserId = await AsyncStorage.getItem('userId'); // Kept for backend, not for display purposes

        setUsername(storedUsername || 'User username');
        setUserId(storedUserId || '');

        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Could not load profile. Please try again later.');
        setIsLoading(false);
      }
    }
    loadTheUserData();
  }, []); // Should load only the once, which is when the page is opened. Might possible re-run when the username changes, still not sure.

  const handleLogout = async() => {
    Alert.alert('Logout', 'Are you sure you would like to logout?', 
    [
      {text: 'Cancel', onPress: () => {}},
      {
        text: 'Logout', onPress: async() => {
          await AsyncStorage.removeItem('UserToken');
          await AsyncStorage.removeItem('UserId');
          await AsyncStorage.removeItem('username');
          Alert.alert('Success', 'You have been successfully logged out.');
          router.push('/userhub');
        },
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Pressable
            style={styles.smallLogoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.smallLogoutButtonText}>Logout</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <Text style = {styles.loadingText}>
            Loading your profile...
          </Text>
        ) : (
          <View style = {styles.userInformationContainer}>
            <View style = {styles.informationBox}>
              <Text style = {styles.label}>Username:</Text>
              <Text style={styles.value}>{username}</Text>
            </View>
          </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#FF9494',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  smallLogoutButton: {
    backgroundColor: '#FF9494',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  smallLogoutButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  loadingText: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
    textAlign: 'center',
  },
  userInformationContainer: {
    width: '100%',
    alignItems: 'center',
  },
  informationBox: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#FF9494',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  label: {
    color: '#FF9494',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  value: {
    color: '#FF9494',
    fontSize: 18,
    marginTop: 5,
    fontFamily: 'Arial',
  },
});
