import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "react-native-paper";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";
import ModalAlert from "../../../components/Modals/ModalAlert";
import { LogoutModal } from "../../../components/Modals/Modal_Profile";

export default function AbsensiKeluar({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [absenKeluarTime, setAbsenKeluarTime] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);

          const storedAbsenKeluarTime = await AsyncStorage.getItem(
            `absenKeluarTime_${parsedUserData.nik}`
          );
          if (storedAbsenKeluarTime) {
            setAbsenKeluarTime(storedAbsenKeluarTime);
            setModalMessage(
              `Anda sudah mengakhiri sesi hari ini pada pukul ${storedAbsenKeluarTime}`
            );
            setModalVisible(true);
          }
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
          const currentTimeFormatted = format(new Date(), "HH:mm", {
            locale: id,
          });
          await AsyncStorage.setItem(
            `absenKeluarTime_${userData.nik}`,
            currentTimeFormatted
          );
          setAbsenKeluarTime(currentTimeFormatted);
          setModalMessage(
            `Absen keluar berhasil pada pukul ${currentTimeFormatted}`
          );
          setModalVisible(true);
          console.log(response.data.message);
        } else {
          setModalMessage(response.data.message);
          setModalVisible(true);
          console.error(response.data.message);
        }
      } else {
        setModalMessage("Data user tidak tersedia");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("Terjadi kesalahan saat mengirim data presensi");
      setModalVisible(true);
      console.error("Error sending absensi data:", error);
    }
  };

  const handleButtonPress = () => {
    if (absenKeluarTime) {
      setModalMessage(
        `Anda sudah mengakhiri sesi hari ini pada pukul ${absenKeluarTime}`
      );
      setModalVisible(true);
    } else {
      setConfirmModalVisible(true);
    }
  };

  const handleConfirm = () => {
    setConfirmModalVisible(false);
    sendAbsensiKeluar();
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
          onPress={handleButtonPress}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons
              name="gesture-tap"
              size={120}
              color={Color.White}
            />
            <Text style={styles.btnText}>Pulang</Text>
          </View>
        </Button>
      </View>
      <LogoutModal
        isVisible={confirmModalVisible}
        title="Konfirmasi"
        message="Yakin ingin mengakhiri sesi hari ini?"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModalVisible(false)}
      />
      <ModalAlert
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  dateContainer: {
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 300,
    width: 300,
    height: 300,
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
    justifyContent: "center",
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
