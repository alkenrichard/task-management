import { Text, View } from "react-native";
import React from "react";

import styles from "../css/SIMStyles";

const SIM = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk SIM</Text>
      </View>
    </View>
  );
};

export default SIM;
