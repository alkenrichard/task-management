import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AbsensiKeluar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  const sendAbsensiKeluar = async () => {
    try {
      if (userData) {
        const payload = {
          nik: userData.nik,
        };
        console.log("Sending data to API:", payload);
        const response = await axios.put(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          payload,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        console.log("API Response:", response.data);
        if (response.data.success) {
          Alert.alert("Success", "Absen keluar berhasil", [{ text: "OK" }], {
            cancelable: false,
          });
          console.log(response.data.message);
        } else {
          Alert.alert("Failed", response.data.message);
          console.error(response.data.message);
        }
      } else {
        console.error("User data not available");
      }
    } catch (error) {
      console.error("Error sending absensi data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={sendAbsensiKeluar}
        style={styles.button}
        labelStyle={styles.labelButton}
      >
        Pulang
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.White,
  },
  button: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: Color.Primary,
  },
  labelButton: {
    fontFamily: Font["Poppins-Bold"],
  },
});

export default AbsensiKeluar;
