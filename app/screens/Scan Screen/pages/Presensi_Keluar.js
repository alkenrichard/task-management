import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useNavigation } from "@react-navigation/native";

import ModalSuccess from "../../../components/Modals/Modal_Success";
import ModalFailed from "../../../components/Modals/Modal_Failed";
import { LogoutModal } from "../../../components/Modals/Modal_Profile";
import { sendPresensiKeluar } from "../../../api/attendance";

import Color from "../../../utils/Color";
import styles from "../css/PresensiKeluarStyles";

export default function Presensi_Keluar() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [failedModalVisible, setFailedModalVisible] = useState(false);
  const [failedModalMessage, setFailedModalMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [absenKeluarTime, setAbsenKeluarTime] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate("scan");
  };

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

          const storedAbsenKeluarDate = await AsyncStorage.getItem(
            `absenKeluarDate_${parsedUserData.nik}`
          );

          const todayDate = format(new Date(), "yyyy-MM-dd");

          if (storedAbsenKeluarTime && storedAbsenKeluarDate === todayDate) {
            setAbsenKeluarTime(storedAbsenKeluarTime);
            setModalMessage(
              `Anda sudah mengakhiri sesi hari ini pada pukul ${storedAbsenKeluarTime}`
            );
            setModalVisible(true);
          } else {
            // Reset absen keluar jika hari sudah berganti
            await AsyncStorage.removeItem(
              `absenKeluarTime_${parsedUserData.nik}`
            );
            await AsyncStorage.removeItem(
              `absenKeluarDate_${parsedUserData.nik}`
            );
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
    sendPresensiKeluar(
      userData,
      setAbsenKeluarTime,
      setModalMessage,
      setModalVisible,
      setFailedModalVisible,
      setFailedModalMessage
    );
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
        <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="gesture-double-tap"
              size={150}
              color={Color.White}
            />
            <Text style={styles.btnText}>Pulang</Text>
          </View>
        </TouchableOpacity>
      </View>
      <LogoutModal
        isVisible={confirmModalVisible}
        title="Konfirmasi"
        message="Yakin ingin mengakhiri sesi hari ini?"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmModalVisible(false)}
      />
      <ModalSuccess
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={modalMessage}
        onNavigate={handleNavigate}
      />
      <ModalFailed
        visible={failedModalVisible}
        onClose={() => setFailedModalVisible(false)}
        message={failedModalMessage}
      />
    </View>
  );
}
