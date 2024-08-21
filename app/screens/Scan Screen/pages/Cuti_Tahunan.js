import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import Color from "../../../utils/Color";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IncompleteFormModal,
  SuccessModal,
} from "../../../components/Modals/Modal_Cuti_Tahunan";

import styles from "../css/CutiTahunanStyles";
import { permitAPI } from "../../../api/permit";

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

const Izin_Tahunan = () => {
  const [jumlahHariCuti, setJumlahHariCuti] = useState(1);
  const [tanggalMulaiCuti, setTanggalMulaiCuti] = useState(new Date());
  const [tanggalSelesaiCuti, setTanggalSelesaiCuti] = useState(new Date());
  const [alasanCuti, setAlasanCuti] = useState("");
  const [pengganti, setPengganti] = useState("");
  const [showTanggalMulaiPicker, setShowTanggalMulaiPicker] = useState(false);
  const [showTanggalSelesaiPicker, setShowTanggalSelesaiPicker] =
    useState(false);
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
  
  const onChangeTanggalSelesai = (event, selectedDate) => {
    const currentDate = selectedDate || tanggalSelesaiCuti;
    setShowTanggalSelesaiPicker(false);
    setTanggalSelesaiCuti(currentDate);
  };

  const showTanggalMulaiPickerModal = () => {
    setShowTanggalMulaiPicker(true);
  };

  const showTanggalSelesaiPickerModal = () => {
    setShowTanggalSelesaiPicker(true);
  };

  const saveHistory = async (data) => {
    try {
      const historKey = `history_${userData.nik}`;
      const history = await AsyncStorage.getItem(historKey);
      const parsedHistory = history ? JSON.parse(history) : [];
      parsedHistory.push(data);
      await AsyncStorage.setItem(historKey, JSON.stringify(parsedHistory));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  };

  const submitForm = async () => {
    if (!jumlahHariCuti || !tanggalMulaiCuti || !alasanCuti || !pengganti) {
      setFormIncomplete(true);
    } else {
      setFormIncomplete(false);
      setModalVisible(true);

      const payload = {
        nik: userData.nik,
        nama_lengkap: userData.nama_lengkap,
        kode_bagian: userData.divisi,
        kode_izin_masuk: "CTH",
        alasanCuti: alasanCuti,
        pengganti: pengganti,
        tanggal_mulai_izin: formatDate(tanggalMulaiCuti, "yyyy-MM-dd"),
        tanggal_selesai_izin: format(tanggalSelesaiCuti, "yyyy-MM-dd"),
        tanggal_pengajuan: new Date().toLocaleString(),
        status: "moving",
      };

      console.log("Data to be sent:", payload.toString());

      try {
        const response = await permitAPI(payload);

        if (response.data.success) {
          setModalVisible(true);
          saveHistory(payload);
        } else {
          Alert.alert("Error", "Gagal diajukan");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
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
          <Text style={styles.label}>Tanggal Mulai Cuti:</Text>
          <Button
            style={styles.button}
            contentStyle={styles.calendarForm}
            labelStyle={styles.calendarText}
            mode="outlined"
            icon={() => (
              <MaterialCommunityIcons
                name="calendar"
                size={24}
                color={Color.Primary}
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
          <Text style={styles.label}>Tanggal Selesai Cuti:</Text>
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
            onPress={showTanggalSelesaiPickerModal}
          >
            {formatDate(tanggalSelesaiCuti)}
          </Button>
          {showTanggalSelesaiPicker && (
            <DateTimePicker
              style={styles.form}
              testID="dateTimePicker"
              value={tanggalSelesaiCuti}
              mode="date"
              display="default"
              onChange={onChangeTanggalSelesai}
            />
          )}
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

        <SuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          jumlahHariCuti={jumlahHariCuti}
          tanggalMulaiCuti={tanggalMulaiCuti}
          pengganti={pengganti}
        />

        <IncompleteFormModal
          visible={formIncomplete}
          onClose={() => setFormIncomplete(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Izin_Tahunan;
