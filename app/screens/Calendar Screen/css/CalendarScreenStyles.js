import { StyleSheet } from "react-native";
import Font from "../../../utils/Font";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.White,
  },
  title: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
  },
  calendar: {
    borderRadius: 12,
    elevation: 2,
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    marginBottom: 10,
    elevation: 2,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  cardTitle: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 18,
  },
  cardText: {
    fontFamily: Font["Poppins-Regular"],
    fontSize: 14,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: Color.GreyText,
    marginVertical: 20,
  },
  noScheduleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  imageNoSchedule: {
    width: 200,
    height: 200,
  },
  textNoSchedule: {
    fontFamily: Font["Poppins-Bold"],
    fontSize: 20,
    color: Color.GreyText,
  },
});

export default styles;
