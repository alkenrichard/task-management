import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "react-native-simple-bottom-sheet";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";

import BottomSheets from "../contents/BottomSheets";
import ScanningFrame from "../contents/ScanningFrame";
import CameraQR from "../contents/CameraQR";

import styles from "../css/ScanScreenStyles";

export default function ScanScreen({ navigation }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState("--:--");
  const [clockOutTime, setClockOutTime] = useState("--:--");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateClockTimes = (inTime, outTime) => {
    setClockInTime(inTime);
    setClockOutTime(outTime);
  };

  useEffect(() => {
    loadUserData();
  }, []);

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
        setClockOutTime(absensiData.jam_pulang || "--:--");
      }
    } catch (error) {
      console.error("Failed to fetch absensi:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{currentTime.toLocaleTimeString()}</Text>
      </View>
      <CameraQR updateClockTimes={updateClockTimes} navigation={navigation} />
      <ScanningFrame />
      <BottomSheet isOpen>
        {(onScrollEndDrag) => (
          <BottomSheets
            navigation={navigation}
            updateClockTimes={updateClockTimes}
          />
        )}
      </BottomSheet>
    </View>
  );
}
