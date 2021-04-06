import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export default function FormButton({ buttonTitle, ...rest }) {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: windowWidth / 2,
        height: windowHeight / 15,
        backgroundColor: "#F5D447",
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
    }
});