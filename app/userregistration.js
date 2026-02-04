import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';
import {useState } from 'react';
import { useRouter } from 'expo-router';

export default function UserRegistration(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>User Registration</Text>
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
    title: {
        fontSize: 24,
        color: '#FF9494',
        fontWeight: 'bold', 
        position: 'absolute',
        top: 65,
    },
    formContainer: {
    },
    input: {
    },
    registerButton: {
    },
    registerButtonTest:{

    },
});