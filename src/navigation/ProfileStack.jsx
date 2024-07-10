import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";
import AdminNavigator from "./AdminNavigator";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        tab
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="adminStack"
        component={AdminNavigator}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
    </Stack.Navigator>
  );
}
