import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ScanScreen from "../screens/Scan Screen/ScanScreen";
import Menu_Cuti from "../screens/Scan Screen/Pages/Menu_Cuti";
import Izin_Tahunan from "../screens/Scan Screen/Pages/Izin_Tahunan";
import Izin_Khusus from "../screens/Scan Screen/Pages/Izin_Khusus";
import Izin_Biasa from "../screens/Scan Screen/Pages/Izin_Biasa";

import Color from "../utils/Color";
import Font from "../utils/Font";
import AbsensiKeluar from "../screens/Scan Screen/Pages/AbsensiKeluar";

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
        name="AbsensiKeluar"
        component={AbsensiKeluar}
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
        name="Izin_Tahunan"
        component={Izin_Tahunan}
        options={{
          headerTitle: "Izin Tahunan",
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
