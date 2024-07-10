import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../config/variables";

export default function LoginScreen({ navigation }) {
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
              className="w-full bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Digite seu usuário ou email"
            />
            <Text className="text-xs mb-1 text-slate-600">Senha</Text>
            <TextInput
              className="w-full bg-slate-50 mb-4 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Digite sua senha"
              secureTextEntry
            />
            <Pressable onPress={()=>navigation.navigate("adminStack")} className="w-full justify-center bg-sky-50 mb-4 border-2 border-sky-600 rounded-xl h-10">
              <Text className="self-center text-sky-600">Fazer Login</Text>
            </Pressable>
            <Pressable className="w-full justify-center bg-sky-600 mb-2 border-sky-50 rounded-xl h-10">
              <Text className="self-center text-sky-50">Fazer Registro</Text>
            </Pressable>
          </View>
        </View>
        <Image
          source={{ uri: "https://pbs.twimg.com/media/F1w71cMXsAEV6iy.jpg" }}
        />
      </ImageBackground>
    </LinearGradient>
  );
}
