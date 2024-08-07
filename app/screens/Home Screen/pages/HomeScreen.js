import React, { useEffect, useState, useRef } from "react";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../contents/Header";
import Inspiration from "../contents/Inspiration";
import Wrap from "../contents/Wrap";
import ListServices from "../contents/ListServices";
import Events from "../contents/Events";

import styles from "../css/HomeScreenStyles";
import News from "../contents/News";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser(parsedData);
        } else {
          console.error("No user data found");
        }
      }  catch (error) {
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
      <News />
      <Events />
    </ScrollView>
  );
};

export default HomeScreen;
