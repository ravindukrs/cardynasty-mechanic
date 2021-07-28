import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
//import bgImg from '../assets/creditcard.png';

export default function BalanceComponent(props) {

    const bankList = [
        { label: 'Bank of Ceylon', value: 'BOC' },
        { label: 'Commercial Bank', value: 'combank' },
        { label: `People's Bank`, value: 'PPB' }
    ]
    return (
        <Card style={{borderRadius:10}}>
            <CardImage
                source={require('../assets/creditcard.png')}
                title={`Your Balance: Rs. ${props.profile && props.profile.balance ? props.profile.balance : 0}`}
                resizeMode="stretch"
                style={{borderRadius:10, backgroundColor: "white"}}
            />
            <CardTitle
                subtitle= {props.profile && props.profile.bankDetails? props.profile.bankDetails.bankName : "Not Available"}
            />
            <CardContent text={`Account Number: ${props.profile && props.profile.bankDetails? props.profile.bankDetails.accountNumber : "Not Available"}`}/>
            <CardAction
                separator={true}
                inColumn={false}>
                <CardButton
                    onPress={() => {props.navigation.navigate("Withdraw") }}
                    title="Withdraw"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => {props.navigation.navigate("ChangeBank")}}
                    title="Change Account"
                    color="#FEB557"
                />
                <CardButton
                    onPress={() => {props.navigation.navigate("Transactions")}}
                    title="Transactions"
                    color="#FEB557"
                />
            </CardAction>
        </Card>
    )
}