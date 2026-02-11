import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function UserLogin(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loginHandler = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'You must fill in both the email and password fields to login.');
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch('http://10.2.15.149:3000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('userToken', data.token);
                await AsyncStorage.setItem('userId', data.user.id.toString());
                await AsyncStorage.setItem('username', data.user.username);

                Alert.alert('Success', `Login successful. Welcome ${data.user.username}!`);
                router.push('/(tabs)'); // Navigation to tab screen if login is sucessful.
            } else {
                Alert.alert('Error', data.error || 'Login failed. Please check your email address and/or password. Then try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'Could not connect to the server. Try again later please.');
        } finally {
            setIsLoading(false);
        }
        }
    
    return(
        <View style={styles.container}>
            <Text style={styles.title}>User Login</Text>
            
            <View style={styles.formContainer}>
                <TextInput style = {styles.input}
                    placeholder="Enter your email address..."
                    placeholderTextColor="#FF9494"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    capitalize="none"
                />
                <TextInput style = {styles.input}
                    placeholder="Enter your password..."
                    placeholderTextColor="#FF9494"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Pressable style = {styles.loginButton}
                    onPress={loginHandler}
                    disabled={isLoading}
                >
                    <Text style={styles.loginButtonText}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Text>
                </Pressable>
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
        justifyContent: 'center',
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
    loginButton: {
        width: '100%',
        backgroundColor: '#FF9494',
        padding: 15,
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
});