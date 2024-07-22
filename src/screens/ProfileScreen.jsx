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
import dayjs from "dayjs";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import UsernameModal from "../components/UsernameModal";
import { api } from "../config/api";
import { cards } from "../config/genres";
import { useFocusEffect } from "@react-navigation/native";
import { Skeleton } from "moti/skeleton";

export default function ProfileScreen({ route, navigation }) {
  const { id_user } = route.params ?? {};
  const [user, setUser] = useState({});
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const loadProfile = useCallback(async () => {
    const userResponse = await api.get(`/users/${id_user}`);
    const statsResponse = await api.get(`/stats/${id_user}`);
    setUser(userResponse.data);
    setStats(statsResponse.data);
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );
  return (
    <LinearGradient
      colors={[colors.blueBg, colors.darkBlueBg]}
      style={{
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      {modalVisible && (
        <View className="flex-1 z-10 absolute w-full h-full bg-black/75" />
      )}
      <ImageBackground
        source={require("../../assets/background-image.png")}
        resizeMode="repeat"
        className="flex-1 px-8 justify-center items-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16 self-center">
          CINÉFILO
        </Text>
        <UsernameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          id={id_user}
        />
        {isLoading ? (
          <>
            <View className="items-end">
              <View className="w-48 h-48 translate-y-12 rounded-full">
                <Skeleton
                  colorMode="light"
                  show={true}
                  radius="round"
                  height={192}
                  width={192}
                />
              </View>
              <View
                style={{ borderColor: colors.blueBg }}
                className="p-2 border-4 rounded-full bg-slate-50"
              >
                <Feather name="edit" size={28} />
              </View>
            </View>
          </>
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("userIcon")}
            className="items-end"
          >
            <View className="w-48 h-48 translate-y-12 rounded-full border-4 border-slate-50">
              <Image
                fadeDuration={0}
                className="w-full h-full absolute border-2 rounded-full"
                source={{
                  uri: user.background,
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
                  uri: user.head,
                }}
              />
            </View>
            <View
              style={{ borderColor: colors.blueBg }}
              className="p-2 border-4 rounded-full bg-slate-50"
            >
              <Feather name="edit" size={28} />
            </View>
          </TouchableOpacity>
        )}
        <View className="w-full items-center bg-slate-50 mt-2 border-2 border-slate-600 rounded-xl p-6">
          <View className="flex-row items-center">
            <Text className="text-slate-600 text-2xl font-semibold pr-2">
              {user.username}
            </Text>
            <Feather
              onPress={() => setModalVisible(true)}
              color={colors.black}
              name="edit"
              size={24}
            />
          </View>
          <Text className="mt-2 text-slate-400">
            Conta criada em {dayjs(user.date).format("DD/MM/YYYY")}
          </Text>
          <Text className="mt-2 text-slate-600 font-medium text-lg self-start">
            Estatísticas semanais
          </Text>
          <View className="w-full mt-1">
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                flexDirection: "row",
                gap: 10,
                height: 120,
              }}
            >
              <View
                style={{
                  borderColor: colors.blueBg,
                  backgroundColor: "#e6f3fe",
                }}
                className="px-4 border-2 items-center w-32 justify-center rounded-xl"
              >
                <Text
                  style={{
                    color: colors.blueBg,
                  }}
                  className="text-xl font-bold"
                >
                  Diário
                </Text>
                <Text
                  style={{
                    color: colors.blueBg,
                  }}
                  className="text-2xl font-bold"
                >
                  {stats.daily}
                </Text>
                <Text
                  style={{
                    color: colors.blueBg,
                  }}
                  className="text-xl font-bold"
                >
                  pontos
                </Text>
              </View>

              {cards.map((card, index) => (
                <View
                  key={index}
                  style={{
                    borderColor: card.color1,
                    backgroundColor: card.color3,
                  }}
                  className="px-4 border-2 items-center w-32 justify-center rounded-xl"
                >
                  <Text
                    style={{
                      color: card.color1,
                    }}
                    className="text-center leading-none text-xl font-bold"
                  >
                    {card.title}
                  </Text>
                  <Text
                    style={{
                      color: card.color1,
                    }}
                    className="text-2xl font-bold"
                  >
                    {stats[card.img]}
                  </Text>
                  <Text
                    style={{
                      color: card.color1,
                    }}
                    className="text-xl font-bold"
                  >
                    seguidos
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("login")}
          className="w-full flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
        >
          <Feather name="log-out" color={colors.red} />
          <Text className="self-center text-red-600 pl-2">Sair</Text>
        </Pressable>
        {id_user === "0uUiDvvDo1aBm4W2VitAa6X8F393" && (
          <Pressable
            onPress={() => navigation.navigate("adminStack")}
            className="w-full flex-row items-center justify-center bg-emerald-50 mt-2 border-2 border-emerald-600 rounded-xl h-10"
          >
            <Feather name="database" color={colors.green} />
            <Text className="self-center text-emerald-600 pl-2">Admin</Text>
          </Pressable>
        )}
      </ImageBackground>
    </LinearGradient>
  );
}
