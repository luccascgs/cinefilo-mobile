import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { colors } from "../config/variables";
import { api } from "../config/api";

export default function EmailScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [log, setLog] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = useCallback(async () => {
    if (!email) {
      return setError("Preencha todos os campos");
    }
    if (validateEmail(email)) {
      try {
        const result = await api.put("/users/recover", { email });
        setLog(result.data.message);
      } catch (err) {
        setLog(err.response.data.message);
      }
    } else {
      setLog("Digite um email válido");
    }
  }, [email, log, setLog]);

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
          <Text className="text-2xl mb-1 font-bold text-slate-600">
            Recuperar Senha
          </Text>
          <View className="w-5/6">
            <Text className="text-xs mb-1 text-slate-600">Email</Text>
            <TextInput
              className="w-full bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Digite email"
              value={email}
              onChangeText={setEmail}
            />
            {log && <Text className="mb-2 text-slate-600">{log}</Text>}
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full justify-center bg-sky-50 border-2 border-sky-600 rounded-xl h-10"
            >
              <Text className="self-center text-sky-600">Enviar email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
