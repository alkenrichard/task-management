import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import LottieView from "lottie-react-native";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Font from "../../../utils/Font";
import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";
import { pilihanIzinKhusus } from "../../../data/IzinData";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

const Izin_Khusus = () => {
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [jenisIzin, setJenisIzin] = useState();
  const [tanggalMulaiCuti, setTanggalMulaiCuti] = useState(new Date());
  const [alasanCuti, setAlasanCuti] = useState("");
  const [pengganti, setPengganti] = useState("");
  const [showTanggalMulaiPicker, setShowTanggalMulaiPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [formIncomplete, setFormIncomplete] = useState(false);

  const [userData, setUserData] = useState(null);

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

  const onChangeTanggalMulai = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalMulaiCuti;
    setShowTanggalMulaiPicker(false);
    setTanggalMulaiCuti(currentDate);
  };

  const showTanggalMulaiPickerModal = () => {
    setShowTanggalMulaiPicker(true);
  };

  const submitForm = () => {
    if (!tanggalMulaiCuti || !alasanCuti || !pengganti) {
      setFormIncomplete(true);
    } else {
      setFormIncomplete(false);
      setModalVisible(true);

      console.log("==============================");
      console.log("Data pengajuan Izin Khusus:");
      console.log("Nama Karyawan:", namaKaryawan);
      console.log(
        "Jenis Izin:",
        jenisIzin && data.find((item) => item.key === jenisIzin)?.value
      );
      console.log("Tanggal Mulai Cuti:", tanggalMulaiCuti);
      console.log("Alasan Cuti:", alasanCuti);
      console.log("Pengganti:", pengganti);
    }
  };

  const showRules = () => {
    setRulesVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 500 })}
    >
      <ScrollView>
        <Button
          style={styles.button}
          contentStyle={styles.rulesBtn}
          labelStyle={styles.textBtn}
          mode="contained"
          icon={() => (
            <AntDesign name="infocirlceo" size={22} color={Color.White} />
          )}
          onPress={showRules}
        >
          Baca Peraturan
        </Button>

        <View style={styles.form}>
          <Text style={styles.label}>Nama:</Text>
          <TextInput
            style={styles.input}
            value={
              userData ? userData.nama_lengkap : "Data user tidak ditemukan"
            }
            editable={false}
            multiline
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>NIK:</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.nik : "Data user tidak ditemukan"}
            editable={false}
            multiline
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Jenis Izin:</Text>
          <SelectList
            data={pilihanIzinKhusus}
            boxStyles={styles.form}
            setSelected={setJenisIzin}
            placeholder="Pilih Jenis Izin"
            value={jenisIzin}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Tanggal Mulai Cuti:</Text>
          <Button
            style={styles.button}
            contentStyle={styles.colorBtn}
            labelStyle={styles.textBtn}
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                name="calendar"
                size={24}
                color={Color.White}
              />
            )}
            onPress={showTanggalMulaiPickerModal}
          >
            {formatDate(tanggalMulaiCuti)}
          </Button>
          {showTanggalMulaiPicker && (
            <DateTimePicker
              style={styles.form}
              testID="dateTimePicker"
              value={tanggalMulaiCuti}
              mode="date"
              display="default"
              onChange={onChangeTanggalMulai}
            />
          )}
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Alasan Cuti:</Text>
          <TextInput
            style={styles.input}
            value={alasanCuti}
            onChangeText={setAlasanCuti}
            multiline
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Pengganti:</Text>
          <TextInput
            style={styles.input}
            value={pengganti}
            onChangeText={setPengganti}
            multiline
          />
        </View>

        <View style={styles.btnConfirm}>
          <Button
            style={styles.button}
            contentStyle={styles.colorBtn}
            labelStyle={styles.textBtn}
            mode="contained"
            onPress={submitForm}
          >
            Ajukan Cuti
          </Button>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={rulesVisible}
          onRequestClose={() => setRulesVisible(false)}
        >
          <View style={styles.rulesContainer}>
            <ScrollView style={styles.rulesContent}>
              <TouchableOpacity
                style={styles.rulesButton}
                onPress={() => setRulesVisible(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.rulesTitle}>Syarat & Ketentuan{"\n"}</Text>
              <Text style={styles.rulesText}>
                {"\u2022"} Cuti/Izin yang dimasukan, perlu mendapat persetujuan
                atasan.
                {"\n"}
                {"\n"}
                {"\u2022"} Data Izin khusus akan otomatis terdata di rekap
                absen, sehingga tidak perlu entry melalui menu rekap absen.
                {"\n"}
                {"\n"}
                {"\u2022"} Masukan informasi tanggal awal. Sistem akan
                menghitung tanggal dan memperhitungkan kalender pendidikan dan
                libur nasional.
                {"\n"}
                {"\n"}
                {"\u2022"} Masukan informasi tanggal awal. Sistem akan
                menghitung tanggal dan memperhitungkan kalender pendidikan dan
                libur nasional.
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
                {"\u2022"} 1 hari untuk Anggota keluarga serumah meninggal.
                {"\n"}
                {"\u2022"} 2 hari untuk Anak dibaptis.{"\n"}
                {"\u2022"} 2 hari untuk Anak sidhi.{"\n"}
                {"\u2022"} 2 hari untuk Anak khitan.{"\n"}
                {"\n"}
              </Text>
            </ScrollView>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
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
                  {"\t"}
                  {"\t"}:{" "}
                  {jenisIzin &&
                    pilihanIzinKhusus.find((item) => item.key === jenisIzin)
                      ?.value}
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
                  {"\t"}
                  {"\t"}: {formatDate(tanggalMulaiCuti)}
                  {"\n"}
                </Text>
                <Text>
                  Pengganti{"\t"}
                  {"\t"}
                  {"\t"}
                  {"\t"}: {pengganti}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={formIncomplete}
          onRequestClose={() => {
            setFormIncomplete(false);
          }}
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

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setFormIncomplete(false)}
              >
                <Text style={styles.modalButtonText}>OKE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Izin_Khusus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  label: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 15,
  },
  form: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    marginBottom: 10,
  },
  colorBtn: {
    height: 50,
    backgroundColor: Color.Primary,
  },
  textBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  start: {
    color: Color.Green,
  },
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

  // RULES
  rulesBtn: {
    height: 50,
    backgroundColor: Color.Red,
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
