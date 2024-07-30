import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
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
        <Text style={styles.rulesTitle}>Syarat & Ketentuan{"\n"}</Text>
        <Text style={styles.rulesText}>
          {"\u2022"} Cuti/Izin yang dimasukan, perlu mendapat persetujuan
          atasan.
          {"\n"}
          {"\n"}
          {"\u2022"} Data Izin khusus akan otomatis terdata di rekap absen,
          sehingga tidak perlu entry melalui menu rekap absen.
          {"\n"}
          {"\n"}
          {"\u2022"} Masukan informasi tanggal awal. Sistem akan menghitung
          tanggal dan memperhitungkan kalender pendidikan dan libur nasional.
          {"\n"}
          {"\n"}
          {"\u2022"} Masukan informasi tanggal awal. Sistem akan menghitung
          tanggal dan memperhitungkan kalender pendidikan dan libur nasional.
          {"\n"}
        </Text>
        <Text style={styles.rulesTitle}>
          {"\n"}Peraturan Yayasan{"\n"}
        </Text>
        <Text style={styles.rulesText}>
          {"\u2022"} 3 hari untuk Pegawai sendiri menikah.{"\n"}
          {"\u2022"} 2 hari untuk Anak kandung menikah.{"\n"}
          {"\u2022"} 2 hari untuk Anak adopsi menikah.{"\n"}
          {"\u2022"} 3 hari untuk Istri meninggal.{"\n"}
          {"\u2022"} 3 hari untuk Suami meninggal.{"\n"}
          {"\u2022"} 3 hari untuk Anak meninggal.{"\n"}
          {"\u2022"} 3 hari untuk Orang tua meninggal.{"\n"}
          {"\u2022"} 3 hari untuk Mertua meninggal.{"\n"}
          {"\u2022"} 2 hari untuk Istri melahirkan.{"\n"}
          {"\u2022"} 2 hari untuk Istri keguguran.{"\n"}
          {"\u2022"} 3 bulan untuk Pegawai sendiri melahirkan.{"\n"}
          {"\u2022"} 2 hari untuk Pegawai sendiri keguguran.{"\n"}
          {"\u2022"} 1 hari untuk Anggota keluarga serumah meninggal.{"\n"}
          {"\u2022"} 2 hari untuk Anak dibaptis.{"\n"}
          {"\u2022"} 2 hari untuk Anak sidhi.{"\n"}
          {"\u2022"} 2 hari untuk Anak khitan.{"\n"}
          {"\n"}
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
  pilihanIzinKhusus,
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
              pilihanIzinKhusus.find((item) => item.id === jenisIzin)?.value}
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
        <Text style={styles.modalText2}>
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
    borderBottomWidth: 1,
    borderBottomColor: Color.GreyText,
    textDecorationLine: "none",
  },
  rulesButton: {
    padding: 5,
    alignSelf: "flex-end",
    borderRadius: 20,
  },
  rulesButtonText: {
    color: Color.Black,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    textAlign: "center",
  },
});
