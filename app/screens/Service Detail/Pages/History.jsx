import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          const historyKey = `history_${parsedUserData.nik}`;
          const history = await AsyncStorage.getItem(historyKey);
          if (history) {
            setHistory(JSON.parse(history));
          }
        }
      } catch (error) {
        console.error("Failed to load history data:", error);
      }
    };

    loadHistory();
  }, []);

  
  const renderItem = ({ item }) => {
    const status = item.status ? item.status.toLowerCase() : "unknown";
    return (
      <View style={styles.itemContainer}>
        <View style={[styles.statusIndicator, styles[status]]}>
          <Text style={styles.statusText}>
            {item.status ? item.status.toUpperCase() : "UNKNOWN"}
          </Text>
        </View>
        <View style={styles.item}>
          <Text
            style={styles.textSubmission}
          >{`${item.tanggal_pengajuan}`}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Jenis Izin</Text>
            <Text style={styles.textSubmission}>:</Text>
            <Text style={styles.value}>{item.kode_izin_masuk}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal Mulai</Text>
            <Text style={styles.textSubmission}>:</Text>
            <Text style={styles.value}>{item.tanggal_mulai_izin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tanggal Selesai</Text>
            <Text style={styles.textSubmission}>:</Text>
            <Text style={styles.value}>{item.tanggal_selesai_izin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alasan</Text>
            <Text style={styles.textSubmission}>:</Text>
            <Text style={styles.value}>{item.alasan}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pengganti</Text>
            <Text style={styles.textSubmission}>:</Text>
            <Text style={styles.value}>{item.pengganti}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: Color.White,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: Color.White,
  },
  statusIndicator: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey,
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  label: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    width: 135,
  },
  value: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    flex: 1,
  },
  textSubmission: {
    fontSize: 16,
    paddingRight: 5,
    textAlign: "justify",
    fontFamily: Font["Poppins-Medium"],
  },
  moving: {
    backgroundColor: "#FFE5B4",
  },
  cancelled: {
    backgroundColor: "#F8D7DA",
  },
  success: {
    backgroundColor: "#D4EDDA",
  },
  unknown: {
    backgroundColor: "#E0E0E0",
  },
});
