import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subContainer: {
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
  },
  colorBtn: {
    height: 50,
    backgroundColor: Color.Primary,
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
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
  jumlahHariContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  jumlahHariButton: {
    padding: 10,
    backgroundColor: Color.LightGray,
    borderRadius: 5,
  },
  jumlahHariButtonText: {
    fontSize: 18,
    color: Color.DarkGray,
  },
  jumlahHariInput: {
    textAlign: "center",
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
    width: 60,
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
  },
  start: { color: Color.Green },
});

export default styles;
