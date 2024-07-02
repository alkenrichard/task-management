import { Alert, StyleSheet, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ButtonAbsen = ({ updateClockTimes }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [clockInTime, setClockInTime] = useState(null);

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
    if (clockInTime) {
      Alert.alert("Kamu sudah melakukan presensi pada pukul", clockInTime);
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
        console.log("Sending data to API:", payload);
        const response = await axios.post(
          "https://devbpkpenaburjakarta.my.id/api_Login/Absen.php",
          payload,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("API Response:", response.data);

        if (response.data.success) {
          setClockInTime(response.data.jam_masuk); // Update the clockInTime with the response
          updateClockTimes(response.data.jam_masuk); 
          Alert.alert(
            "Success",
            "Absen masuk berhasil",
            [{ text: "OK", onPress: () => navigation.navigate("scan") }],
            {
              cancelable: false,
            }
          );
          console.log(response.data.message);
        } else {
          Alert.alert("Failed", response.data.message);
          console.error(response.data.message);
        }
      } else {
        Alert.alert("Error", "User data not available");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while sending the request");
      console.error("Error sending absensi data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={sendAbsensiMasuk}
        disabled={!!clockInTime} // Disable button if already clocked in
      >
        Absen
      </Button>
    </View>
  );
};

export default ButtonAbsen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
