import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.White,
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 10,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.White,
    borderWidth: 1,
    borderColor: Color.Grey,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: "95%",
    marginBottom: 10,
    marginHorizontal: 5,
    elevation: 0.5,
    gap: 20,
  },
  menuText: {
    fontSize: 16,
    fontFamily: Font["Poppins-Medium"],
    color: Color.Black,
    flex: 1,
  },
});

export default styles;