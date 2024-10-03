import React, { useEffect, useState } from "react";
import { Alert, BackHandler, Image, Modal, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";

import LoginModal from "./LoginModal";

import Collection from "../../../utils/Collection";
import styles from "../css/LoginScreenStyles";
import { StatusBar } from "expo-status-bar";

const LoginScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      console.log("back");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar style="dark" />
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

      <View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Login Modal")}
          style={styles.button}
          contentStyle={styles.loginBtn}
          labelStyle={styles.textLoginBtn}
        >
          Login
        </Button>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

export default LoginScreen;
