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
            <View style={styles.formContainer}>
                <TextInput style = {styles.input}
                    placeholder="Enter your email address..."
                    placeholderTextColor="#FF9494"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    capitalize="none"
                />

                <TextInput style={styles.input}
                placeholder="Choose a username..."
                placeholderTextColor="#FF9494"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                capitalize="none"
                />

                <TextInput style={styles.input}
                placeholder="Create a password..."
                placeholderTextColor="#FF9494"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                />
            </View>
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
        width: '85%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#FF9494',
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        fontSize: 18,
        backgroundColor: '#FFF',
        color: '#FF9494',
        fontFamily: 'Arial',
        //fontWeight: 'bold',
    },
    registerButton: {
    },
    registerButtonTest:{

    },
});