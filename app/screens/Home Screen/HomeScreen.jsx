import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";

import Header from "./Contents/Header";
import Inspiration from "./Contents/Inspiration";
import Wrap from "./Contents/Wrap";
import ListServices from "./Contents/ListServices";
import Announcement from "./Contents/Announcement";
import Events from "./Contents/Events";

import Color from "../../utils/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Menunda pemanggilan API selama 3 detik untuk melihat efek shimmer
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser(parsedData);
        } else {
          console.error("No user data found");
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();

    const animated = Animated.stagger(400, [
      headerRef.current?.getAnimated(),
      wrapRef.current?.getAnimated(),
    ]);

    Animated.loop(animated).start();
  }, []);

  if (loading) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.mainContainer}>
          <ShimmerPlaceholder ref={headerRef} style={styles.shimmerHeader} />
          <ShimmerPlaceholder ref={wrapRef} style={styles.shimmerWrap} />
        </View>
        <ShimmerPlaceholder style={styles.shimmerContent} />
        <ShimmerPlaceholder style={styles.shimmerContent} />
        <ShimmerPlaceholder style={styles.shimmerContent} />
      </ScrollView>
    );
  }

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
  shimmerHeader: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
  shimmerWrap: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  shimmerContent: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
});
