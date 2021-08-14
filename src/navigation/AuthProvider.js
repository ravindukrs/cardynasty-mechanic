import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        return await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        return e.message
                    }
                },
                reset: async (email) => {
                    try {
                        return await auth().sendPasswordResetEmail(email)
                    } catch (e) {
                        return e.message
                    }
                },
                register: async (email, password) => {
                    try {
                        return await auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        console.log("Retuning error message : ", e)
                        Alert.alert("Error Occured", e.message.replace(/\s*\[.*?\]\s*/g, ''))
                        return e;
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};