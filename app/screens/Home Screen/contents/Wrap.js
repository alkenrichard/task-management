import React from "react";
import { View, Text } from "react-native";

import styles from "../css/WrapStyles";

export default function Wrap({ user }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.wrapText}>
          <Text style={styles.name}>{user.nama_lengkap}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.school}>{user.nik}</Text>
            <View style={styles.line} />
            <Text style={styles.school}>{user.penempatan_payroll}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
