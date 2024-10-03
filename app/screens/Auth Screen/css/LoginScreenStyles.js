import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: Color.White,
    justifyContent: "space-between",
  },
  headerContainer: {
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

  //Lottie
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 16,
  },
  lottie: {
    height: 350,
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  textWelcome1: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 24,
    color: Color.Primary,
  },
  textWelcome2: {
    textAlign: "center",
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    flexWrap: "wrap",
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  dot: {
    marginHorizontal: 5,
    fontSize: 20,
  },

  //Button
  button: {
    borderRadius: 30,
  },
  loginBtn: {
    height: 55,
    backgroundColor: Color.Primary,
    borderRadius: 30,
  },
  textLoginBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
  },
  googleBtn: {
    height: 55,
    borderRadius: 30,
    borderWidth: 1,
    color: Color.Black,
    borderColor: Color.Primary,
  },
  textGoogleBtn: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 16,
    color: Color.Primary,
  },

  //Version
  versionContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  versionText: {
    fontSize: 15,
    fontFamily: Font["Poppins-Regular"],
  },
});

export default styles;
