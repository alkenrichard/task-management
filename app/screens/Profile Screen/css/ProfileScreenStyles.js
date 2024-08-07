import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";
import Font from "../../../utils/Font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
    padding: 20,
    backgroundColor: Color.White,
  },
  mainProfileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  subProfileContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    maxWidth: "65%",
  },
  name: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
  },
  gmail: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 13,
  },
  noHP: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 15,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Color.Black,
  },
  mainListContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    gap: 30,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  text: {
    fontFamily: Font["Poppins-Medium"],
    fontSize: 18,
  },
});
export default styles;
