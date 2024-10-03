import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Auth Screen/pages/LoginScreen";
import TabNavigation from "./TabNavigation";
import LoginModal from "../screens/Auth Screen/pages/LoginModal";

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="Login Modal"
        component={LoginModal}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen name="Home" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
