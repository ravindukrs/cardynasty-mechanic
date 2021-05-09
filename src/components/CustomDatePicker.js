import React, {useEffect} from 'react';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import DatePicker from 'react-native-datepicker'
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { LogBox } from 'react-native';



export default function CustomDatePicker({date, ...rest}) {

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const m = moment();
    const mEnd = moment().subtract(7, "days");
    return (
        <DatePicker
                style={{
                    paddingVertical: 12,
                    paddingTop: 20,
                    height: 50,
                    // backgroundColor: "rgba(0,0,0,0.0)",
                    borderRadius: 3,
                    width: '100%',
                    padding: 0,
                    borderBottomWidth: 0,
                }}
                date={date}
                mode="date"
                placeholder="Service Date"
                format="YYYY-MM-DD"
                minDate={mEnd}
                maxDate={m}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: {
                        fontSize: 16,
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        borderWidth: 0,
                        borderRadius: 3,
                        color: 'black',
                        paddingRight: 30,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        marginLeft: 10,
                        marginRight: 10,
                        alignItems: "flex-start",
                    }
                    // ... You can check the source to find the other keys.
                }}
                showIcon={false}
                {...rest}
            />
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: windowWidth / 2,
        height: windowHeight / 15,
        backgroundColor: "#F5D447",
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff'
    }
});