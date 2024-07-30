import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../css/HistoryStyles";

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
