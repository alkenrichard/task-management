import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
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
  buttonContainer: {
    gap: 15,
    marginTop: 80,
  },
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
    bottom: 10,
    alignItems: "center",
  },
  versionText: {
    fontSize: 15,
    fontFamily: Font["Poppins-Regular"],
  },
});

export default styles;
