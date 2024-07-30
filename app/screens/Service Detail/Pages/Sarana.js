import { Text, View } from "react-native";
import React from "react";

import styles from "../css/SaranaStyles";

const Sarana = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Ini adalah Halaman Untuk Sarana Prasarana
        </Text>
      </View>
    </View>
  );
};

export default Sarana;
