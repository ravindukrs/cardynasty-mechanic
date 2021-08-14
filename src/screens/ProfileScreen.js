import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';
import { AuthContext } from '../navigation/AuthProvider';
import Firebase from '../utils/Firestore/Firebase';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import ConfirmationInput from '../components/ConfirmationInput';
import OdometerInput from '../components/OdometerInput';
import ServiceList from '../components/ServiceList';
import moment from 'moment';
import ProfileInfoComponent from '../components/ProfileInfoComponent'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesSearchComponent from '../components/GooglePlacesSearchComponent';
import Spinner from 'react-native-loading-spinner-overlay';
import { FloatingAction } from "react-native-floating-action";

export default function MyProfileScreen() {

    const { user, logout } = useContext(AuthContext);
    const [shopLocation, setShopLocation] = useState(null)
    const [shopName, setShopName] = useState('')
    const [selectedServiceTypes, setSelectedServiceTypes] = useState([])
    const [selectedVehicleCategories, setSelectedVehicleCategories] = useState([])

    const [serviceTypes, setServiceTypes] = useState(null)
    const [vehicleCategories, setVehicleCategories] = useState(null)

    const [currentProfileSettings, setCurrentProfileSettings] = useState(null)

    const [updateTimeStamp, setUpdateTimeStamp] = useState('')
    const actions = [
        {
            text: "Sign Out",
            icon: <Icon
                name="arrow-right"
                size={15}
                color="white"
            />,
            name: "Sign Out",
            position: 1
        }
    ];

    useEffect(() => {
        populateSelectionArrays();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                await Firebase.getProfileSettings(user.uid, setCurrentProfileSettings);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [updateTimeStamp])

    useEffect(() => {
        // Reconstruct vehicle category array
        if (vehicleCategories && currentProfileSettings && serviceTypes) {
            setShopName(currentProfileSettings.shop_name)
            setSelectedServiceTypes(currentProfileSettings.service_categories)
            setSelectedVehicleCategories(currentProfileSettings.vehicle_categories)
        }
    }, [currentProfileSettings, vehicleCategories, serviceTypes]);

    const onSelectedItemsChange = (selectedServiceTypes) => {
        setSelectedServiceTypes(selectedServiceTypes)
    }
    const onSelectedTypesChange = (selectedVehicleCategories) => {
        setSelectedVehicleCategories(selectedVehicleCategories)
    }

    const populateSelectionArrays = async () => {
        let serviceTypeArray = [];
        let vehicleCategoryArray = []
        let serviceTypeObject = await Firebase.getServiceTypes();
        let vehicleCategoryObject = await Firebase.getVehicleCategories();
        for (let i in serviceTypeObject) {
            serviceTypeArray.push({ id: i.toString(), name: serviceTypeObject[i] })
        }
        for (let i in vehicleCategoryObject) {
            vehicleCategoryArray.push({ id: i.toString(), name: vehicleCategoryObject[i] })
        }
        setServiceTypes(serviceTypeArray)
        setVehicleCategories(vehicleCategoryArray);
    }

    const onShopDetailUpdate = async () => {
        console.log("Called Method");
        let payload = shopLocation ? {
            uid: user.uid,
            shop_name: shopName,
            shop_location: shopLocation,
            service_categories: selectedServiceTypes,
            vehicle_categories: selectedVehicleCategories
        } :
            {
                uid: user.uid,
                shop_name: shopName,
                service_categories: selectedServiceTypes,
                vehicle_categories: selectedVehicleCategories
            }
        await Firebase.updateShopDetails(payload)
        console.log("Shop Location is: ", shopLocation)
        setUpdateTimeStamp(moment())
        console.log("Well, something happened")
    }


    return (
        vehicleCategories ? (
            <View style={styles.container}>
                <ScrollView keyboardShouldPersistTaps="always">
                    {currentProfileSettings ?
                        <ProfileInfoComponent style={styles.profileInfoComponent} details={currentProfileSettings} />
                        : null}
                    <View style={{ alignItems: "center" }} keyboardShouldPersistTaps="always">
                        <Text style={{ textAlign: 'left', fontSize: 18 }}>Shop Name</Text>
                        <Input
                            value={shopName}
                            placeholder='Shop Name'
                            onChangeText={value => setShopName(value)}
                        />
                        <Text style={{ textAlign: 'left', fontSize: 18 }}>Your Services</Text>
                        <ServiceList selectedItems={selectedServiceTypes} onSelectedItemsChange={onSelectedItemsChange} listContent={serviceTypes} placeholderText="Select your services" />
                        <Text style={{ textAlign: 'left', fontSize: 18 }}>Service Location</Text>
                        <GooglePlacesSearchComponent setShopLocation={setShopLocation} />
                        {currentProfileSettings && currentProfileSettings.shop_location ? <Text>Current Location is set to: {currentProfileSettings.shop_location.name}, {currentProfileSettings.shop_location.formatted_address}</Text> : <Text>Location not set</Text>}
                        <Text style={{ textAlign: 'left', fontSize: 18 }}>Your Vehicle Categories</Text>
                        <ServiceList selectedItems={selectedVehicleCategories} onSelectedItemsChange={onSelectedTypesChange} listContent={vehicleCategories} placeholderText="Select vehicle categories" />
                        <Button
                            // icon={
                            //     <Icon
                            //         name="arrow-right"
                            //         size={15}
                            //         color="white"
                            //     />
                            // }
                            title="Update Details"
                            // onPress={() => onServiceSubmit()}
                            onPress={() => {
                                onShopDetailUpdate()
                            }}

                        />

                    </View>

                </ScrollView>
                <FloatingAction
                        actions={actions}
                        color="purple"
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                            logout()
                        }}
                    />

            </View>
        ) :
            (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF' }}>
                    <ScrollView keyboardShouldPersistTaps="always">
                        <Spinner
                            visible={true}
                            textContent={'Loading...'}
                            textStyle={{ color: 'white' }}
                        />
                    </ScrollView>
                </View>
            )
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f1'
    },
    text: {
        fontSize: 20,
        color: '#333333'
    },
    profileInfoComponent: {
        height: 84,
        width: 335,
        marginTop: 40,
        marginLeft: 12
    },
    materialMapView: {
        width: 326,
        height: 145,
        marginTop: 136,
        marginLeft: 20
    }
});