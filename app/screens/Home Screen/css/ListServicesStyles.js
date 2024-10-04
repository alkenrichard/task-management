import { StyleSheet } from "react-native";
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

  square2: {
    right: -3,
    bottom: -3,
    borderRadius: 16.19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    elevation:3,
  },
  icon: {
    borderRadius: 12,
    resizeMode: "contain",
  },
  textContainer: {
    left: 3,
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