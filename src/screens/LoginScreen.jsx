import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { colors } from "../config/variables";
import { api } from "../config/api";

export default function LoginScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = useCallback(async () => {
    if (validateEmail(name)) {
      try {
        const loginCredencials = { email: name, password: password };
        const response = await api.post("/sign-in", loginCredencials);
        setError(null);
        const user = JSON.parse(response.request._response);
        const uid = user.response.user.uid;
        navigation.navigate("homeStack", {
          screen: "profileStack",
          params: { id_user: uid },
        });
      } catch (err) {
        setError(err.response.data.message);
      }
    } else {
      try {
        const loginCredencials = { username: name, password: password };
        const response = await api.post("/sign-in", loginCredencials);
        const user = JSON.parse(response.request._response);
        const uid = user.response.user.uid;
        navigation.navigate("homeStack", { id_user: uid });
      } catch (err) {
        setError(err.response.data.message);
      }
    }
  }, [name, password, error, setError]);

  return (
    <LinearGradient
      colors={[colors.blueBg, colors.darkBlueBg]}
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../assets/background-image.png")}
        resizeMode="repeat"
        className="flex-1 px-8 justify-center items-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16 self-center">
          CINÉFILO
        </Text>
        <View className="w-full items-center bg-slate-50 py-4 rounded-xl">
          <Text className="text-2xl mb-1 font-bold text-slate-600">Login</Text>
          <View className="w-5/6">
            <Text className="text-xs mb-1 text-slate-600">
              Usuário ou Email
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="w-full bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Digite seu usuário ou email"
            />
            <Text className="text-xs mb-1 text-slate-600">Senha</Text>
            <View className="flex-row items-center w-full justify-between bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl px-4 py-1">
              <TextInput
                className="w-11/12"
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha"
                secureTextEntry={!visible}
              />
              <Feather
                color={colors.black}
                size={24}
                onPress={() => setVisible(!visible)}
                name={visible ? "eye" : "eye-off"}
              />
            </View>
            {error && <Text className="text-red-600">{error}</Text>}
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full justify-center mt-2 bg-sky-50 mb-4 border-2 border-sky-600 rounded-xl h-10"
            >
              <Text className="self-center text-sky-600">Fazer Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("register")}
              className="w-full justify-center bg-sky-600 mb-2 border-sky-50 rounded-xl h-10"
            >
              <Text className="self-center text-sky-50">Fazer Registro</Text>
            </TouchableOpacity>
            <Pressable
              onPress={() => navigation.navigate("email")}
              className="self-center"
            >
              <Text>Esqueci minha senha</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
