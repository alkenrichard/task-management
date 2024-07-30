import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Auth Screen/pages/LoginScreen";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
