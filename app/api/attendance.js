import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BASE_ENDPOINT, ATTENDANCE_ENDPOINT } from "../configs/apiConfig";

export const sendPresensiMasuk = async (
  userData,
  clockInTime,
  updateClockTimes,
  setModalMessage,
  setModalVisible,
  setScanned
) => {
  setScanned(true);

  if (clockInTime) {
    setModalMessage(`Anda sudah melakukan presensi pada pukul ${clockInTime}`);
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
        `${BASE_ENDPOINT}${ATTENDANCE_ENDPOINT}`,
        payload,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      if (response.data.success) {
        updateClockTimes(response.data.jam_masuk);
        setModalMessage("Absen masuk berhasil");
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
  // Reset Scanned
  setScanned(false);
};

export const sendPresensiKeluar = async (
  userData,
  setAbsenKeluarTime,
  setModalMessage,
  setModalVisible,
  setFailedModalVisible,
  setFailedModalMessage
) => {
  try {
    if (userData) {
      const payload = {
        nik: userData.nik,
      };
      const response = await axios.put(
        `${BASE_ENDPOINT}${ATTENDANCE_ENDPOINT}`,
        payload,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (response.data.success) {
        const currentTimeFormatted = format(new Date(), "HH:mm", {
          locale: id,
        });
        const todayDate = format(new Date(), "yyyy-MM-dd");
        await AsyncStorage.setItem(
          `absenKeluarTime_${userData.nik}`,
          currentTimeFormatted
        );
        await AsyncStorage.setItem(
          `absenKeluarDate_${userData.nik}`,
          todayDate
        );
        setAbsenKeluarTime(currentTimeFormatted);
        setModalMessage(
          `Absen keluar berhasil pada pukul ${currentTimeFormatted}`
        );
        setModalVisible(true);
        console.log(response.data.message);
      } else {
        setFailedModalMessage("Kamu belum melakukan presensi masuk");
        setFailedModalVisible(true);
      }
    } else {
      setFailedModalMessage("Data user tidak tersedia");
      setFailedModalVisible(true);
    }
  } catch (error) {
    setFailedModalMessage("Terjadi kesalahan saat mengirim data presensi");
    setFailedModalVisible(true);
    console.error("Error sending absensi data:", error);
  }
};