import { Text, View } from "react-native";
import React from "react";

import styles from "../css/KeuanganStyles";

const Keuangan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Keuangan</Text>
      </View>
    </View>
  );
};

export default Keuangan;
