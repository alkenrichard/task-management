import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker"; // Impor Picker

const History = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Bulan default adalah bulan sekarang
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Tahun sekarang

  useEffect(() => {
    fetchAttendanceHistory();
  }, [selectedMonth, currentYear]); // Fetch data ketika bulan atau tahun berubah

  const fetchAttendanceHistory = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("userData")); // Ambil data user dari AsyncStorage

    if (userData) {
      try {
        const nik = userData.nik; // Ambil NIK dari user data

        // Membuat URL untuk memanggil API
        const url = `https://devbpkpenaburjakarta.my.id/api_Login/Absen.php?nik=${nik}&bulan=${selectedMonth}&tahun=${currentYear}`;

        const response = await axios.get(url);

        console.log("API response:", response.data); // Log respons dari API

        if (response.data) {
          setAttendanceData(response.data);
        } else {
          console.log("No data found");
          setAttendanceData([]); // Reset data jika tidak ada
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Tanggal: {item.tanggal_masuk}</Text>
      <Text style={styles.itemText}>Jam Masuk: {item.jam_masuk}</Text>
      <Text style={styles.itemText}>
        Jam Pulang: {item.jam_pulang || "Belum Absen Pulang"}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Riwayat Absensi Bulanan</Text>

      <Picker
        selectedValue={selectedMonth}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {/* Daftar bulan */}
        {[...Array(12)].map((_, index) => (
          <Picker.Item
            key={index}
            label={new Date(0, index).toLocaleString("default", {
              month: "long",
            })}
            value={index + 1}
          />
        ))}
      </Picker>

      <FlatList
        data={attendanceData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text>Belum ada data absensi.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginVertical: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
});

export default History;
