import React, { Component, useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import geohash from "ngeohash";
import google_api_key from '../utils/constants'

function GooglePlacesSearchComponent(props) {
    const [visible, setVisible] = useState(false);

    return (
        <GooglePlacesAutocomplete
            placeholder='Search your Shop'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            fetchDetails={true}
            renderDescription={row => row.description || row.formatted_address || row.name}
            //   onPress={(data, details = null) => {
            //     props.setFieldValue('pickupLocFormik', {
            //       originPlaceId: data.place_id,
            //       originName: details.name,
            //       originAddress: details.formatted_address,
            //       originCoordinates: {
            //         lat: details.geometry.location.lat,
            //         lng: details.geometry.location.lng,
            //         originGeoHash: geohash.encode(details.geometry.location.lat, details.geometry.location.lng),
            //       }
            //     }, false);
            //   }}
            onPress={(data, details = null) => {
                console.log(google_api_key)
                props.setShopLocation(details);
            }}
            query={{
                key: `${google_api_key}`,
                language: 'en',
                components: 'country:lk',
                rankby: 'distance',
                location: (6.484611, 80.241222),
            }}
            currentLocation={true}
            currentLocationLabel='Current Location'
            styles={{
                container: {
                    marginTop: 20,
                },
                textInputContainer: {
                    width: '100%',
                    padding: 0,
                    opacity: 100,
                    backgroundColor: "rgba(255, 0, 0, 0.0)",
                    borderBottomColor: "rgba(255, 0, 0, 0.0)",
                    borderTopColor: "rgba(255, 0, 0, 0.0)",
                },
                textInput: {
                    height: 50,
                    backgroundColor: "rgba(0,0,0,0.1)",
                },
                description: {
                    fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                },
                listView: {
                    marginTop: 13,
                }
            }}
            nearbyPlacesAPI='GoogleReverseGeocoding'
            GooglePlacesSearchQuery={{
                rankby: 'distance',
                location: (6.484611, 80.241222),
                origin: (6.484611, 80.241222),
            }}
            enablePoweredByContainer={false}
            listViewDisplayed={false}
        />
    );
}

export default GooglePlacesSearchComponent;
