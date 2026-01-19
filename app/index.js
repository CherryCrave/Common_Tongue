import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Common Tongue.</Text>
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

  text: {
    color: '#FF9494',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
