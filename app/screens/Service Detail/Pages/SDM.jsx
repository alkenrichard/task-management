import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: Color.White,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  listHistoryContainer: {
    width: width * 0.42,
    minHeight: 80,
    justifyContent: "space-around",
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderColor: Color.Grey,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  allItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  textContainer: {
    flexDirection: "column",
  },
  number: {
    fontSize: 16,
    fontFamily: Font["Poppins-Regular"],
  },
  label: {
    fontSize: 13,
    fontFamily: Font["Poppins-Medium"],
    color: Color.GreyText,
  },
});
