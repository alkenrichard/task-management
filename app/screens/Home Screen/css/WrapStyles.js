import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
  },
  wrap: {
    marginHorizontal: 20,
    marginTop: -30,
    height: 80,
    borderRadius: 20,
    backgroundColor: Color.White,
    elevation: 4,
  },
  wrapText: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  type: {
    height: 80,
    width: 70,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  name: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
  },
  school: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 16,
    color: Color.Primary,
  },
  line: {
    width: 2.5,
    height: "85%",
    backgroundColor: Color.Red,
    marginHorizontal: 10,
  },
});

export default styles;