import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import LottieView from "lottie-react-native";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Collection from "../../utils/Collection";
import Font from "../../utils/Font";
import Color from "../../utils/Color";

export const RulesModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.rulesContainer}>
      <ScrollView style={styles.rulesContent}>
        <TouchableOpacity style={styles.rulesButton} onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.rulesTitle}>
          {"\n"}Syarat & Ketentuan{"\n"}
        </Text>
        <Text style={styles.rulesText}>
          {"\u2022"} Izin/Informasi tugas yang dimasukan, perlu mendapat
          persetujuan atasan.{"\n"}
          {"\n"}
          {"\u2022"} Data izin biasa akan otomatis terdata di rekap absen,
          sehingga tidak perlu entry melalui menu rekap absen.{"\n"}
          {"\n"}
          {"\u2022"} Izin sakit dimasukan per hari.{"\n"}
          {"\n"}
          {"\u2022"} Izin lupa presensi dimasukan per hari dan akan dilaporkan
          khusus untuk memantau kasus lupa presensi.{"\n"}
          {"\n"}
          {"\u2022"} Izin hadir (jari tidak terbaca sistem) dimasukan per hari
          dan akan dilaporkan khusus untuk menindaklanjuti kasus jari tidak
          terbaca sistem.{"\n"}
          {"\n"}
          {"\u2022"} Masukan informasi tanggal awal.{"\n"}
          {"\n"}
          {"\u2022"} Untuk informasi tugas (EVENT, TRAINING, dan DINAS LUAR),
          maka hari sabtu/minggu diperhitungkan.
        </Text>
      </ScrollView>
    </View>
  </Modal>
);

export const SuccessModal = ({
  visible,
  onClose,
  jenisIzin,
  tanggalMulaiCuti,
  pengganti,
  pilihanIzinBiasa,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <LottieView
          resizeMode="contain"
          style={{ width: 100, height: 100 }}
          source={Collection.Lottie_Checklist}
          autoPlay
          loop
        />
        <Text style={styles.modalText}>
          Anda telah berhasil mengajukan cuti{"\n"}
        </Text>
        <View style={styles.row}>
          <Text style={styles.label}>Jenis Izin:</Text>
          <Text style={styles.value}>
            {jenisIzin &&
              pilihanIzinBiasa.find((item) => item.id === jenisIzin)?.value}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dari:</Text>
          <Text style={styles.value}>
            {format(tanggalMulaiCuti, "EEEE, d MMMM yyyy", { locale: id })}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pengganti:</Text>
          <Text style={styles.value}>{pengganti}</Text>
        </View>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export const IncompleteFormModal = ({ visible, onClose }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <LottieView
          style={{ width: 60, height: 60 }}
          source={Collection.Lottie_Close}
          autoPlay
          loop
        />
        <Text style={styles.modalText}>
          Mohon lengkapi semua kolom pada formulir pengajuan cuti.
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>OKE</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 17,
    fontFamily: Font["Poppins-Medium"],
    textAlign: "center",
  },
  modalButton: {
    padding: 10,
    borderRadius: 12,
  },
  modalButtonText: {
    color: Color.Black,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
    textAlign: "center",
  },
  start: {
    color: Color.Green,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  label: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 17,
    color: Color.Black,
  },
  value: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
    color: Color.Black,
  },

  // RULES
  rulesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 50,
    paddingBottom: 50,
  },
  rulesContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  rulesButton: {
    alignSelf: "flex-end",
  },
  rulesTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Font["Poppins-Bold"],
    color: Color.Primary,
    borderBottomWidth: 1,
    borderBottomColor: Color.GreyText,
    textDecorationLine: "none",
  },
  rulesText: {
    textAlign: "justify",
    fontSize: 15,
    fontFamily: Font["Poppins-Medium"],
  },
});
