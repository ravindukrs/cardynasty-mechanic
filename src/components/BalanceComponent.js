import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function BalanceComponent() {
    return (
        <Card style={{borderRadius:10}}>
            <CardImage
                source={require('../assets/creditcard.png')}
                title="Your Balance: Rs. 2500.00"
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            />
            <CardTitle
                subtitle="Bank Of Ceylon"
            />
            <CardContent text="Acc No: 839929123" />
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => { }}
                    title="Withdraw"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => { }}
                    title="Change Account"
                    color="#FEB557"
                />
            </CardAction>
        </Card>
    )
}