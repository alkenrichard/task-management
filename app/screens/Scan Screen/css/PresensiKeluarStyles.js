import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  dateContainer: {
    alignItems: "center",
    paddingBottom: 50,
    paddingTop: 50,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.5,
  },
  button: {
    borderRadius: 150,
    width: 300,
    height: 300,
    backgroundColor: Color.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 28,
    fontFamily: Font["Poppins-Medium"],
    color: Color.White,
    marginTop: 10,
  },
  timeText: {
    fontSize: 28,
    fontFamily: Font["Poppins-Bold"],
    color: Color.Black,
  },
  dateText: {
    fontSize: 20,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
  },
});

export default styles;