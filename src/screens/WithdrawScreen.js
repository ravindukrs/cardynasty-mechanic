import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, ListItem } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button, PricingCard } from 'react-native-elements';
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


import moment from 'moment';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



export default function WithdrawScreen({ navigation }) {

    const { user, logout } = useContext(AuthContext);
    const [currentProfile, setCurrentProfileSettings] = useState()
    const [withdrawalAmount, setWithdrawalAmount] = useState(0)


    useEffect(() => {
        (async () => {
            try {
                await Firebase.getProfileSettings(user.uid, setCurrentProfileSettings);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const creditWithdrawalValue = async (value) => {
        var payload = {
            mechanic: user.uid,
            value: withdrawalAmount[0],
            type: "Mechanic Withdrawal",
            stamp: moment().format(),
        }
        await Firebase.addTransactionEntry(payload)
    }

    const onWithdrawal = async () => {
        try {
            const withdrawalResponse = await Firebase.performWithdrawal(user.uid, withdrawalAmount);
            if (withdrawalResponse == 0){
                error = "Withrawal Failed. Please check if you have sufficient balance"
                await statusAlert("Failed", error)
            }else{
                await creditWithdrawalValue()
                await statusAlert("Withdrawal Successful", null)
                navigation.goBack()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const statusAlert = (message, error) => {
        Alert.alert(
            error ? "Sorry, error occured." : "Withdrawal Completed",
            error ? error : message,
            [
                {
                    text: 'OK'
                },
            ],
            { cancelable: false },
        );
    }


    const conditionalRender = () => {
        console.log("Render Called")
        if (currentProfile && currentProfile.balance && currentProfile.balance > 0) {
            return (
                <View>
                    <PricingCard
                        color="#4f9deb"
                        title="Withdraw"
                        price={`Rs. ${withdrawalAmount}`}
                        info={[`Your Current Balance is ${currentProfile.balance}`]}
                        button={{ title: 'Withdraw Now', icon: 'flight-takeoff' }}
                        onButtonPress={() => onWithdrawal()}
                    />
                    <Slider
                        value={[1]}
                        minimumValue={1}
                        maximumValue={currentProfile.balance}
                        step={1}
                        style={{ marginHorizontal: 25 }}
                        animationType='timing'
                        animateTransitions={true}
                        minimumTrackTintColor="black"
                        maximumTrackTintColor="grey"
                        thumbTintColor="#4F9DEB"
                        onValueChange={(value) => setWithdrawalAmount(value)}
                    />
                </View>
                // <Button
                //     containerStyle={{ marginTop: 40, width: windowWidth / 2 }}
                //     title="Update"
                //     onPress={() => updateBankInDB()}
                // />
            )

        } else {
            return (
                <Text>No Balance Found or Balance is 0</Text>
            )
        }
    }


    return (
        <View style={styles.container}>
            {/* <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}> */}
            <Text style={{ textAlign: 'center', fontSize: 18 }}>Withdraw Account</Text>
            {
                conditionalRender()
            }


            {/* </ScrollView> */}
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