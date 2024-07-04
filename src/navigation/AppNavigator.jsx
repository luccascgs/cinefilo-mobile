import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calendar } from "react-native-feather";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";
import HomeScreen from "../screens/HomeScreen";
import GenresScreen from "../screens/GenresScreen";
import { View } from "react-native";

const Botton = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Botton.Navigator
        initialRouteName="Main"
        screenOptions={() => ({
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
              <View
                style={{
                  backgroundColor: focused ? colors.lightBlue : "",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Feather
                  name="calendar"
                  size={30}
                  style={{ color: focused ? colors.blue : colors.black }}
                />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Botton.Screen
          name="genres"
          component={GenresScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  backgroundColor: focused ? colors.lightBlue : "",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <Feather
                  name="tag"
                  size={30}
                  style={{ color: focused ? colors.blue : colors.black }}
                />
              </View>
            ),
            headerShown: false,
          }}
        />
      </Botton.Navigator>
    </NavigationContainer>
  );
}
