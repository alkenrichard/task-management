import { Text, View } from "react-native";
import React from "react";

import styles from "../css/PendidikanStyles"

const Pendidikan = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Pendidikan</Text>
      </View>
    </View>
  );
};

export default Pendidikan;
