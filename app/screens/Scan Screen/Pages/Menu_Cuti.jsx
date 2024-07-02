import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const ListMenuCuti = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={30} color={Color.Primary} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Menu_Cuti() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ListMenuCuti
        title="Izin Tahunan"
        iconName="calendar-check"
        onPress={() => navigation.navigate("Izin_Tahunan")}
      />
      <ListMenuCuti
        title="Izin Khusus"
        iconName="calendar-alert"
        onPress={() => navigation.navigate("Izin_Khusus")}
      />
      <ListMenuCuti
        title="Izin Biasa"
        iconName="calendar-today"
        onPress={() => navigation.navigate("Izin_Biasa")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.White,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 10,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.Grey,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "95%",
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 0.5,
    gap: 20,
  },
  menuText: {
    fontSize: 16,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
    flex: 1,
  },
});
