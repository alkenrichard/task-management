import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import ModalSuccess from "../../../components/Modals/Modal_Success";
import { BASE_ENDPOINT, ATTENDANCE_ENDPOINT } from "../../../configs/apiConfig";
import { sendPresensiMasuk } from "../../../api/attendance";

const { width, height } = Dimensions.get("window");

export default function CameraQR({ updateClockTimes }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigation = useNavigation();

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
        `${BASE_ENDPOINT}${ATTENDANCE_ENDPOINT}?nik=${nik}&tanggal_masuk=${todayDate}`
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

  const handleBacodeScanned = ({ data }) => {
    sendPresensiMasuk(
      userData,
      clockInTime,
      updateClockTimes,
      setModalMessage,
      setModalVisible,
      setScanned
    );
  };

  const handleNavigate = () => {
    navigation.navigate("home");
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
        }}
        message={modalMessage}
        onNavigate={handleNavigate}
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
