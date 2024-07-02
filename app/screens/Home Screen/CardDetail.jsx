import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import Font from "../../utils/Font";
import Color from "../../utils/Color";

const CardDetail = ({ route, navigation }) => {
  const { title, description, image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 16,
    textAlign: "justify",
  },
  backButton: {
    position: "absolute",
    zIndex: 1,
    padding: 20,
    paddingTop: 30,
  },
  backButtonText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 16,
    color: Color.White,
  },
});

export default CardDetail;
