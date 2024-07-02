import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile Screen/ProfileScreen";
import Personal_Info from "../screens/Profile Screen/Pages/Personal_Info";
import Security from "../screens/Profile Screen/Pages/Security";
import Privacy_Policy from "../screens/Profile Screen/Pages/Privacy_Policy";
import About_SAS from "../screens/Profile Screen/Pages/About_SAS";
import Color from "../utils/Color";
import Font from "../utils/Font";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Personal_Info"
        component={Personal_Info}
        options={({ route }) => ({
          title: route.params?.title ?? "Personal Info",
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("profile")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={({ route }) => ({
          title: route.params?.title ?? "Security",
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("profile")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Privacy_Policy"
        component={Privacy_Policy}
        options={({ route }) => ({
          title: route.params?.title ?? "Privacy Policy",
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("profile")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="About_SAS"
        component={About_SAS}
        options={({ route }) => ({
          title: route.params?.title ?? "About SAS",
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            paddingVertical: 14,
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("profile")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
