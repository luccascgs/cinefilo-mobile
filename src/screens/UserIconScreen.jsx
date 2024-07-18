import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import { api } from "../config/api";

import { Image as ImageExpo } from "expo-image";

export default function UserIconScreen({ route, navigation }) {
  const { id_user, background, head } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundsList, setBackgroundsList] = useState([]);
  const [headsList, setHeadsList] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(background);
  const [selectedHead, setSelectedHead] = useState(head);

  const loadImages = useCallback(async () => {
    const backgroundResponse = await api.get("/icons/background");
    const headResponse = await api.get("/icons/head");
    setBackgroundsList(backgroundResponse.data);
    setHeadsList(headResponse.data);
    setIsLoading(false);
  }, []);

  const handleSelectBackground = (bg) => {
    setSelectedBackground(bg);
  };

  useEffect(() => {
    loadImages();
  }, []);

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
        <View className="items-end">
          <View className="w-48 h-48 rounded-full border-4 border-slate-50">
            <Image
              fadeDuration={0}
              className="w-full h-full absolute border-2 rounded-full"
              source={{
                uri: selectedBackground,
              }}
            />
            <Image
              fadeDuration={0}
              className="w-full h-full absolute border-2 rounded-full"
              source={require("../../assets/base.png")}
            />
            <Image
              fadeDuration={0}
              className="w-full h-full absolute border-2 rounded-full"
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/cinefilo-b25a5.appspot.com/o/head%2F${selectedHead}.png?alt=media&token=6125114d-847d-4029-b46d-ff0a5830921e`,
              }}
            />
          </View>
        </View>
        <View className="w-full items-center bg-slate-50 mt-2 border-2 border-slate-600 rounded-xl p-6">
          <Text className="text-slate-600 self-start font-bold text-lg">
            Plano de fundo
          </Text>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <View className="h-24 my-2 w-full">
              <ScrollView className="flex-row gap-2" horizontal={true}>
                {backgroundsList?.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleSelectBackground(item.uri)}
                    activeOpacity={0.6}
                    className="w-24 h-24 border-4 rounded-xl"
                    style={{
                      borderColor:
                        selectedBackground === item.uri
                          ? colors.green
                          : colors.white,
                    }}
                  >
                    <ImageExpo
                      className="w-full h-full rounded-lg"
                      source={item.uri}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          )}

          <Text className="text-slate-600 self-start font-bold text-lg">
            Acessório da cabeça
          </Text>
          <View className="w-full flex-row justify-between">
            <Pressable
              style={{ width: "49%" }}
              onPress={() => navigation.goBack()}
              className="flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
            >
              <Feather name="arrow-left" color={colors.red} />
              <Text className="self-center text-red-600 pl-2">Descartar</Text>
            </Pressable>
            <Pressable
              style={{ width: "49%" }}
              onPress={() => navigation.goBack()}
              className="flex-row items-center justify-center bg-emerald-50 mt-2 border-2 border-emerald-600 rounded-xl h-10"
            >
              <Feather name="check" color={colors.green} />
              <Text className="self-center text-emerald-600 pl-2">Salvar</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
