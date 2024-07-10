import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const AbsensiKeluar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const sendAbsensiKeluar = async () => {
    try {
      if (userData) {
        const payload = {
          nik: userData.nik,
        };
        const response = await axios.put(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          payload,
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
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

  const formatDate = format(currentTime, "EEEE, d MMMM yyyy", { locale: id });
  const formatTime = format(currentTime, "HH:mm", { locale: id });

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.timeText}>{formatTime}</Text>
        <Text style={styles.dateText}>{formatDate}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={sendAbsensiKeluar}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={150}
              color={Color.White}
            />
            <Text style={styles.btnText}>Pulang</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  dateContainer: {
    alignItems: "center",
    paddingBottom: 50,
    paddingTop:50
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: width / 1.6,
    width: width / 1.6,
    height: width / 1.6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.Primary,
    elevation: 5,
    shadowColor: Color.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  timeContainer: {
    alignItems: "center",
  },
  btnText: {
    fontSize: 20,
    fontFamily: Font["Poppins-Medium"],
    color: Color.White,
    textAlign: "center",
  },
  timeText: {
    fontSize: 28,
    fontFamily: Font["Poppins-Bold"],
    color: Color.Black,
  },
  dateText: {
    fontSize: 20,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
  },
});

export default AbsensiKeluar;
