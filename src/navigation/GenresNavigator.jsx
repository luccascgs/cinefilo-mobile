import { NavigationContainer } from "@react-navigation/native";
import GeneralScreen from "../screens/GeneralScreen";
import { createStackNavigator } from "@react-navigation/stack";
import GenresScreen from "../screens/GenresScreen";
import { colors } from "../config/variables";

const Stack = createStackNavigator();

export default function GenresNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="genres"
        component={GenresScreen}
        tab
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="general"
        component={GeneralScreen}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
    </Stack.Navigator>
  );
}
