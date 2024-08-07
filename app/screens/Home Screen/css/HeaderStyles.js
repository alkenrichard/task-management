import { Dimensions, StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Color.White,
  },
  textWelcome: {
    fontFamily: Font["Poppins-Bold"],
    color: Color.Black,
    fontSize: 24,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Color.Black,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemProfile: {
    width: screenWidth - 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
});

export default styles;