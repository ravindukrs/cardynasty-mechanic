import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button, PricingCard, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import ConfirmationInput from '../components/ConfirmationInput';
import OdometerInput from '../components/OdometerInput';
import ServiceList from '../components/ServiceList';
import { LineChartComponent } from '../components/ChartComponent';
import { PieChartComponent } from '../components/ChartComponent'
import { ProgressChartComponent } from '../components/ChartComponent'
// import CircleSlider from "react-native-circle-slider";
import Slider from "react-native-sliders";
import Spinner from 'react-native-loading-spinner-overlay';


import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



export default function TransactionScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [currentProfile, setCurrentProfileSettings] = useState()
    const [transactions, setTransactions] = useState()
    const [showSpinner, setShowSpinner] = useState(true)


    useEffect(() => {
        (async () => {
            if(transactions){
                setShowSpinner(false)
            }
        })()
    }, [transactions])

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getProfileSettings(user.uid, setCurrentProfileSettings);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])


    useEffect(() => {
        (async () => {
            try {
                console.log("Start Populating Transactions")
                await Firebase.getTransactionsOfMechanic(user.uid, setTransactions);
                console.log("Populated Transactions")
                setShowSpinner(false)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Previous Transactions</Text>
                {showSpinner ?
                    <Spinner
                        visible={showSpinner}
                        textContent={'Loading...'}
                        textStyle={{ color: 'white' }}
                    />
                    : null}
                {transactions ? (
                    <View style={{ marginTop: 20 }}>
                        {
                            transactions.map((item, i) => (
                                <ListItem key={i} bottomDivider>
                                    {/* <Icon name={item.icon} type={item.icontype} /> */}
                                    <ListItem.Content>
                                        <ListItem.Title>Transaction Type : <Text style={{ color: "green", fontWeight: "bold" }}>{item.type.replace("Mechanic ", "").replace("Pay", "Service Earning")}</Text></ListItem.Title>
                                        <ListItem.Subtitle>Amount: <Text style={{ fontWeight: "bold" }}>Rs.{item.value}</Text></ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        }
                    </View>) :
                    <Text>No Transactions Available</Text>
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});