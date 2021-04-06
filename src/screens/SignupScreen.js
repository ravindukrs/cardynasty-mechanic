import React, { useState, useContext } from 'react';
import {     
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Button,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Firebase from '../utils/Firestore/Firebase';


import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

import bgImg from '../assets/bgImg.png';

//Import Yup
import * as Yup from 'yup';

//Import Formik
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
    fName: Yup.string()
        .required("This cannot be empty..")
        .min(2, "You're missing characters?")
        .matches(/^[a-zA-Z]+$/, "Your name seems incorrect"),
    lName: Yup.string()
        .required("This cannot be empty..")
        .min(2, "You're missing characters?")
        .matches(/^[a-zA-Z]+$/, "Your name seems incorrect"),
    mobile: Yup.string()
        .required("This cannot be empty..")
        .min(10, "Guess you missed a number...")
        .max(10, "Too many numbers!")
        .matches(/^[0-9]*$/, "Nice try.."),
    email: Yup.string()
        .required("This cannot be empty..")
        .email("Well, that's not an email"),
    nic: Yup.string()
        .required("This cannot be empty..")
        .min(9, "Guess you missed a number...")
        .max(11, "Incorrect NIC..")
        .matches(/^[0-9]*$/, "Don't Enter V"),
    password: Yup.string()
        .required("This cannot be empty..")
        .min(8, "Eight Characters, Please?"),
    retypePassword: Yup.string()
        .required("This cannot be empty..")
        .oneOf([Yup.ref('password'), null], "Passwords don't match"),

});

export default function SignupScreen() {
    const { register } = useContext(AuthContext);

    const handleSubmit = async (values, actions) => {

        const { fName, lName, email, mobile, nic, password } = values;

        try {
            const response = await register(email,password);

            if (response.user.uid){
                const {uid} = response.user;
                await Firebase.createNewUser({uid, fName, lName, email, nic, mobile });
            }
        }catch(error){
            console.log("No success")
            console.log(error.message)
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={bgImg} style={styles.container}>
                    <ScrollView>
                        <Formik
                            initialValues={{
                                fName: '',
                                lName: '',
                                email: '',
                                mobile: '',
                                nic: '',
                                password: '',
                                retypePassword: '',
                            }}
                            onSubmit={(values, actions) => { handleSubmit(values,actions)}}
                            validationSchema={validationSchema}
                            validateOnMount = {true}
                        >
                            {({ handleChange, handleSubmit, values, errors, setFieldTouched, touched, isValid }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"First Name"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            onChangeText={handleChange('fName')}
                                            onBlur={() => setFieldTouched('fName')}
                                            value={values.fName}
                                            keyboardType='email-address'
                                        />
                                        {touched.fName && errors.fName &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.fName}</Text>
                                            </View>
                                        }

                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"Last Name"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            onChangeText={handleChange('lName')}
                                            onBlur={() => setFieldTouched('lName')}
                                            value={values.lName}
                                            keyboardType='email-address'
                                        />
                                        {touched.lName && errors.lName &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.lName}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"Email"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            onChangeText={handleChange('email')}
                                            onBlur={() => setFieldTouched('email')}
                                            value={values.email}
                                            keyboardType="email-address"
                                        />
                                        {touched.email && errors.email &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.email}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"Mobile Number"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            onChangeText={handleChange('mobile')}
                                            onBlur={() => setFieldTouched('mobile')}
                                            value={values.mobile}
                                            keyboardType="phone-pad"
                                        />
                                        {touched.mobile && errors.mobile &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.mobile}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"NIC"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            onChangeText={handleChange('nic')}
                                            onBlur={() => setFieldTouched('nic')}
                                            value={values.nic}
                                            keyboardType="numeric"
                                        />
                                        {touched.nic && errors.nic &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.nic}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"New Password"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={true}
                                            onChangeText={handleChange('password')}
                                            onBlur={() => setFieldTouched('password')}
                                            value={values.password}
                                        />
                                        {touched.password && errors.password &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.password}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={"Retype Password"}
                                            placeholderTextColor="rgba(225,225,225,0.8)"
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={true}
                                            onChangeText={handleChange('retypePassword')}
                                            onBlur={() => setFieldTouched('retypePassword')}
                                            value={values.retypePassword}
                                        />
                                        {touched.retypePassword && errors.retypePassword &&
                                            <View style={styles.errorTextContainer}>
                                                <Text style={styles.errorText}>{errors.retypePassword}</Text>
                                            </View>
                                        }
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <TouchableOpacity
                                            disabled={!isValid}
                                            style={[styles.btnSignUpDisabled, isValid ? styles.btnSignUpEnabled :  styles.btnSignUpDisabled] }
                                            onPress={handleSubmit}
                                        >
                                            <Text style={styles.textLogin}>Sign Up</Text>
                                        </TouchableOpacity>
                                        
                                        <View>
                                            {/* {
                                                errorState!==undefined ? <View style={styles.serverErrorContainer}><Text style={styles.serverErrorText}>{errorState}</Text></View> : null
                                            } */}
                                        </View>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </ScrollView>

                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    // container: {
    //   backgroundColor: '#f5f5f5',
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center'
    // },
    // text: {
    //   fontSize: 24,
    //   marginBottom: 10
    // }
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        marginTop: 50,
        marginBottom: 0,
        width: windowWidth * 0.4,
        height: windowHeight * 0.4,
        resizeMode: 'contain',
    },
    inputContainer: {
        marginTop: 12,
    },
    inputIcon: {
        position: "absolute",
        top: 8,
        left: 37
    },
    input: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        paddingLeft: 45,
        fontSize: 16,
        backgroundColor: "rgba(0,0,0,0.35)",
        color: "rgba(225,225,225,0.7)",
        marginHorizontal: 25
    },
    btnEyeContainer: {
        position: "absolute",
        top: 8,
        right: 37
    },
    textLogin: {
        color: "rgba(225,225,225,0.7)",
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    btnLoginEnabled: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(76,64,155,0.8)",
        marginTop: 25,
        justifyContent: "center"
    },
    btnLoginDisabled: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(46, 49, 49, 0.9)",
        marginTop: 25,
        justifyContent: "center"
    },
    textSignUpContainer: {
        marginTop: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    btnSignUpEnabled: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(172,53,139,0.9)",
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    btnSignUpDisabled: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(46, 49, 49, 0.9)",
        marginTop: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    textSignUp: {
        color: "orange",
    },
    errorTextContainer: {
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        fontSize: 12,
        color: 'orange',
        fontWeight: "500"
    },
    serverErrorText: {
        color: "rgba(225,225,225,0.7)",
        fontSize: 12,
        textAlign: "center",
        fontWeight: "bold"
    },
    serverErrorContainer: {
        width: windowWidth - 55,
        height: 45,
        borderRadius: 10,
        backgroundColor: "rgba(225,0,0,0.8)",
        marginTop: 25,
        justifyContent: "center"
    },
  });