import { Dimensions, StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: Color.White,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginVertical: 20,
  },
  listHistoryContainer: {
    width: width * 0.42,
    minHeight: 80,
    justifyContent: "space-around",
    alignItems: "flex-start",
    borderWidth: 1.5,
    borderColor: Color.Grey,
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  allItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  textContainer: {
    flexDirection: "column",
  },
  number: {
    fontSize: 16,
    fontFamily: Font["Poppins-Regular"],
  },
  label: {
    fontSize: 13,
    fontFamily: Font["Poppins-Medium"],
    color: Color.GreyText,
  },
});

export default styles;
