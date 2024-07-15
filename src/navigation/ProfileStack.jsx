import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";
import AdminNavigator from "./AdminNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import PasswordScreen from "../screens/PasswordScreen";
import EmaillScreen from "../screens/EmailScreen";

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
        initialParams={{ id: "vHQqfGHYFIUhzwdtpJKWoxqxGQs1" }}
      />
      <Stack.Screen
        name="changePassword"
        component={PasswordScreen}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
      <Stack.Screen
        name="changeEmail"
        component={EmaillScreen}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
      <Stack.Screen
        name="adminStack"
        component={AdminNavigator}
        options={{title: false, headerTransparent: true, headerTintColor: colors.white }}
      />
    </Stack.Navigator>
  );
}
