import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import Font from "../../../utils/Font";
import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";

const { width: screenWidth } = Dimensions.get("window");

const Header = ({ user }) => {
  if (!user || !user.nama_lengkap) {
    console.error("User data is missing in Header component");
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User data is missing</Text>
      </View>
    );
  }

  const firstName = user.nama_lengkap.split(" ")[0];

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.itemProfile}>
          <Text numberOfLines={3} style={styles.textWelcome}>
            Halo {firstName}
          </Text>
          <Image source={Collection.Profile} style={styles.userImage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Color.White,
  },
  textWelcome: {
    fontFamily: Font["Poppins-Bold"],
    color: Color.Black,
    fontSize: 24,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemProfile: {
    width: screenWidth - 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
});
export default Header;
