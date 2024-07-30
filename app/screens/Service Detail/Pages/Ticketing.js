import { Text, View } from "react-native";
import React from "react";

import styles from "../css/TicketingStyles";

const Ticketing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Ini adalah Halaman Untuk Ticketing</Text>
      </View>
    </View>
  );
};

export default Ticketing;
