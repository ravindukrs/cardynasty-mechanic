import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import moment from 'moment';
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

const data = [
    {
        name: "A/C",
        population: Math.round(Math.random() * 100, 2),
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Oil Filter",
        population: Math.round(Math.random() * 100, 2),
        color: "#F00",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Break Pads",
        population: Math.round(Math.random() * 100, 2),
        color: "red",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Battery",
        population: Math.round(Math.random() * 100, 2),
        color: "#ffffff",
        legendFontColor: "white",
        legendFontSize: 12
    },
    {
        name: "Air Filter",
        population: Math.round(Math.random() * 100, 2),
        color: "rgb(0, 0, 255)",
        legendFontColor: "white",
        legendFontSize: 12
    }
];
const LineChartComponent = () => {
    return (
        <LineChart
            data={{
                labels: [moment().subtract(4, 'day').format("M/D"), moment().subtract(3, 'day').format("M/D"), moment().subtract(2, 'day').format("M/D"), moment().subtract(1, 'day').format("M/D"), moment().format("M/D")],
                datasets: [
                    {
                        data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                        ]
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
    return (
        <PieChart
            data={data}
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
        />
    )
}

const ProgressChartComponent = () => {
    return (
        <ProgressChart
            data={{
                labels: ["Remaining", "Withdrawn", "Unconfirmed"], // optional
                data: [0.4, 0.6, 0.5],
                colors: ["#f67280","#fecea8","#6c5b7b"]
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
            withCustomBarColorFromData= {true}
        />
    )
}

export {
    PieChartComponent,
    LineChartComponent,
    ProgressChartComponent
}