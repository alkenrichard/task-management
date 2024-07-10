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
        <Text style={styles.modalText1}>
          Anda telah berhasil mengajukan cuti{"\n"}
          <Text>
            Jenis Izin{"\t"}
            {"\t"}
            {"\t"}
            {"\t"}:{" "}
            {jenisIzin &&
              pilihanIzinKhusus.find((item) => item.key === jenisIzin)?.value}
            {"\n"}
          </Text>
          <Text style={styles.start}>
            Dari{"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}
            {"\t"}:{" "}
            {format(tanggalMulaiCuti, "EEEE, d MMMM yyyy", { locale: id })}
            {"\n"}
          </Text>
          <Text>
            Pengganti{"\t"}
            {"\t"}
            {"\t"}: {pengganti}
          </Text>
        </Text>
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
  },
  modalText1: {
    textAlign: "flex-start",
    fontSize: 17,
    fontFamily: Font["Poppins-Medium"],
  },
  modalText2: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: Font["Poppins-Medium"],
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
  start: {
    color: Color.Green,
  },
});
