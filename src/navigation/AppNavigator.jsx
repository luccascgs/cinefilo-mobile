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
import GenresNavigator from "./GenresNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import AdminNavigator from "./AdminNavigator";
import ProfileNavigator from "./ProfileStack";

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
          name="genresStack"
          component={GenresNavigator}
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
          name="profileStack"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={30}
                style={{ color: focused ? colors.blue : colors.black }}
              />
            ),
            headerShown: false,
          }}
        />
        <Botton.Screen
          name="adminStack"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="database"
                size={30}
                style={{ color: focused ? colors.blue : colors.black }}
              />
            ),
            headerShown: false,
          }}
        />
        <Botton.Screen
          name="login"
          component={LoginScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Feather
                name="log-in"
                size={30}
                style={{ color: focused ? colors.blue : colors.black }}
              />
            ),
            headerShown: false,
          }}
        />
      </Botton.Navigator>
    </NavigationContainer>
  );
}
