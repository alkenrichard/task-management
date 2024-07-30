import { StyleSheet } from "react-native";
import Color from "../../../utils/Color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  mainContainer: {
    backgroundColor: Color.Primary,
    paddingBottom: "10%",
  },
  shimmerHeader: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
  shimmerWrap: {
    width: "100%",
    height: 150,
    marginBottom: 20,
  },
  shimmerContent: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
});

export default styles;