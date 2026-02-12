import { Link, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [loginCheck, setLoginCheck] = useState(true); // Checking if AsyncStorage is working

  useEffect(() => {
    const checkAuthUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Can we get the userToken forom AsyncStorage

        if (token){
          router.replace('/(tabs)'); // If token exists
        } else {
          setLoginCheck(false); // If no token
        }
      } catch (error) {
        setLoginCheck(false) // If there's an error with the library
      }
    };

  checkAuthUserToken();
  }, []);

  return (
    <View style={styles.container}>
      {loginCheck ? (
        <>
          <ActivityIndicator size = "large" color="#FF9494"/>
          <Text style = {styles.loadingText}>Loading profile...</Text>
        </>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome to Common Tongue.</Text>
          <Link href="/userhub" style={styles.directToAccHub}>
          <Text style={styles.directToAccHub}>Account Hub</Text>
          </Link>
        </>
      )}
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcomeText: {
    color: '#FF9494',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial'  
  },

  directToAccHub: {
    color: '#FF9494',
    fontSize: 20,
    padding: 10,
    position: 'absolute',
    bottom: 105
  },

  loadingText: {
    color: '#FF9494',
    fontSize: 16,
    fontFamily: 'Arial',
    marginTop: 10,
  },
});
