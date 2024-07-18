import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  return (
    <View>
      <Text>{userData.nama_lengkap}</Text>
      <Text>{userData.nik}</Text>
      <Text>{userData.nohp || " - "}</Text>
      <Text>{userData.email_penabur}</Text>
      <Text>{userData.divisi}</Text>
      <Text>{userData.penempatan_payroll}</Text>
    </View>
  );
};

export default Personal_Info;

const styles = StyleSheet.create({});
