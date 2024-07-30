import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 10,
    marginBottom: 5,
  },
  textInput: {
    width: "85%",
    padding: 7,
    paddingHorizontal: 16,
    borderRadius: 30,
    fontSize: 16,
    fontFamily: Font["Poppins-Regular"],
    backgroundColor: Color.White,
  },
  cardContainer: {
    paddingVertical: 8,
  },
  card: {
    width: 350,
    marginBottom: 16,
    marginRight: 16,
    marginBottom: 16,
  },
  cardCover: {
    width: 350,
    height: 170,
  },
  cardContent: {
    marginTop: 8,
  },
  cardTitle: {
    fontFamily: Font["Poppins-Medium"],
  },
  cardDesc: {
    fontFamily: Font["Poppins-Regular"],
  },
});

export default styles;
