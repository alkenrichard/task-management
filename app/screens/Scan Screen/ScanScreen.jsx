import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

import BottomSheet from "react-native-simple-bottom-sheet";

import Font from "../../utils/Font";
import Color from "../../utils/Color";

import BottomSheets from "./Components/BottomSheets";
import ScanningFrame from "./Components/ScanningFrame";
import CameraScan from "./Components/CameraScan";
import ButtonAbsen from "./Components/ButtonAbsen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

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
      {/* <CameraScan />
      <ScanningFrame /> */}
      <ButtonAbsen
        updateClockTimes={updateClockTimes}
        navigation={navigation}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.White,
  },
  timeContainer: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    top: 20,
    zIndex: 1,
  },
  timeText: {
    fontSize: 30,
    fontFamily: Font["Poppins-Bold"],
    color: Color.Black,
  },
});
