import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import Color from "../../../utils/Color";
import Collection from "../../../utils/Collection";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 60;
const cardMargin = 20;

const data = [
  {
    id: 1,
    image: Collection.Event1,
  },
  {
    id: 2,
    image: Collection.Event2,
  },
  {
    id: 3,
    image: Collection.Event3,
  },
];

export default function Inspiration() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewRef = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const scrollToLeft = () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = data.length - 1; // Loop back to the last item if at the beginning
    }
    flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
  };

  const scrollToRight = () => {
    let newIndex = currentIndex + 1;
    if (newIndex === data.length) {
      newIndex = 0; // Loop back to the first item if at the end
    }
    flatListRef.current.scrollToIndex({ index: newIndex, animated: true });
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={scrollToLeft} style={styles.leftArrow}>
        <Ionicons name="chevron-back" size={45} color={Color.White} />
      </TouchableOpacity>
      <View style={styles.flatListContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover source={item.image} style={styles.cardCover} />
            </Card>
          )}
          keyExtractor={(item) => item.id.toString()}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          getItemLayout={(data, index) => ({
            length: cardWidth + cardMargin,
            offset: (cardWidth + cardMargin) * index,
            index,
          })}
          contentContainerStyle={styles.cardContainer}
        />
      </View>
      <TouchableOpacity onPress={scrollToRight} style={styles.rightArrow}>
        <Ionicons name="chevron-forward" size={45} color={Color.White} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: "3%",
    position: "relative",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    flexDirection: "row",
  },
  cardContainer: {
    paddingVertical: 8,
  },
  card: {
    width: cardWidth,
    marginHorizontal: cardMargin / 2,
  },
  cardCover: {
    width: cardWidth,
    height: 170,
  },
  leftArrow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  rightArrow: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 20,
    justifyContent: "center",
    zIndex: 1,
  },
});
