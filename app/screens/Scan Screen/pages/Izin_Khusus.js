import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "react-native-paper";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import {
  RulesModal,
  SuccessModal,
  IncompleteFormModal,
} from "../../../components/Modals/Modal_Izin_Khusus";
import { pilihanIzinKhusus } from "../../../data/IzinData";
import Color from "../../../utils/Color";
import { permitAPI } from "../../../api/permit";
import styles from "../css/IzinKhususStyles"

function formatDate(date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: id });
}

const Izin_Khusus = () => {
  const [jenisIzin, setJenisIzin] = useState();
  const [tanggalMulaiCuti, setTanggalMulaiCuti] = useState(new Date());
  const [tanggalSelesaiCuti, setTanggalSelesaiCuti] = useState(new Date());
  const [alasanCuti, setAlasanCuti] = useState("");
  const [pengganti, setPengganti] = useState("");
  const [showTanggalMulaiPicker, setShowTanggalMulaiPicker] = useState(false);
  const [showTanggalSelesaiPicker, setShowTanggalSelesaiPicker] =
    useState(false);
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
    if (!tanggalMulaiCuti || !alasanCuti || !pengganti || !jenisIzin) {
      setFormIncomplete(true);
    } else {
      setFormIncomplete(false);

      if (!pilihanIzinKhusus) {
        Alert.alert("Error", "Pilihan izin tidak tersedia");
        return;
      }

      const selectedIzin = pilihanIzinKhusus.find(
        (Option) => Option.value === jenisIzin
      );

      if (!selectedIzin) {
        Alert.alert("Error", "Jenis izin tidak valid");
        return;
      }

      console.log("Selected Izin:", selectedIzin);

      const payload = {
        nik: userData.nik,
        nama_lengkap: userData.nama_lengkap,
        kode_bagian: userData.divisi,
        kode_izin_masuk: selectedIzin.id,
        alasan: alasanCuti,
        pengganti: pengganti,
        tanggal_mulai_izin: format(tanggalMulaiCuti, "yyyy-MM-dd"),
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
              userData ? userData.nama_lengkap : "Nama pengguna tidak ditemukan"
            }
            editable={false}
            multiline
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>NIK:</Text>
          <TextInput
            style={styles.input}
            value={userData ? userData.nik : "Nik pengguna tidak ditemukan"}
            editable={false}
            multiline
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Jenis Izin:</Text>
          <SelectList
            data={pilihanIzinKhusus}
            boxStyles={styles.form}
            setSelected={(id) => setJenisIzin(id)}
            placeholder="Pilih Jenis Izin"
            value={jenisIzin}
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Tanggal Mulai Cuti:</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={showTanggalMulaiPickerModal}
          >
            <View style={styles.touchableContent}>
              <Ionicons
                name="calendar-number"
                size={24}
                color={Color.Primary}
              />
              <View style={styles.verticalLine} />
              <Text style={styles.touchableText}>
                {formatDate(tanggalMulaiCuti)}
              </Text>
            </View>
          </TouchableOpacity>
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
          <Text style={styles.label}>Tanggal Selesai Cuti:</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={showTanggalSelesaiPickerModal}
          >
            <View style={styles.touchableContent}>
              <Ionicons
                name="calendar-number"
                size={24}
                color={Color.Primary}
              />
              <View style={styles.verticalLine} />
              <Text style={styles.touchableText}>
                {formatDate(tanggalSelesaiCuti)}
              </Text>
            </View>
          </TouchableOpacity>
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

        <RulesModal
          visible={rulesVisible}
          onClose={() => setRulesVisible(false)}
        />

        <SuccessModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          jenisIzin={jenisIzin}
          tanggalMulaiCuti={tanggalMulaiCuti}
          pengganti={pengganti}
          pilihanIzinKhusus={pilihanIzinKhusus}
        />

        <IncompleteFormModal
          visible={formIncomplete}
          onClose={() => setFormIncomplete(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Izin_Khusus;
