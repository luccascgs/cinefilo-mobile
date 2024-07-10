import GeneralScreen from "../screens/GeneralScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";
import AdminScreen from "../screens/AdminScreen";

const Stack = createStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="admin"
        component={AdminScreen}
        tab
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
      <Stack.Screen
        name="general"
        component={GeneralScreen}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
    </Stack.Navigator>
  );
}
