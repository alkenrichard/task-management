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
  input: {
    borderWidth: 1,
    borderColor: Color.GreyText,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
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
  button: {
    borderRadius: 12,
    borderColor: Color.Primary,
  },
  colorBtn: {
    height: 50,
    backgroundColor: Color.Primary,
  },
  calendarForm: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  calendarText: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    color: Color.Primary,
    textAlign: "left",
  },
  btnConfirm: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  textBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
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
