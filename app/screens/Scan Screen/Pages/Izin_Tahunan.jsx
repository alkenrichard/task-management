import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, RadioButton } from "react-native-paper";
import LottieView from "lottie-react-native";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Font from "../../../utils/Font";
import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

const Izin_Tahunan = () => {
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [jumlahHariCuti, setJumlahHariCuti] = useState(1);
  const [tanggalMulaiCuti, setTanggalMulaiCuti] = useState(new Date());
  const [alasanCuti, setAlasanCuti] = useState("");
  const [pengganti, setPengganti] = useState("");
  const [showTanggalMulaiPicker, setShowTanggalMulaiPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleJumlahHariChange = (type) => {
    if (type === "increment" && jumlahHariCuti < 30) {
      setJumlahHariCuti(jumlahHariCuti + 1);
    } else if (type === "decrement" && jumlahHariCuti > 1) {
      setJumlahHariCuti(jumlahHariCuti - 1);
    }
  };

  const onChangeTanggalMulai = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalMulaiCuti;
    setShowTanggalMulaiPicker(false);
    setTanggalMulaiCuti(currentDate);
  };

  const showTanggalMulaiPickerModal = () => {
    setShowTanggalMulaiPicker(true);
  };

  const submitForm = () => {
    if (
      !jumlahHariCuti ||
      !tanggalMulaiCuti ||
      !alasanCuti ||
      !pengganti
    ) {
      setFormIncomplete(true);
    } else {
      setFormIncomplete(false);
      setModalVisible(true);

      console.log("==============================");
      console.log("Data pengajuan Izin Tahunan:");
      console.log("Nama Karyawan:", namaKaryawan);
      console.log("Jumlah Hari:", jumlahHariCuti);
      console.log("Tanggal Mulai Cuti:", tanggalMulaiCuti);
      console.log("Alasan Cuti:", alasanCuti);
      console.log("Pengganti:", pengganti);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 80, android: 500 })}
    >
      <ScrollView>
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
          <Text style={styles.label}>Jumlah Hari Cuti:</Text>
          <View style={styles.jumlahHariContainer}>
            <TouchableOpacity
              onPress={() => handleJumlahHariChange("decrement")}
              style={styles.jumlahHariButton}
            >
              <Text style={styles.jumlahHariButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.jumlahHariInput}
              value={String(jumlahHariCuti)}
              keyboardType="numeric"
              editable={false}
            />
            <TouchableOpacity
              onPress={() => handleJumlahHariChange("increment")}
              style={styles.jumlahHariButton}
            >
              <Text style={styles.jumlahHariButtonText}>+</Text>
            </TouchableOpacity>
          </View>
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
                  Jumlah Hari{"\t"}
                  {"\t"}: {jumlahHariCuti} {"\n"}
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

export default Izin_Tahunan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: { backgroundColor: Color.White },
  label: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 15,
  },
  form: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
  },
  colorBtn: {
    height: 50,
    backgroundColor: Color.Primary,
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
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
  jumlahHariContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  jumlahHariButton: {
    padding: 10,
    backgroundColor: Color.LightGray,
    borderRadius: 5,
  },
  jumlahHariButtonText: {
    fontSize: 18,
    color: Color.DarkGray,
  },
  jumlahHariInput: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    width: 60,
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
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
    fontSize: 17,
    fontFamily: Font["Poppins-Medium"],
  },
  start: { color: Color.Green },
  end: { color: Color.Red },
  modalButton: {
    padding: 10,
    borderRadius: 12,
  },
  modalButtonText: {
    color: Color.Black,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
  },
});
