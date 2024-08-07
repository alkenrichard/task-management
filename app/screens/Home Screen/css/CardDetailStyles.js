import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  content: {
    marginTop: -20,
    backgroundColor: Color.White,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: Color.Black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 24,
    marginBottom: 12,
  },
  description: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 16,
    color: Color.GreyText,
  },
});

export default styles;
