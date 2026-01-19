import { StyleSheet, Text, View } from 'react-native';

export default function UserRegistration(){
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
});