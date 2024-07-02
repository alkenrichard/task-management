import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const ClockView = ({ title, iconName, color, clock }) => {
  return (
    <View style={styles.clockContainer}>
      <AntDesign name={iconName} size={35} color={color} />
      <Text style={styles.textClock}>{clock}</Text>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default ClockView;

const styles = StyleSheet.create({
  clockContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "45%",
    borderColor: Color.Grey,
    marginBottom: 10,
    marginHorizontal: 5,
    gap: 5,
  },
  textClock: {
    fontSize: 14,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
    flex: 1,
    marginTop: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: Font["Poppins-Medium"],
    flex: 1,
    color: Color.Black,
  },
});
