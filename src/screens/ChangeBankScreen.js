import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, ListItem } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import ConfirmationInput from '../components/ConfirmationInput';
import OdometerInput from '../components/OdometerInput';
import ServiceList from '../components/ServiceList';
import { LineChartComponent } from '../components/ChartComponent';
import { PieChartComponent } from '../components/ChartComponent'
import { ProgressChartComponent } from '../components/ChartComponent'

import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



export default function ChangeBankScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [bank, setBank] = useState('BOC');
    const [accountName, setAccountName] = useState();
    const [accountNumber, setAccountNumber] = useState();
    const [tempAccountNumber, setTempAccountNumber] = useState()
    const [currentProfile, setCurrentProfileSettings] = useState()

    const bankList = [
        { label: 'Bank of Ceylon', value: 'BOC' },
        { label: 'Commercial Bank', value: 'combank' },
        { label: `People's Bank`, value: 'PPB' }
    ]


    useEffect(() => {
        (async () => {
            try {
                await Firebase.getProfileSettings(user.uid, setCurrentProfileSettings);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        if(currentProfile && currentProfile.bankDetails){
            setAccountName(currentProfile.bankDetails.accountName)
            setBank(currentProfile.bankDetails.bank)
            setAccountNumber(currentProfile.bankDetails.accountNumber)
        }
    }, [currentProfile])


    const updateBankInDB = async () => {
        try {
            await Firebase.updateBankDetails(user.uid, {
                bank: bank,
                accountName: accountName,
                accountNumber: accountNumber,
                bankName: bankList.find(x => x.value === bank).label
            });
        } catch (error) {
            console.log(error);
        }
    }

    const replaceChars = async (value) => {
        let validatedNumber = await value.replace(/[^0-9]/g, '');
        setAccountNumber(validatedNumber)
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

                <Text style={{ textAlign: 'center', fontSize: 18 }}>Add / Change Bank Account</Text>
                <Card style={{ borderRadius: 10, width: windowWidth - 15, marginTop: 20, marginBottom: 20 }}>
                    <CardTitle
                        subtitle={currentProfile && currentProfile.bankDetails? currentProfile.bankDetails.bankName : "Not Available"}
                    />
                    <CardContent text={`Account Name: ${currentProfile && currentProfile.bankDetails? currentProfile.bankDetails.accountName : "Not Available"}`} />
                    <CardContent text={`Account Number: ${currentProfile && currentProfile.bankDetails? currentProfile.bankDetails.accountNumber : "Not Available"}`} />
                </Card>

                <Input
                    label="Your Account Name"
                    value={accountName}
                    placeholder='Account Name'
                    onChangeText={value => setAccountName(value)}
                />
                <Text style={{ alignSelf: "flex-start", marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: "#8896A0" }}>Your Bank</Text>
                <RNPickerSelect
                    value={bank}
                    onValueChange={(value) => { setBank(value) }}
                    items={bankList}
                />
                <Input
                    label="Your Account Number"
                    value={accountNumber}
                    placeholder='Account Number'
                    onChangeText={value => replaceChars(value)}
                    keyboardType="numeric"
                />
                <Button
                    containerStyle={{ marginTop: 40, width: windowWidth / 2 }}
                    title="Update"
                    onPress={() => updateBankInDB()}
                />

            </ScrollView>
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