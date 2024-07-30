import { Text, View } from "react-native";
import React from "react";

import styles from "../css/BiroStyles";

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
