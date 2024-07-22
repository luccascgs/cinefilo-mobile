import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";
import GenresNavigator from "./GenresNavigator";
import ProfileNavigator from "./ProfileStack";
import DailyScreen from "../screens/DailyScreen";

const Botton = createBottomTabNavigator();

export default function HomeNavigator({ route }) {
  const { id_user } = route.params;
  return (
    <Botton.Navigator
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
      initialParams={{ id_user: id_user }}
    >
      <Botton.Screen
        name="daily"
        component={DailyScreen}
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
        initialParams={{ id_user: id_user }}
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
        initialParams={{ id_user: id_user }}
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
        initialParams={{ id_user: id_user }}
      />
    </Botton.Navigator>
  );
}
