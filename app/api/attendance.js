import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BASE_ENDPOINT, ATTENDANCE_ENDPOINT } from "../configs/apiConfig";

export const sendPresensiMasuk = async (
  userData,
  clockInTime,
  updateClockTimes,
  setSuccessModalMessage,
  setSuccessModalVisible,
  setFailedModalMessage,
  setFailedModalVisible,
  setScanned
) => {
  setScanned(true);

  if (clockInTime) {
    setSuccessModalMessage(
      `Anda sudah melakukan presensi pada pukul ${clockInTime}`
    );
    setSuccessModalVisible(true);
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
      console.log("Payload dikirim:", payload);

      const response = await axios.post(
        `${BASE_ENDPOINT}${ATTENDANCE_ENDPOINT}`,
        payload,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      console.log("Server Response:", response.data);
      if (response.data.success) {
        updateClockTimes(response.data.jam_masuk);
        setSuccessModalMessage("Absen masuk berhasil");
        setSuccessModalVisible(true);
      } else {
        setFailedModalMessage(response.data.message);
        setFailedModalVisible(true);
      }
    } else {
      setFailedModalMessage("Data user tidak tersedia");
      setFailedModalVisible(true);
    }
  } catch (error) {
    setFailedModalMessage("Terjadi kesalahan saat mengirim data presensi");
    setFailedModalVisible(true);
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
    console.error("Terjadi kesalahan saat mengirim data presensi:", error);
  }
};
