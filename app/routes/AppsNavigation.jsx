import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppsScreen from "../screens/Apps Screen/AppsScreen";
import { createStackNavigator } from "@react-navigation/stack";

import Color from "../utils/Color";
import Font from "../utils/Font";
import { useNavigation } from "@react-navigation/native";
import ServiceDetail from "../screens/Service Detail/ServiceDetail";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createStackNavigator();

const AppsNavigation = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="apps"
        component={AppsScreen}
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
                  if (params.id >= 5 && params.id <= 11) {
                    navigation.navigate("apps");
                  }
                } else {
                  navigation.goBack();
                }
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppsNavigation;

const styles = StyleSheet.create({});
