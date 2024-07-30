import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Color from "../../../utils/Color";
import styles from "../css/SDMStyles";

const ListHistory = ({ title, number, iconName, color }) => {
  return (
    <View style={styles.listHistoryContainer}>
      <View style={styles.allItem}>
        <Ionicons name={iconName} size={50} color={color} />
        <View style={styles.textContainer}>
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.label}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

const MenuButton = ({ title, iconName, onPress, color }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.btnItems}>
        <MaterialCommunityIcons name={iconName} size={50} color={color} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function SDM() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <ListHistory
          title="Hadir"
          number="0"
          iconName="checkmark-circle-outline"
          color={Color.Green}
        />
        <ListHistory
          title="Tidak Hadir"
          number="0"
          iconName="close-circle-outline"
          color={Color.Red}
        />
        <ListHistory
          title="Cuti"
          number="0"
          iconName="alert-circle-outline"
          color={Color.Primary}
        />
        <ListHistory
          title="Izin"
          number="0"
          iconName="heart-circle-outline"
          color={Color.Pink}
        />
      </View>
    </View>
  );
}
