import { Text, View } from "react-native";
import React from "react";

import styles from "../css/PoliklinikStyles";

const Poliklinik = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Poliklinik</Text>
      </View>
    </View>
  );
};

export default Poliklinik;
