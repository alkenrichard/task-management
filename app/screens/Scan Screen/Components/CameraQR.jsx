import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import ModalAlert from "../../../components/Modals/ModalAlert";

const { width, height } = Dimensions.get("window");

export default function CameraQR({ updateClockTimes, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.nik) {
        getTime(userData.nik);
      }
    }, [userData])
  );

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTime = async (nik) => {
    try {
      const todayDate = getTodayDate();
      const response = await axios.get(
        `https://devbpkpenaburjakarta.my.id/api_Login/Absen.php?nik=${nik}&tanggal_masuk=${todayDate}`
      );
      const absensiData = response.data;
      if (absensiData && absensiData.jam_masuk) {
        setClockInTime(absensiData.jam_masuk);
        updateClockTimes(absensiData.jam_masuk);
      }
    } catch (error) {
      console.error("Failed to fetch absensi:", error);
    }
  };

  const sendAbsensiMasuk = async () => {
    setScanned(true);

    if (clockInTime) {
      setModalMessage(
        `Anda sudah melakukan presensi pada pukul ${clockInTime}`
      );
      setModalVisible(true);
      return;
    }

    try {
      if (userData) {
        const payload = {
          nik: userData.nik,
          nama_lengkap: userData.nama_lengkap,
          kode_bagian: userData.divisi,
          kode_izin_masuk: "HDR",
        };
        console.log("Sending payload:", payload);

        const response = await axios.post(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          payload,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("Response from server:", response.data);

        if (response.data.success) {
          const jamMasuk = response.data.jam_masuk;
          setClockInTime(jamMasuk);
          updateClockTimes(jamMasuk);
          setModalMessage(`Absen masuk berhasil`);
          setModalVisible(true);
          console.log(response.data.message);
        } else {
          setModalMessage(response.data.message);
          setModalVisible(true);
          console.error(response.data.message);
        }
      } else {
        setModalMessage("User Data not available");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("An error occurred while sending absensi data");
      setModalVisible(true);
      console.error("Error sending absensi data:", error);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : sendAbsensiMasuk}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={styles.camera}
      >
        <View style={styles.buttonContainer}>
          {scanned && <View style={styles.barcodeContainer}></View>}
        </View>
      </CameraView>
      <ModalAlert
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.navigate("scan");
        }}
        message={modalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: width,
    height: height,
    aspectRatio: "auto",
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
  },
});
