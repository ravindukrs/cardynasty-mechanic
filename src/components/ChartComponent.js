import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import Firebase from '../utils/Firestore/Firebase';
import moment from 'moment';
import { AuthContext } from '../navigation/AuthProvider';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    },
    bgColor: "#e26a00"
};

const LineChartComponent = () => {

    const { user, logout } = useContext(AuthContext);
    const [currentProfile, setCurrentProfileSettings] = useState()
    const [transactions, setTransactions] = useState()
    const [mechanicPay, setMechanicPay] = useState()



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
        (async () => {
            try {
                await Firebase.getTransactionsOfMechanic(user.uid, setTransactions);
            } catch (error) {
                console.log(error);
            }
        })()
    })


    useEffect(() => {
        let earnings = [0, 0, 0, 0, 0]

        if (transactions) {
            transactions.forEach((trans) => {
                if (trans.type == "Mechanic Withdrawal") {
                    return;
                }
                else if (moment(trans.stamp).format("M/D") == moment().subtract(4, 'day').format("M/D")) {
                    earnings[0] = earnings[0] + trans.value;
                }
                else if (moment(trans.stamp).format("M/D") == moment().subtract(3, 'day').format("M/D")) {
                    earnings[1] = earnings[1] + trans.value;
                }
                else if (moment(trans.stamp).format("M/D") == moment().subtract(2, 'day').format("M/D")) {
                    earnings[2] = earnings[2] + trans.value;
                }
                else if (moment(trans.stamp).format("M/D") == moment().subtract(1, 'day').format("M/D")) {
                    earnings[3] = earnings[3] + trans.value;
                }
                else if (moment(trans.stamp).format("M/D") == moment().format("M/D")) {
                    earnings[4] = earnings[4] + trans.value;
                }
            })
            setMechanicPay(earnings)
        }
    }, [transactions])

    return (
        <LineChart
            data={{
                labels: [moment().subtract(4, 'day').format("M/D"), moment().subtract(3, 'day').format("M/D"), moment().subtract(2, 'day').format("M/D"), moment().subtract(1, 'day').format("M/D"), moment().format("M/D")],
                datasets: [
                    {
                        data: mechanicPay ? mechanicPay : [0, 0, 0, 0, 0]
                    }
                ]
            }}
            width={Dimensions.get("window").width - 10} // from react-native
            height={220}
            yAxisLabel="Rs "
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
    )
}

const PieChartComponent = () => {
    const { user, logout } = useContext(AuthContext);
    const [currentProfile, setCurrentProfileSettings] = useState()
    const [serviceTypes, setServiceTypes] = useState()
    const [services, setServices] = useState()
    const [serviceDataset, setServiceDataset] = useState()


    useEffect(() => {
        (async () => {
            try {
                let serviceList = await Firebase.getServiceTypes();
                console.log(serviceList)
                setServiceTypes(serviceList)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getServicesOfMechanic(user.uid, setServices);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [user])

    useEffect(() => {
        (async () => {
            let singleDimensionArray = []
            if (services.length > 0 && serviceTypes) {
                services.forEach(arr => {
                    arr.forEach(elem => {
                        singleDimensionArray.push(elem)
                    })
                })

                const map = singleDimensionArray.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map())
                const entriesArray = [...map.entries()]
                var sortedEntries = await entriesArray.sort(function(a,b){ return a[1] < b[1] ? 1 : -1; });
                let colours = ['#ffb997', '#f67e78', '#843b62', '#0b032d', '#74546d']
                let dataset = []
                for(let i=0; i<5; i++){
                    let datum =  {
                        name: serviceTypes[sortedEntries[i][0]],
                        population: sortedEntries[i][1],
                        color: colours[i],
                        legendFontColor: colours[i],
                        legendFontSize: 12
                    }

                    dataset.push(datum)
                }

                setServiceDataset(dataset)
            }
           
        })()
    }, [services, serviceTypes])



    return (
        serviceDataset ? 
        <PieChart
            data={serviceDataset}
            width={Dimensions.get("window").width - 10}
            height={220}
            chartConfig={
                {
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    }
                }
            }
            backgroundColor="#FDA50F"
            // backgroundGradientFrom= '#fb8c00'
            // backgroundGradientTo= '#ffa726'
            accessor={"population"}
            paddingLeft={"15"}
            absolute
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        /> : null
    )
}

const ProgressChartComponent = () => {
    return (
        <ProgressChart
            data={{
                labels: ["Remaining", "Withdrawn", "Unconfirmed"], // optional
                data: [0.4, 0.6, 0.5],
                colors: ["#f67280", "#fecea8", "#6c5b7b"]
            }}
            width={Dimensions.get("window").width - 10}
            height={220}
            strokeWidth={12}
            radius={35}
            chartConfig={chartConfig}
            hideLegend={false}
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
            withCustomBarColorFromData={true}
        />
    )
}

export {
    PieChartComponent,
    LineChartComponent,
    ProgressChartComponent
}