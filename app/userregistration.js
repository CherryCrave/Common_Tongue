import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function UserRegistration(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const registrationHandler = async () => {
        if(!email || !username || !password || !confirmPassword){
            Alert.alert('Error', 'Please fill in all fields to register an account with us.');
            return;
        }
        if(password !== confirmPassword){
            Alert.alert('Error', 'The passwords you have entered do not match. Please ensure that your confirm password matches with the one you have created.');
            return;
        }
        setIsLoading(true); // Boolean for the button being unpressable and showing loading to user.

        try{
            const response = await fetch('http://10.5.3.252:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, username, password}),
            })
            const data = await response.json(); // awaiting fetch response including the json depiction of the necessary data for registration.

            if(response.ok){
                Alert.alert('Success', 'Account registration is successful. Now you can login.');
                router.push('/userlogin'); // Navigates to login page if successful.
            } else {
                Alert.alert('Error', data.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try registration again.');
        } finally {
            setIsLoading(false);
        }
    };
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

                <TextInput style={styles.input}
                placeholder="Confirm your password..."
                placeholderTextColor="#FF9494"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
                />

                <Pressable style={styles.registerButton}
                onPress={registrationHandler}
                disabled={isLoading}>
                    <Text style={styles.registerButtonText}>
                        {isLoading ? 'Registering...' : 'Register'}
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
        width: '100%',
        backgroundColor: '#FF9494',
        padding: 15,
        borderRadius: 30,
        marginTop: 30,
        alignItems: 'center',
    },

    registerButtonText:{
        color: '#FFF' ,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial',
    },
});