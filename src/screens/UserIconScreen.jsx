import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import { api } from "../config/api";
import { Skeleton } from "moti/skeleton";

export default function UserIconScreen({ route, navigation }) {
  const { id_user } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundsList, setBackgroundsList] = useState([]);
  const [headsList, setHeadsList] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState("");
  const [selectedHead, setSelectedHead] = useState("");

  const loadImages = useCallback(async () => {
    const userResponse = await api.get(`/users/${id_user}`);
    const backgroundResponse = await api.get("/icons/background");
    const headResponse = await api.get("/icons/head");
    setBackgroundsList(backgroundResponse.data);
    setHeadsList(headResponse.data);
    setSelectedBackground(userResponse.data?.background);
    setSelectedHead(userResponse.data?.head);
    setIsLoading(false);
  }, []);

  const handleSubmit = useCallback(async (background, head) => {
    try {
      const payload = {
        background,
        head,
      };
      await api.put(`users/icon/${id_user}`, payload);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

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

        {isLoading ? (
          <Skeleton
            colorMode="light"
            show={true}
            radius="round"
            height={192}
            width={192}
          />
        ) : (
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
                uri: selectedHead,
              }}
            />
          </View>
        )}
        <View className="w-full items-center bg-slate-50 mt-2 border-2 border-slate-600 rounded-xl p-6">
          <Text className="text-slate-600 self-start font-bold text-lg">
            Plano de fundo
          </Text>
          {isLoading ? (
            <View className="h-28 my-2 flex-row w-full overflow-hidden">
              {[...Array(3)].map((item, index) => (
                <View key={index} className="mr-4">
                  <Skeleton
                    colorMode="light"
                    show={true}
                    height={112}
                    width={112}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View className="h-28 my-2 w-full">
              <ScrollView className="flex-row" horizontal={true}>
                {backgroundsList?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedBackground(item.uri)}
                    activeOpacity={0.6}
                    className="w-28 h-28 mr-4 border-4 rounded-xl"
                    style={{
                      borderColor:
                        selectedBackground === item.uri
                          ? colors.green
                          : colors.white,
                    }}
                  >
                    <Image
                      className="w-full h-full rounded-lg"
                      source={{ uri: item.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <Text className="text-slate-600 self-start font-bold text-lg">
            Acessório da cabeça
          </Text>
          {isLoading ? (
            <View className="h-28 my-2 flex-row w-full overflow-hidden">
              {[...Array(3)].map((item, index) => (
                <View key={index} className="mr-4">
                  <Skeleton
                    colorMode="light"
                    show={true}
                    height={112}
                    width={112}
                  />
                </View>
              ))}
            </View>
          ) : (
            <View className="h-28 my-2 w-full">
              <ScrollView className="flex-row" horizontal={true}>
                <TouchableOpacity
                  onPress={() => setSelectedHead("default")}
                  activeOpacity={0.6}
                  className="w-28 h-28 mr-4 border-4 rounded-xl"
                  style={{
                    borderColor:
                      selectedHead === "default" ? colors.green : colors.gray,
                  }}
                ></TouchableOpacity>
                {headsList?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedHead(item.uri)}
                    activeOpacity={0.6}
                    className="w-28 h-28 mr-4 border-4 rounded-xl"
                    style={{
                      borderColor:
                        selectedHead === item.uri ? colors.green : colors.gray,
                    }}
                  >
                    <Image
                      className="w-full h-full rounded-lg"
                      source={{ uri: item.uri }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="w-full flex-row justify-between">
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ width: "49%" }}
              onPress={() => navigation.goBack()}
              className="flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
            >
              <Feather name="arrow-left" color={colors.red} />
              <Text className="self-center text-red-600 pl-2">Descartar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ width: "49%" }}
              onPress={() => handleSubmit(selectedBackground, selectedHead)}
              className="flex-row items-center justify-center bg-emerald-50 mt-2 border-2 border-emerald-600 rounded-xl h-10"
            >
              <Feather name="check" color={colors.green} />
              <Text className="self-center text-emerald-600 pl-2">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}
