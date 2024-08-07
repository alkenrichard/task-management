import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  title: {
    fontSize: 20,
    fontFamily: Font["Poppins-Bold"],
    marginBottom: 10,
    color: Color.Black,
  },
  listContent: {
    width: "100%",
  },
  infoColumn: {
    flexDirection: "column",
    gap: 5,
    justifyContent: "space-between",
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  label: {
    fontFamily: Font["Poppins-Bold"],
    color: Color.label_profile,
  },
  value: {
    fontFamily: Font["Poppins-Regular"],
    color: Color.value_profile,
  },
});

export default styles;
