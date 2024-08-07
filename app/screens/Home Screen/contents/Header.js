import React from "react";
import { View, Text, Image } from "react-native";

import Collection from "../../../utils/Collection";
import styles from "../css/HeaderStyles";

export default function Header({ user }) {
  const firstName = user?.nama_lengkap?.split(" ")[0] || "";

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.itemProfile}>
          <Text numberOfLines={3} style={styles.textWelcome}>
            Halo, {firstName}
          </Text>
          <Image source={Collection.Profile} style={styles.userImage} />
        </View>
      </View>
    </View>
  );
}
