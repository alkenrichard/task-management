import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import CalendarScreen from "../screens/Calendar Screen/CalendarScreen";
import HomeNavigation from "./HomeNavigation";
import ScanNavigation from "./ScanNavigation";
import ProfileNavigation from "./ProfileNavigation";

import Font from "../utils/Font";
import Color from "../utils/Color";
import AppsNvigation from "./AppsNavigation";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Color.Primary,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.textNavigation]}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AppsScreen"
        component={AppsNvigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.textNavigation]}>Apps</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ScanScreen"
        component={ScanNavigation}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <View>
              <LinearGradient
                colors={[Color.Yellow, Color.White]}
                locations={[0.6, 1]}
                style={{
                  top: -25,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 65,
                  height: 65,
                  borderRadius: 50,
                  elevation: 3,
                  borderWidth: 7,
                  borderColor: "white",
                }}
              >
                <MaterialIcons
                  name="qr-code-scanner"
                  size={size}
                  color={color}
                />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.textNavigation]}>
              Calendar
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={[{ color: color }, styles.textNavigation]}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  textNavigation: {
    fontSize: 14,
    marginTop: -5,
    fontFamily: Font["Outfit-Medium"],
  },
  tabIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
