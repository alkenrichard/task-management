import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 10,
    backgroundColor: Color.White,
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    backgroundColor: Color.White,
  },
  statusIndicator: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.Grey,
  },
  row: {
    flexDirection: "row",
    marginVertical: 2,
  },
  label: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    width: 135,
  },
  value: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    flex: 1,
  },
  textSubmission: {
    fontSize: 16,
    paddingRight: 5,
    textAlign: "justify",
    fontFamily: Font["Poppins-Medium"],
  },
  moving: {
    backgroundColor: "#FFE5B4",
  },
  cancelled: {
    backgroundColor: "#F8D7DA",
  },
  success: {
    backgroundColor: "#D4EDDA",
  },
  unknown: {
    backgroundColor: "#E0E0E0",
  },
});

export default styles;
