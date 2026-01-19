import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Common Tongue.</Text>
        <Link href="/userhub" style={styles.directToAccHub}>
          <Text style={styles.directToAccHub}>Account Hub</Text>
        </Link>
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
  }
});
