import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

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
  button: {
    borderRadius: 12,
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
  input: {
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  start: {
    color: Color.Green,
  },
  rulesBtn: {
    height: 50,
    backgroundColor: Color.Red,
  },
});

export default styles;