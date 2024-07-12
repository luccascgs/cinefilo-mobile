import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../config/variables";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

export default function PasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeadPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleNew, setVisibleNew] = useState(false);

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
            Mudar Senha
          </Text>
          <View className="w-5/6">
            <Text className="text-xs mb-1 text-slate-600">Senha antiga</Text>
            <View className="flex-row items-center w-full justify-between bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl px-4 py-1">
              <TextInput
                className="w-11/12"
                value={password}
                onChangeText={setPassword}
                placeholder="Digite sua senha antiga"
                secureTextEntry={!visible}
              />
              <Feather
                color={colors.black}
                size={24}
                onPress={() => setVisible(!visible)}
                name={visible ? "eye" : "eye-off"}
              />
            </View>
            <Text className="text-xs mb-1 text-slate-600">Nova senha</Text>
            <View className="flex-row items-center w-full justify-between bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl px-4 py-1">
              <TextInput
                className="w-11/12"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Digite sua nova senha"
                secureTextEntry={!visibleNew}
              />
              <Feather
                color={colors.black}
                size={24}
                onPress={() => setVisibleNew(!visibleNew)}
                name={visibleNew ? "eye" : "eye-off"}
              />
            </View>
            <Text className="text-xs mb-1 text-slate-600">Repetir senha</Text>
            <View className="flex-row items-center w-full justify-between bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl px-4 py-1">
              <TextInput
                className="w-11/12"
                value={repeatPassword}
                onChangeText={setRepeadPassword}
                placeholder="Repita sua nova senha"
                secureTextEntry={!visibleNew}
              />
              <Feather
                color={colors.black}
                size={24}
                onPress={() => setVisibleNew(!visibleNew)}
                name={visibleNew ? "eye" : "eye-off"}
              />
            </View>
            <Pressable
              onPress={() => navigation.navigate("adminStack")}
              className="w-full justify-center bg-sky-50 mt-4 border-2 border-sky-600 rounded-xl h-10"
            >
              <Text className="self-center text-sky-600">Mudar senha</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
