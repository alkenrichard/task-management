import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Collection from "../../../utils/Collection";
import Color from "../../../utils/Color";
import styles from "../css/LoginModalStyles";

import { loginAPI } from "../../../api/auth";
import ModalFailed from "../../../components/Modals/Modal_Failed";

import PopupPengembangan from "../../../components/Modals/Popup_Pengembangan";

export default function LoginModal({ hideModal, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [devPopupVisible, setDevPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setModalMessage("Mohon lengkapi dan periksa Email dan Password kamu.");
      setModalVisible(true);
      return;
    }
    try {
      setLoading(true);
      const data = await loginAPI(email, password);

      if (!data.error) {
        const {
          nik,
          nama_lengkap,
          email_penabur,
          divisi,
          penempatan_payroll,
          nohp,
        } = data;

        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({
            nik,
            nama_lengkap,
            email_penabur,
            divisi,
            penempatan_payroll,
            nohp,
          })
        );

        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible) {
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          if (enrolled) {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: "Login dengan biometrik",
              fallbackLabel: "Masukkan kata sandi",
            });

            if (result.success) {
              const storedUserData = await AsyncStorage.getItem("userData");
              console.log("Stored user data:", storedUserData);
              navigation.navigate("Home", {
                user: {
                  nik,
                  nama_lengkap,
                  email_penabur,
                  divisi,
                  penempatan_payroll,
                  nohp,
                },
              });
            } else {
              setModalMessage("Autentikasi biometrik gagal");
              setModalVisible(true);
            }
          } else {
            setModalMessage(
              "Silakan atur biometrik pada perangkat anda dan coba lagi."
            );
            setModalVisible(true);
          }
        } else {
          setModalMessage(
            "Perangkat anda tidak mendukung autentikasi biometrik."
          );
          setModalVisible(true);
        }
      } else {
        setModalMessage("Mohon lengkapi dan periksa Email dan Password kamu.");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("Terjadi kesalahan pada server. Coba lagi nanti");
      setModalVisible(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
      backHandler.remove();
    };
  }, [isKeyboardVisible]);

  return (
    <KeyboardAwareScrollView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLogo}>
          <Image
            source={Collection.Logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.textLogo}>SAS</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={30} color={Color.Black} />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <Image
          source={Collection.Logo}
          resizeMode="contain"
          style={styles.Logos}
        />
        <Text style={styles.textLogos}>
          YOUR ACCOUNT FOR EVERYTHING PENABUR
        </Text>
      </View>
      <View style={styles.formInput}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.emailInput}
          cursorColor={Color.Primary}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            cursorColor={Color.Primary}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={Color.Primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setDevPopupVisible(true)}>
          <Text style={styles.forgotText}>Lupa Password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={() => !loading && handleLogin()}
        style={styles.button}
        contentStyle={styles.signBtn}
        labelStyle={styles.textSignBtn}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={Color.White} />
        ) : (
          "Sign In"
        )}
      </Button>

      {devPopupVisible && (
        <PopupPengembangan onClose={() => setDevPopupVisible(false)} />
      )}

      <ModalFailed
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        message={modalMessage}
      />
    </KeyboardAwareScrollView>
  );
}
