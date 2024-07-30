import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
  },
  containerSquare: {
    alignItems: "center",
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
    alignItems: "center",
  },
  text: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;