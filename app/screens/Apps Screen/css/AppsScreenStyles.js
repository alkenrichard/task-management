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
  square2: {
    right: -3,
    bottom: -3,
    borderRadius: 16.19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  icon: {
    borderRadius: 12,
    resizeMode: "contain",
  },
  textContainer: {
    left: 3,
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