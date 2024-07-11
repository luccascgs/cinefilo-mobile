import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../config/variables";
import AdminScreen from "../screens/AdminScreen";
import FormScreen from "../screens/FormScreen";

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
        name="form"
        component={FormScreen}
        options={{title: "Criação de filme", headerTransparent: true, headerTintColor: colors.white }}
        initialParams={{ id: null }}
      />
    </Stack.Navigator>
  );
}
