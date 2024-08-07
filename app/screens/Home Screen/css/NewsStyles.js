import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingVertical: 8,
  },
  card: {
    width: 350,
    marginBottom: 16,
    marginRight: 16,
    backgroundColor: Color.White,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // For Android shadow
    shadowColor: Color.Black,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 18,
    marginBottom: 8,
  },
  cardDesc: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    color: Color.GreyText,
  },
});

export default styles;
