import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.White,
  },
  timeContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 5,
    position: "absolute",
    top: 20,
    zIndex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  timeText: {
    fontSize: 30,
    fontFamily: Font["Poppins-Bold"],
    color: Color.White,
  },
});

export default styles;