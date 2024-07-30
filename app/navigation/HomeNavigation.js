import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../screens/Home Screen/pages/HomeScreen";
import ServiceDetail from "../screens/Service Detail/ServiceDetail";
import CardDetail from "../screens/Home Screen/pages/CardDetail";

import Color from "../utils/Color";
import Font from "../utils/Font";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => {
                const { params } = route;
                if (params && params.id) {
                  if (params.id >= 1 && params.id <= 4) {
                    navigation.navigate("home");
                  }
                } else {
                  navigation.goBack();
                }
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CardDetail"
        component={CardDetail}
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerStyle: { backgroundColor: Color.Primary, height: 60 },
          headerTitleStyle: {
            fontFamily: Font["Poppins-Bold"],
          },
          headerTintColor: Color.White,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Color.White}
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("home")}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
