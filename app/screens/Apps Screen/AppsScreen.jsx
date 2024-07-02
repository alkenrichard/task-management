import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Heading from "../../components/Heading";
import ServiceData from "../../data/ServiceData";

import Color from "../../utils/Color";
import Font from "../../utils/Font";

const { width } = Dimensions.get("window");
const numColumns = 3;
const imageSize = width / 8;
const itemWidth = width / numColumns;

const AppsScreen = () => {
  const navigation = useNavigation();
  const handlePress = (service) => {
    navigation.navigate("ServiceDetail", {
      id: service.id,
      title: service.title,
    });
  };

  const filteredData = ServiceData.filter(
    (item) => item.id >= 5 && item.id <= 11
  );

  return (
    <View style={styles.container}>
      <Heading text={"Apps"} />
      <FlatList
        data={filteredData}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.model, { width: itemWidth }]}
            onPress={() => handlePress(item)}
          >
            <View style={styles.containerSquare}>
              <View
                style={[
                  styles.square1,
                  { width: imageSize, height: imageSize },
                ]}
              >
                <View
                  style={[
                    styles.square2,
                    { width: imageSize, height: imageSize },
                  ]}
                >
                  <Image
                    source={item.icon}
                    style={[
                      styles.icon,
                      { width: imageSize * 0.67, height: imageSize * 0.67 },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AppsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  containerSquare: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  model: {
    right: 14,
  },
  square1: {
    borderRadius: 12,
    backgroundColor: Color.Yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  square2: {
    right: -6,
    bottom: -6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.Primary,
  },
  icon: {
    borderRadius: 12,
  },
  textContainer: {
    left: 6,
    textAlign: "center",
    width: 125,
  },
  text: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
  },
});
