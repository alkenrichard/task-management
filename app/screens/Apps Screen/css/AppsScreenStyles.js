import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

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

export default styles;