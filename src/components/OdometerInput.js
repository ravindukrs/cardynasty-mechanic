import React, { useEffect } from 'react';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { View, Text, StyleSheet } from 'react-native';
import NumericInput from 'react-native-numeric-input'



export default function OdometerInput({ value, ...rest }) {

    return (
        <NumericInput
            value={value} 
            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
            totalWidth={240}
            totalHeight={50}
            iconSize={25}
            step={1000}
            valueType='real'
            rounded
            textColor='#B0228C'
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor='#EA3788'
            leftButtonBackgroundColor='#E56B70' 
            containerStyle={{marginTop:20}}
            {...rest}
            />

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