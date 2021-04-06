import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
export default function FormInput({ labelValue, placeholderText, ...rest }) {
    return (
        <TextInput
            value={labelValue}
            style={styles.input}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor='#666'
            {...rest}
        />
    );
}
const styles = StyleSheet.create({
    input: {
        // padding: 10,
        // marginTop: 5,
        // marginBottom: 10,
        // width: windowWidth / 1.5,
        // height: windowHeight / 15,
        // fontSize: 16,
        // borderRadius: 8,
        // borderWidth: 1,

        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth - 55,
        height: windowHeight/15,
        borderRadius: 25,
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
        color: "rgba(225,225,225,0.7)",
    }
});