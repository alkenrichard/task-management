import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ServiceData from "../../../data/ServiceData";

import styles from "../css/ListServicesStyles";

const { width } = Dimensions.get("window");
const numColumns = 4;
const imageSize = width / 8;
const itemWidth = width / numColumns;

export default function ListServices() {
  const navigation = useNavigation();
  const handlePress = (service) => {
    navigation.navigate("ServiceDetail", {
      id: service.id,
      title: service.title,
    });
  };

  const filteredData = ServiceData.filter(
    (item) => item.id >= 1 && item.id <= 4
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {filteredData.map((item) => (
          <TouchableOpacity
            key={item.id}
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
        ))}
      </View>
    </View>
  );
}
