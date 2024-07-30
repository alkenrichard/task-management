import axios from "axios";
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
