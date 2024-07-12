import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../config/variables";

export default function EmailScreen({ navigation }) {
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
            Mudar Email
          </Text>
          <View className="w-5/6">
            <Text className="text-xs mb-1 text-slate-600">Email antigo</Text>
            <TextInput
              value={"luccascorreia@hotmail.com"}
              className="w-full text-slate-400 bg-slate-50 mb-2 border-2 border-slate-600 rounded-xl pl-4 py-1"
              editable={false}
            />
            <Text className="text-xs mb-1 text-slate-600">Nova email</Text>
            <TextInput
              className="w-full bg-slate-50 mb-4 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Digite seu novo email"
            />
            <Text className="text-xs mb-1 text-slate-600">Repetir email</Text>
            <TextInput
              className="w-full bg-slate-50 mb-4 border-2 border-slate-600 rounded-xl pl-4 py-1"
              placeholder="Repita seu novo email"
            />
            <Pressable
              onPress={() => navigation.navigate("adminStack")}
              className="w-full justify-center bg-sky-50 mb-4 border-2 border-sky-600 rounded-xl h-10"
            >
              <Text className="self-center text-sky-600">Mudar email</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
