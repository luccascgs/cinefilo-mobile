import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Calendar } from "react-native-feather";
import { View } from "react-native";
import { colors } from "../config/variables";
import HomeScreen from "../screens/HomeScreen";
import GenresScreen from "../screens/GenresScreen";
import GeneralScreen from "../screens/GeneralScreen";

const Botton = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Botton.Navigator
        initialRouteName="Main"
        screenOptions={() => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderRadius: 20,
            backgroundColor: "white",
            position: "absolute",
            left: 25,
            right: 25,
            bottom: 20,
            height: 75,
          },
        })}
      >
        <Botton.Screen
          name="daily"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="calendar"
                size={30}
                style={{ color: focused ? colors.blue : colors.black }}
              />
            ),
            headerShown: false,
          }}
        />
        <Botton.Screen
          name="genres"
          component={GenresScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="tag"
                size={30}
                style={{ color: focused ? colors.blue : colors.black }}
              />
            ),
            headerShown: false,
          }}
        />
        <Botton.Screen
          name="general"
          component={GeneralScreen}
          tab
          options={{
            headerShown: false,
          }}
        />
      </Botton.Navigator>
        
    </NavigationContainer>
  );
}
