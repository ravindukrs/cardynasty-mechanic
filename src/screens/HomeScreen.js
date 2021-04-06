import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';

export default function HomeScreen() {

    const { user, logout } = useContext(AuthContext);

    // useEffect(() => {
    //     (async () => {
    //       try {
    //         await Firebase.createNewUser({uid:1212121,name:"Ravindu"});
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     })()
    //   }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome user {user.uid}</Text>
            <FormButton buttonTitle='Logout' onPress={() => logout()} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});