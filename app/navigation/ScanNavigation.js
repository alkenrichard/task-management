import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ScanScreen from "../screens/Scan Screen/pages/ScanScreen";
import Presensi_Keluar from "../screens/Scan Screen/pages/Presensi_Keluar";
import Menu_Cuti from "../screens/Scan Screen/pages/Menu_Cuti";
import Cuti_Tahunan from "../screens/Scan Screen/pages/Cuti_Tahunan";
import Izin_Khusus from "../screens/Scan Screen/pages/Izin_Khusus";
import Izin_Biasa from "../screens/Scan Screen/pages/Izin_Biasa";

import Color from "../utils/Color";
import Font from "../utils/Font";

const Stack = createStackNavigator();

const ScanNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="scan"
        component={ScanScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Presensi_Keluar"
        component={Presensi_Keluar}
        options={{
          headerTitle: "Presensi Keluar",
          headerStyle: {
            backgroundColor: Color.Primary,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            textAlign: "center",
          },
          headerTintColor: Color.White,
          headerTitleAlign: "center",
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("scan")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Menu_Cuti"
        component={Menu_Cuti}
        options={{
          headerTitle: "Menu Cuti",
          headerStyle: {
            backgroundColor: Color.Primary,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            textAlign: "center",
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("scan")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cuti_Tahunan"
        component={Cuti_Tahunan}
        options={{
          headerTitle: "Cuti Tahunan",
          headerStyle: {
            backgroundColor: Color.Primary,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Menu_Cuti")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Izin_Khusus"
        component={Izin_Khusus}
        options={{
          headerTitle: "Izin Khusus",
          headerStyle: {
            backgroundColor: Color.Primary,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Menu_Cuti")}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Izin_Biasa"
        component={Izin_Biasa}
        options={{
          headerTitle: "Izin Biasa",
          headerStyle: {
            backgroundColor: Color.Primary,
            height: 60,
          },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Menu_Cuti")}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ScanNavigation;
