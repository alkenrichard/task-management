import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../css/PersonalInfoStyles";

const Personal_Info = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data !== null) {
          setUserData(JSON.parse(data));
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>User Data Not Found</Text>
      </View>
    );
  }

  const data = [
    { label: "Nama Lengkap", value: userData.nama_lengkap },
    { label: "NIK", value: userData.nik },
    { label: "No HP", value: userData.nohp || " - " },
    { label: "Email", value: userData.email_penabur },
    { label: "Divisi", value: userData.divisi },
    { label: "Penempatan Payroll", value: userData.penempatan_payroll },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.infoColumn}>
      <Text style={styles.label}>{item.label}:</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasi Pribadi</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Personal_Info;
