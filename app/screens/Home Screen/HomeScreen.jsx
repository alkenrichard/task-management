import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import Header from "./Components/Header";
import Inspiration from "./Components/Inspiration";
import Wrap from "./Components/Wrap";
import ListServices from "./Components/ListServices";
import Announcement from "./Components/Announcement";
import Events from "./Components/Events";

import Color from "../../utils/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log("Loaded user data:", parsedData);
          setUser(parsedData);
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    loadUserData();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User data is missing</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainContainer}>
        <Header user={user} />
        <Inspiration />
      </View>
      <Wrap user={user} />
      <ListServices />
      <Announcement />
      <Events />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Color.White },
  mainContainer: { backgroundColor: Color.Primary, paddingBottom: "10%" },
});
