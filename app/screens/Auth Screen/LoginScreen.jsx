import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";

import LoginModal from "./LoginModal";

import Font from "../../utils/Font";
import Color from "../../utils/Color";
import Collection from "../../utils/Collection";

const LoginScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLogo}>
          <Image
            source={Collection.Logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.textLogo}>SAS</Text>
        </View>
        <Text style={styles.textHeader}>BPK PENABUR</Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <View style={styles.lottie}>
          <LottieView
            style={{ flex: 1 }}
            source={Collection.Lottie_Collaboration}
            autoPlay
            loop
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textWelcome1}>Welcome to SAS</Text>
          <Text style={styles.textWelcome2}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => setShowModal(true)}
          style={styles.button}
          contentStyle={styles.loginBtn}
          labelStyle={styles.textLoginBtn}
        >
          Login
        </Button>
      </View>
      <Modal animationType="slide" visible={showModal}>
        <LoginModal hideModal={() => setShowModal(false)} />
      </Modal>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  headerLogo: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    height: 39,
    width: 30,
  },
  textLogo: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 24,
    textAlignVertical: "center",
  },
  textHeader: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    textAlignVertical: "center",
  },

  //Lottie
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
  },
  lottie: {
    height: 350,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  textWelcome1: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 24,
    color: Color.Primary,
  },
  textWelcome2: {
    textAlign: "center",
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    flexWrap: "wrap",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    marginHorizontal: 5,
    fontSize: 20,
  },

  //button
  buttonContainer: {
    gap: 15,
    marginTop: 80,
  },
  button: {
    borderRadius: 30,
  },
  loginBtn: {
    height: 55,
    backgroundColor: Color.Primary,
    borderRadius: 30,
  },
  textLoginBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  googleBtn: {
    height: 55,
    borderRadius: 30,
    borderWidth: 1,
    color: Color.Black,
    borderColor: Color.Primary,
  },
  textGoogleBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    color: Color.Primary,
  },
});
