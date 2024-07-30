import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLogo: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    height: 39,
    width: 30,
  },
  textLogo: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 24,
    textAlignVertical: "center",
  },
  textHeader: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    textAlignVertical: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  Logos: {
    width: 50,
    height: 70,
    margin: 10,
  },
  textLogos: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 14,
    textAlign: "center",
    paddingStart: 20,
    paddingEnd: 20,
    marginBottom: 20,
  },

  formInput: {
    gap: 5,
  },

  //Input Email
  emailInput: {
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    marginBottom: 10,
    borderColor: Color.Primary,
  },

  //Input Password
  passwordInput: {
    flex: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    padding: 15,
    borderColor: Color.Primary,
  },

  forgotText: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 14,
    alignSelf: "flex-end",
    color: Color.Black,
  },

  //Button
  button: {
    borderRadius: 30,
    marginTop: 35,
  },
  signBtn: {
    height: 55,
    backgroundColor: Color.Primary,
    borderRadius: 30,
  },
  textSignBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  versionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: "center",
  },
  versionText: {
    fontSize: 15,
    fontFamily: Font["Poppins-Medium"],
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Color.White,
    borderRadius: 20,
    padding: 20,
    gap: 15,
    alignItems: "center",
  },
  modalText: {
    fontSize: 17,
    textAlign: "center",
    fontFamily: Font["Poppins-Medium"],
  },
  modalButton: {
    marginTop: 10,
    padding: 8,
    width: "100%",
    borderRadius: 12,
    backgroundColor: Color.Red,
  },
  modalButtonText: {
    textAlign: "center",
    color: Color.White,
    fontFamily: Font["Poppins-Bold"],
    fontSize: 17,
  },
});

export default styles;
