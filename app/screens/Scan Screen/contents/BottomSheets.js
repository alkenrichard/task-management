import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";

import MenuButton from "./MenuButton";
import ClockView from "./ClockView";

import Color from "../../../utils/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const BottomSheets = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState("--:--");
  const [clockOutTime, setClockOutTime] = useState("--:--");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem("userData");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTime = async (nik) => {
    try {
      const todayDate = getTodayDate();
      const response = await axios.get(
        `https://devbpkpenaburjakarta.my.id/api_Login/Absen.php?nik=${nik}&tanggal_masuk=${todayDate}`
      );
     
      if (response.data) {
        setClockInTime(response.data.jam_masuk || "--:--");
        setClockOutTime(response.data.jam_pulang || "--:--");
        updateClockTimes(
          response.data.jam_masuk || "--:--",
          response.data.jam_pulang || "--:--"
        );
      }
    } catch (error) {
      console.error("Failed to fetch absensi:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userData && userData.nik) {
        getTime(userData.nik);
      }
    }, [userData])
  );

  const updateClockTimes = (jamMasuk, jamPulang) => {
    setClockInTime(jamMasuk);
    setClockOutTime(jamPulang);
  };

  return (
    <ScrollView>
      <View style={styles.listItem}>
        <ClockView
          title="Clock In"
          iconName="login"
          color={Color.Green}
          clock={clockInTime}
        />
        <View style={styles.line} />
        <ClockView
          title="Clock Out"
          iconName="logout"
          color={Color.Red}
          clock={clockOutTime}
        />
      </View>
      <View style={styles.buttonlistItem}>
        <MenuButton
          title="Presensi Keluar"
          iconName="clock-minus-outline"
          onPress={() => navigation.navigate("Presensi_Keluar")}
          color={Color.Red}
        />
        <MenuButton
          title="Pengajuan Cuti"
          iconName="account-clock-outline"
          onPress={() => navigation.navigate("Menu_Cuti")}
          color={Color.Primary}
        />
      </View>
    </ScrollView>
  );
};

export default BottomSheets;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonlistItem: {
    marginVertical: 10,
  },
  line: {
    width: 2,
    height: "90%",
    backgroundColor: Color.Grey,
    marginHorizontal: 10,
  },
});
