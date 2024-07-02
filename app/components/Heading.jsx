import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Font from "../utils/Font";

export default function Heading({ text, isViewAll = false }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      {isViewAll && <Text>View All</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 24,
  },
});
