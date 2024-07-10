import { StatusBar, StyleSheet, View } from "react-native";
import Config_Fonts from "./app/configs/Config_Fonts";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./app/navigation/MainNavigation";
import "react-native-gesture-handler";
import Color from "./app/utils/Color";


export default function App() {
  const [fontsLoaded] = useFonts(Config_Fonts);

  return !fontsLoaded ? null : (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
});