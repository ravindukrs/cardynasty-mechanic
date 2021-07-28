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
import BalanceComponent from '../components/BalanceComponent';





export default function WorkPlaceScreen({navigation}) {

    const { user, logout } = useContext(AuthContext);
    const [currentProfileSettings, setCurrentProfileSettings] = useState(null)

    useEffect(() => {
        (async () => {
          try {
            await Firebase.getProfileSettings(user.uid, setCurrentProfileSettings);
          } catch (error) {
            console.log(error);
          }
        })()
      }, [])

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                <BalanceComponent profile={currentProfileSettings ? currentProfileSettings : null } navigation={navigation}/>
                {/* <Text style={{ textAlign: 'center', fontSize: 18 }}>Your Balances</Text>
                <ProgressChartComponent/> */}
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Your Week's Earnings</Text>
                <LineChartComponent />
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Service Breakdown</Text>
                <PieChartComponent />
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