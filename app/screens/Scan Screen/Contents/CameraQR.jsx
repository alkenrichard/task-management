import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import ModalSuccess from "../../../components/Modals/Modal_Success";

const { width, height } = Dimensions.get("window");

export default function CameraQR({ updateClockTimes, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [deviceIp, setDeviceIp] = useState("");

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

    //  const loadDeviceIp = async () => {
    //    try {
    //      const response = await fetch("https://api64.ipify.org?format=json");
    //      const data = await response.json();
    //      setDeviceIp(data.ip);
    //    } catch (error) {
    //      console.error("Failed to get device IP address:", error);
    //    }
    //  };
    loadUserData();
    // loadDeviceIp();
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

  const sendAbsensiMasuk = async (scannedData) => {
    setScanned(true);

    // const scannedIp = scannedData.ip;
    // if (deviceIp !== scannedIp) {
    //   setModalMessage(
    //     "IP address tidak sesuai. Pastikan Anda terhubung ke jaringan yang benar."
    //   );
    //   setModalVisible(true);
    //   return;
    // }

    if (clockInTime) {
      setModalMessage(
        `Anda sudah melakukan presensi pada pukul ${clockInTime}`
      );
      setModalVisible(true);
      setScanned(false);
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
        const response = await axios.post(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          payload,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        if (response.data.success) {
          setClockInTime(response.data.jam_masuk);
          updateClockTimes(response.data.jam_masuk);
          setModalMessage(`Absen masuk berhasil`);
          setModalVisible(true);
        } else {
          setModalMessage(response.data.message);
          setModalVisible(true);
        }
      } else {
        setModalMessage("User Data not available");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("An error occurred while sending absensi data");
      setModalVisible(true);
    }
    //Reset Scanned
    setScanned(false);
  };

  const handleBacodeScanned = ({ data }) => {
    // const scannedData = JSON.parse(data);
    // sendAbsensiMasuk(scannedData);
    sendAbsensiMasuk();
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
        onBarcodeScanned={scanned ? undefined : handleBacodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={styles.camera}
      >
        <View style={styles.buttonContainer}>
          {scanned && <View style={styles.barcodeContainer}></View>}
        </View>
      </CameraView>
      <ModalSuccess
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
