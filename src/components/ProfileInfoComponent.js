import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Ellipse } from "react-native-svg";
import Icon from "react-native-vector-icons/Entypo";

function ProfileInfoComponent(props) {
  return (
    <View style={[styles.container]}>
      <View style={styles.rect}>
        <View style={styles.ellipseStackRow}>
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 21.74 86.76" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(167,164,164,1)"
                cx={0}
                cy={0}
                rx={0}
                ry={0}
              ></Ellipse>
            </Svg>
            <Icon name="user" style={styles.icon}></Icon>
          </View>
          <View style={styles.containerColumn}>
            <Text style={styles.companyNameText}>Ravindu Motors (Pvt) Ltd</Text>
            <Text style={styles.addressText}>140E, Kalutara South</Text>
            <Text style={styles.contactText}>
              071 7503812 | ravindupf@gmail.com
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingVertical:10,
      marginVertical:0
  },
  rect: {
    backgroundColor: "rgba(222,219,219,1)",
    borderRadius: 15,
    paddingVertical: 8,
    flex: 1
  },
  ellipse: {
    top: 0,
    left: 0,
    width: 73,
    height: 73,
    position: "absolute"
  },
  icon: {
    top: 13,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 40,
    left: 17,
    width: 40,
    height: 46
  },
  ellipseStack: {
    width: 73,
    height: 73
  },
  companyNameText: {
    fontFamily: "roboto-300",
    color: "#121212",
    lineHeight: 18,
    fontSize: 18,
    height: 14,
  },
  addressText: {
    fontFamily: "roboto-300",
    color: "#121212",
    lineHeight: 15,
    fontSize: 15,
    height: 14,
    marginTop: 9
  },
  contactText: {
    fontFamily: "roboto-300",
    color: "#121212",
    lineHeight: 14,
    fontSize: 13,
    height: 14,
    marginTop: 9
  },
  containerColumn: {
    width: 210,
    marginLeft: 17,
    marginTop: 6,
    marginBottom: 7
  },
  ellipseStackRow: {
    height: 73,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 16,
    marginRight: 19
  }
});

export default ProfileInfoComponent;
