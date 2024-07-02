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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { pilihanIzinBiasa } from "../../../data/IzinData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

const Izin_Biasa = () => {
  const [jenisIzin, setJenisIzin] = useState();
  const [tanggalMulaiCuti, setTanggalMulaiCuti] = useState(new Date());
  const [alasanCuti, setAlasanCuti] = useState("");
  const [pengganti, setPengganti] = useState("");
  const [showTanggalMulaiPicker, setShowTanggalMulaiPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [formIncomplete, setFormIncomplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf,image/*",
      });

      if (res.type === "success") {
        setSelectedFile(res);
      }
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const uploadFile = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: selectedFile.mimeType,
        name: selectedFile.name,
      });

      try {
        const response = await fetch("YOUR_UPLOAD_ENDPOINT", {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      console.warn("No file selected");
    }
  };

  const submitForm = () => {
    if (!tanggalMulaiCuti || !alasanCuti || !pengganti || !selectedFile) {
      setFormIncomplete(true);
    } else {
      setFormIncomplete(false);
      setModalVisible(true);

      console.log("==============================");
      console.log("Data pengajuan Izin Biasa:");
      console.log("Nama Karyawan:", userData.nama_lengkap);
      console.log(
        "Jenis Izin:",
        jenisIzin &&
          pilihanIzinBiasa.find((item) => item.key === jenisIzin)?.value
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
            data={pilihanIzinBiasa}
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

        <View style={styles.form}>
          <Text style={styles.label}>Upload Bukti (max 5mb):</Text>
          <Button
            style={styles.button}
            contentStyle={styles.colorBtn}
            labelStyle={styles.textBtn}
            mode="contained"
            icon={() => (
              <MaterialCommunityIcons
                name="file-upload"
                size={24}
                color={Color.White}
              />
            )}
            onPress={pickDocument}
          >
            Pilih File (PDF/JPG)
          </Button>
          {selectedFile && (
            <Text style={styles.fileInfo}>
              File Terpilih: {selectedFile.name}
            </Text>
          )}
        </View>

        <View style={styles.btnConfirm}>
          <Button
            style={styles.button}
            contentStyle={styles.colorBtn}
            labelStyle={styles.textBtn}
            mode="contained"
            onPress={() => {
              submitForm();
              uploadFile();
            }}
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
                {"\u2022"} Izin lupa presensi dimasukan per hari dan akan
                dilaporkan khusus untuk memantau kasus lupa presensi.{"\n"}
                {"\n"}
                {"\u2022"} Izin hadir (jari tidak terbaca sistem) dimasukan per
                hari dan akan dilaporkan khusus untuk menindaklanjuti kasus jari
                tidak terbaca sistem.{"\n"}
                {"\n"}
                {"\u2022"} Masukan informasi tanggal awal.{"\n"}
                {"\n"}
                {"\u2022"} Untuk informasi tugas (EVENT, TRAINING, dan DINAS
                LUAR), maka hari sabtu/minggu diperhitungkan.
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
              <Text style={styles.modalText}>
                Anda telah berhasil mengajukan cuti{"\n"}
                <Text>
                  Jenis Izin{"\t"}
                  {"\t"}
                  {"\t"}
                  {"\t"}
                  {"\t"}:{" "}
                  {jenisIzin &&
                    pilihanIzinBiasa.find((item) => item.key === jenisIzin)
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
              <Text style={styles.modalText}>
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

export default Izin_Biasa;

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
  modalText: {
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
  },
  fileInfo: {
    marginTop: 10,
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    color: Color.Primary,
  },
});
