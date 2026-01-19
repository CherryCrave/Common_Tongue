import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function UserHub() {
    return (
        <View style={styles.container}>
            <Link href="/(tabs)" asChild>
                <Pressable style={styles.compassButton}>
                    <Ionicons name="compass" size={32} color="#FF9494" />
                </Pressable>
            </Link>
            <Text style={styles.title}>User Hub</Text>
            <Link href="/userlogin" style={styles.login}>
                <Text style={styles.login}> Login </Text>
            </Link>
            <Link href="/userregistration" style={styles.register}>
                <Text style={styles.register}> Register </Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF5E4',
    },
    compassButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        color: '#FF9494',
        fontWeight: 'bold', 
        position: 'absolute',
        top: 65,
    },
    register: {
        fontSize: 25,
        color: '#FF9494',
        marginVertical: 10,
        position: 'absolute',
        bottom: 125,
    },
    login: {
        fontSize: 30,
        color: '#FF9494',
        marginVertical: 10,
        position: 'absolute',
        middle: 0,
    }
});