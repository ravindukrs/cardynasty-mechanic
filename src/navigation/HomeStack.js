import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import WorkPlaceScreen from '../screens/WorkPlaceScreen';
import MyProfileScreen from '../screens/ProfileScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
    return (
        <Tab.Navigator
            screenOptions={
                { gestureEnabled: false }
            }
            tabBarOptions={{
                activeTintColor: 'purple',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="Add Service" component={ServiceScreen} />
            <Tab.Screen name="My Workplace" component={WorkPlaceScreen} />
            <Tab.Screen name="Profile" component={MyProfileScreen} />

        </Tab.Navigator>
    );
}

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown: false
                }
            }
        >
            <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
    );
}