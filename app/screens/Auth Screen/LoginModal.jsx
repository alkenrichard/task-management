import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Font from "../../utils/Font";
import Collection from "../../utils/Collection";
import Color from "../../utils/Color";

import { loginAPI } from "../../services/API";

export default function LoginModal({ hideModal }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setFormIncomplete(true);
      return;
    }

    console.log("Sending request to API...");

    try {
      const data = await loginAPI(email, password);

      console.log("Parsed response data: ", data);

      if (!data.error) {
        const { nik, nama_lengkap, email_penabur, divisi, nohp } = data;
        console.log("User data:", {
          nik,
          nama_lengkap,
          email_penabur,
          divisi,
          nohp,
        });

        await AsyncStorage.setItem(
          "userData",
          JSON.stringify({ nik, nama_lengkap, email_penabur, divisi, nohp })
        );

        const storedUserData = await AsyncStorage.getItem("userData");
        console.log("Stored user data:", storedUserData);
        hideModal();
        navigation.navigate("Home", {
          user: { nik, nama_lengkap, email_penabur, divisi, nohp },
        });
      } else {
        Alert.alert("Login failed", data.error_msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("An error occurred", error.message);
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={formIncomplete}
        onRequestClose={() => {
          setFormIncomplete(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              style={{ width: 80, height: 80 }}
              source={Collection.Lottie_Close}
              autoPlay
              loop
            />
            <Text style={styles.modalText}>
              Mohon lengkapi dan periksa Email dan Password kamu.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setFormIncomplete(false)}
            >
              <Text style={styles.modalButtonText}>OKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!isKeyboardVisible ? (
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 0.0.0</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  subContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  Logos: {
    width: 50,
    height: 70,
    margin: 10,
  },
  textLogos: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 14,
    textAlign: "center",
    paddingStart: 20,
    paddingEnd: 20,
    marginBottom: 20,
  },

  formInput: {
    gap: 5,
  },

  //Input Email
  emailInput: {
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
    borderColor: Color.Primary,
  },

  //Input Password
  passwordInput: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    borderColor: Color.Primary,
  },

  forgotText: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 14,
    alignSelf: "flex-end",
    color: Color.Black,
  },

  //Button
  button: {
    borderRadius: 30,
    marginTop: 35,
  },
  signBtn: {
    height: 55,
    backgroundColor: Color.Primary,
    borderRadius: 30,
  },
  textSignBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  versionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
  versionText: {
    fontSize: 15,
    fontFamily: Font["Poppins-Medium"],
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: Font["Poppins-Medium"],
  },
  modalButton: {
    marginTop: 10,
    padding: 8,
    width: "100%",
    borderRadius: 12,
    backgroundColor: Color.Red,
  },
  modalButtonText: {
    textAlign: "center",
    color: Color.White,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
  },
});
