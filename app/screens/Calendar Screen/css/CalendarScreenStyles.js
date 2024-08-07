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
    borderWidth: 2,
    borderColor: Color.Primary,
  },
  dateContainer: {
    marginTop: 20,
  },
  dateText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Color.Primary,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
  },
  card: {
    backgroundColor: Color.White,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    borderWidth: 2,
    borderColor: Color.Primary,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  timeline: {
    alignItems: "center",
    marginRight: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.Primary,
    marginVertical: 12,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: Color.GreyText,
  },
  eventContent: {
    flex: 1,
    flexDirection: "column",
  },
  eventDetail: {
    flexDirection: "row",
    marginVertical: 2,
  },
  cardTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
  },
  cardText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginLeft: 5,
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
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: Color.GreyText,
  },
});

export default styles;
