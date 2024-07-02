import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Font from "../../../utils/Font";

const Biro = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Biro</Text>
      </View>
    </View>
  );
};

export default Biro;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 18,
    textAlign: "center",
  },
});
