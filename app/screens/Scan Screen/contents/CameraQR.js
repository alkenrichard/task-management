import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_ENDPOINT, ATTENDANCE_ENDPOINT } from "../../../configs/apiConfig";
import { sendPresensiMasuk } from "../../../api/attendance";
import { calculateDistance } from "../../../utils/Location";
import { allowedLocations } from "../../../constants/locationCoords";
import ModalSuccess from "../../../components/Modals/Modal_Success";
import ModalFailed from "../../../components/Modals/Modal_Failed";

const { width, height } = Dimensions.get("window");

export default function CameraQR({ updateClockTimes }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const [failedModalVisible, setFailedModalVisible] = useState(false);
  const [failedModalMessage, setFailedModalMessage] = useState("");
  const [userLocation, setUserLocation] = useState(null);

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

    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setFailedModalMessage("Lokasi diperlukan untuk melakukan presensi");
        setFailedModalVisible(true);
        return;
      }
    };

    getCameraPermissions();
    getLocationPermission();
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

  const handleBacodeScanned = async ({ data }) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setFailedModalMessage("Lokasi diperlukan untuk melakukan presensi");
      setFailedModalVisible(true);
      setScanned(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);

    const isInAllowedRange = allowedLocations.some((loc) => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        loc.latitude,
        loc.longitude
      );
      return distance <= 500;
    });

    if (!isInAllowedRange) {
      setFailedModalMessage("Anda berada di luar radius yang ditentukan");
      setFailedModalVisible(true);
      setScanned(false);
      return;
    }

    sendPresensiMasuk(
      userData,
      clockInTime,
      updateClockTimes,
      setSuccessModalMessage,
      setSuccessModalVisible,
      setFailedModalMessage,
      setFailedModalVisible,
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
        <View>{scanned && <View></View>}</View>
      </CameraView>
      <ModalSuccess
        visible={successModalVisible}
        onClose={() => {
          setSuccessModalVisible(false);
        }}
        message={successModalMessage}
        onNavigate={handleNavigate}
      />
      <ModalFailed
        visible={failedModalVisible}
        onClose={() => {
          setFailedModalVisible(false);
        }}
        message={failedModalMessage}
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
