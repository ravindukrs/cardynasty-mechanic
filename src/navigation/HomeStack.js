import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import WorkPlaceScreen from '../screens/WorkPlaceScreen';
import MyProfileScreen from '../screens/ProfileScreen';

import { Icon } from 'react-native-elements'

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
            <Tab.Screen
                name="Dashboard"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="home"
                            size={28}
                            color={color}
                            type="font-awesome"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Add Service"
                component={ServiceScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="car-repair"
                            type="material"
                            size={28}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="My Workplace"
                component={WorkPlaceScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="location-city"
                            type="material"
                            size={28}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={MyProfileScreen}
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Icon
                            name="users-cog"
                            type="font-awesome-5"
                            size={28}
                            color={color} />
                    ),
                }}
            />

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