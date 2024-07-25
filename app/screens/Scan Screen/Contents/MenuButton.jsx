import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const MenuButton = ({ title, iconName, onPress, color }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={40} color={color} />
      <Text style={styles.text}>{title}</Text>
      <MaterialIcons
        name="arrow-forward-ios"
        size={20}
        color={Color.GreyText}
      />
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.Grey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 0.5,
    gap: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
    flex: 1,
  },
});
