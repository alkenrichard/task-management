import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Heading from "../../../components/Heading";
import ServiceData from "../../../data/ServiceData";

import styles from "../css/AppsScreenStyles";

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

