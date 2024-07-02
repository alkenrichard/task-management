import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

export default function Wrap({ user }) {
  if (!user || !user.nama_lengkap || !user.nik || !user.divisi) {
    console.error("User data is missing in Wrap component");
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is missing</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.wrapText}>
          <Text style={styles.name}>{user.nama_lengkap}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.school}>{user.nik}</Text>
            <View style={styles.line} />
            <Text style={styles.school}>{user.divisi}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
  },
  wrap: {
    marginHorizontal: 20,
    marginTop: -30,
    height: 80,
    borderRadius: 20,
    backgroundColor: Color.White,
    elevation: 4,
  },
  wrapText: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  type: {
    height: 80,
    width: 70,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  name: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
  },
  school: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    color: Color.Primary,
  },
  line: {
    width: 2.5,
    height: "85%",
    backgroundColor: Color.Red,
    marginHorizontal: 10,
  },
});
