import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  label: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 15,
  },
  form: {
    marginBottom: 10,
  },

  //Button
  rulesBtn: {
    height: 50,
    backgroundColor: Color.Red,
  },
  button: {
    borderRadius: 12,
    borderColor: Color.Primary,
    marginBottom: 10,
  },
  colorBtn: {
    height: 50,
    backgroundColor: Color.Primary,
  },
  textBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
  },

  //Text Input
  input: {
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },

  // Date Picker
  touchable: {
    borderRadius: 12,
    borderColor: Color.GreyText,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  touchableContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  verticalLine: {
    width: 1,
    height: 30,
    marginHorizontal: 15,
    backgroundColor: Color.GreyText,
  },
  touchableText: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 15,
    color: Color.Primary,
  },
});

export default styles;
