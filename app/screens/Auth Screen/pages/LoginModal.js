import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

import Collection from "../../../utils/Collection";
import Color from "../../../utils/Color";
import styles from "../css/LoginModalStyles";

import { loginAPI } from "../../../api/auth"
import ModalFailed from "../../../components/Modals/Modal_Failed";

import { useNavigation } from "@react-navigation/native";

export default function LoginModal({ hideModal }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
              promptMessage: "Login with Biometrics",
              fallbackLabel: "Enter Password",
            });

            if (result.success) {
              const storedUserData = await AsyncStorage.getItem("userData");
              console.log("Stored user data:", storedUserData);
              hideModal();
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
              setModalMessage("Biometric authentication failed");
              setModalVisible(true);
            }
          } else {
            setModalMessage(
              "Please set up biometrics on your device and try again."
            );
            setModalVisible(true);
          }
        } else {
          setModalMessage(
            "Your device does not support biometric authentication."
          );
          setModalVisible(true);
        }
      } else {
        setModalMessage("Mohon lengkapi dan periksa Email dan Password kamu.");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("An error occurred", error.message);
      setModalVisible(true);
    }
  };

  useEffect(() => {
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
    };
  }, [isKeyboardVisible]);

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
        <TouchableOpacity onPress={() => hideModal()}>
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
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color={Color.Primary}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Your Password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        contentStyle={styles.signBtn}
        labelStyle={styles.textSignBtn}
      >
        Sign In
      </Button>

      <ModalFailed
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        message={modalMessage}
      />
    </View>
  );
}
