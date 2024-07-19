import GeneralScreen from "../screens/GeneralScreen";
import GenresScreen from "../screens/GenresScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";

const Stack = createStackNavigator();

export default function GenresNavigator({ route }) {
  const { id_user } = route.params;
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
        options={{
          title: false,
          headerTransparent: true,
          headerTintColor: colors.white,
        }}
        initialParams={{ id_user: id_user, generalStreak: 0 }}
      />
    </Stack.Navigator>
  );
}
