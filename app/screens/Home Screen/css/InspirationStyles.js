import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth - 60;
const cardMargin = 20;

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

export default styles;