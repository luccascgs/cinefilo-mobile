import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";
import AdminNavigator from "./AdminNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import PasswordScreen from "../screens/PasswordScreen";
import UserIconScreen from "../screens/UserIconScreen";

const Stack = createStackNavigator();

export default function ProfileNavigator({ route }) {
  const { id_user } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        tab
        options={{
          headerShown: false,
        }}
        initialParams={{ id_user: id_user }}
      />
      <Stack.Screen
        name="userIcon"
        component={UserIconScreen}
        options={{
          title: false,
          headerTransparent: true,
          headerTintColor: colors.white,
        }}
        initialParams={{ id_user: id_user }}
      />
      <Stack.Screen
        name="changePassword"
        component={PasswordScreen}
        options={{
          title: false,
          headerTransparent: true,
          headerTintColor: colors.white,
        }}
      />
      <Stack.Screen
        name="adminStack"
        component={AdminNavigator}
        options={{
          title: false,
          headerTransparent: true,
          headerTintColor: colors.white,
        }}
      />
    </Stack.Navigator>
  );
}
