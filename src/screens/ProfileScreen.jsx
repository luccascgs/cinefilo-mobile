import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/variables";

export default function ProfileScreen() {
  const [username, setUsername] = useState("");

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
        <Image className="w-full " source={require("../../assets/gilgoiaba.jpg")} />
        <View className="w-full flex-row justify-between items-center bg-slate-50 px-4 mt-2 border-2 border-slate-600 rounded-xl h-12">
          <TextInput
            className="w-11/12 text-slate-600"
            value={username}
            onChangeText={setUsername}
            placeholder="Digite um nome de usuário"
          />
          <View className="w-1/12">
            <Feather name="edit-2" size={24} />
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
