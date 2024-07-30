import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import styles from "../css/MenuCutiStyles";

const ListMenuCuti = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <MaterialCommunityIcons name={iconName} size={30} color={Color.Primary} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default function Menu_Cuti({ navigation }) {

  return (
    <View style={styles.container}>
      <ListMenuCuti
        title="Cuti Tahunan"
        iconName="calendar-check"
        onPress={() => navigation.navigate("Cuti_Tahunan")}
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
