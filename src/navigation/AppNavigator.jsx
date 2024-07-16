import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { colors } from "../config/variables";
import HomeNavigator from "./HomeNavigator";
import LoginScreen from "../screens/LoginScreen";
import EmailScreen from "../screens/EmailScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

export default function GenresNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={LoginScreen}
          tab
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={RegisterScreen}
          tab
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="email"
          component={EmailScreen}
          options={{
            title: false,
            headerTransparent: true,
            headerTintColor: colors.white,
          }}
        />
        <Stack.Screen
          name="homeStack"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
