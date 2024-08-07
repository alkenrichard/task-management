import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

import styles from "../css/CardDetailStyles";

const CardDetail = ({ route }) => {
  const { title, description, image } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

export default CardDetail;
