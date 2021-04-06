import React, { useEffect } from 'react';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select'

const items = [{
    id: '1',
    name: 'Air Condition'
}, {
    id: '2',
    name: 'Air Filter'
}, {
    id: '3',
    name: 'Battery'
}, {
    id: '4',
    name: 'Belts'
}, {
    id: '5',
    name: 'Body/Chassis'
}, {
    id: '6',
    name: 'Brake Fluid'
}, {
    id: '7',
    name: 'Brake Pad'
}, {
    id: '8',
    name: 'Brake Replacement'
}, {
    id: '9',
    name: 'Cabin Air Filter'
}]

const types = [{
    id: '1',
    name: 'Petrol'
}, {
    id: '2',
    name: 'Diesel'
}, {
    id: '3',
    name: 'Petrol-Hybrid'
}, {
    id: '4',
    name: 'Diesel-Hybrid'
}, {
    id: '5',
    name: 'Electric'
}]


export default function ServiceList({ selectedItems, listContent, placeholderText, ...rest }) {

    return (
        <View style={styles.multiSelectContainer}>
            <MultiSelect
                styleMainWrapper={{ marginTop: 20, alignSelf: "center", width: windowWidth, paddingHorizontal: 12 }}
                items={listContent}
                uniqueKey='id'
                selectedItems={selectedItems}
                selectText={placeholderText}
                searchInputPlaceholderText='Search...'
                onChangeInput={(text) => console.warn(text)}
                tagRemoveIconColor='#CCC'
                tagBorderColor='#CCC'
                tagTextColor='#CCC'
                selectedItemTextColor='#CCC'
                selectedItemIconColor='#CCC'
                itemTextColor='#000'
                displayKey='name'
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor='#CCC'
                submitButtonText='Submit'
                removeSelected
                {...rest}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    multiSelectContainer: {
        //height: 200,
        width: '80%'
    }
});