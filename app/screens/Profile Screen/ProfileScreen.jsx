import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Heading from "../../components/Heading";

import Color from "../../utils/Color";
import Font from "../../utils/Font";
import Collection from "../../utils/Collection";
import CustomAlert from "../../components/Alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
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

  const handleLogout = () => {
    setIsLogoutModalVisible(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);
    console.log("User logged out");
    navigation.replace("Login");
    // Lakukan logout atau tindakan lainnya di sini
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
    // Tidak melakukan apa-apa atau tindakan lainnya di sini
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainProfileContainer}>
        <View style={styles.subProfileContainer}>
          <Image source={Collection.Profile} style={styles.userImage} />
          <View style={styles.textProfile}>
            <Text style={styles.name}>{userData.nama_lengkap}</Text>
            <Text style={styles.gmail} numberOfLines={2}>
              {userData.email_penabur}
            </Text>
            <Text style={styles.noHP}>{userData.nohp || "-"}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Octicons name="pencil" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <Heading text={"Account"} />
      <View style={styles.mainListContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Personal_Info", { title: "Personal Info" })
          }
        >
          <View style={[styles.listContainer, { marginLeft: 5 }]}>
            <View style={styles.list}>
              <Octicons name="person" size={25} color={Color.Blue} />
              <Text style={styles.text}>Personal Info</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={Color.subYellow}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Security", { title: "Security" })}
        >
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <Feather name="lock" size={25} color={Color.Blue} />
              <Text style={styles.text}>Security</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={Color.subYellow}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Privacy_Policy", { title: "Privacy Policy" })
          }
        >
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <Octicons name="shield-check" size={24} color={Color.Blue} />
              <Text style={styles.text}>Privacy Policy</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={Color.subYellow}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("About_SAS", { title: "About SAS" })
          }
        >
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <AntDesign name="infocirlceo" size={25} color={Color.Blue} />
              <Text style={styles.text}>About SAS</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={Color.subYellow}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.listContainer}>
            <View style={styles.list}>
              <MaterialIcons name="logout" size={25} color={Color.Red} />
              <Text style={[styles.text, { color: Color.Red }]}>Log out</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={25}
              color={Color.Red}
            />
          </View>
        </TouchableOpacity>
      </View>
      <CustomAlert
        isVisible={isLogoutModalVisible}
        title="Logout"
        message="Are you sure you want to logout?"
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    padding: 20,
    backgroundColor: Color.White,
  },
  mainProfileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  subProfileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    maxWidth: "65%",
  },
  name: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
  },
  gmail: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 13,
  },
  noHP: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 15,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mainListContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    gap: 30,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  text: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 18,
  },
});
