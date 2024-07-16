import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, ScrollView, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import UsernameModal from "../components/UsernameModal";
import { api } from "../config/api";
import { cards } from "../config/genres";

export default function ProfileScreen({ route, navigation }) {
  const { id_user } = route.params ?? {};
  const [user, setUser] = useState([]);
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

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

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
          <Text>Carregando</Text>
        ) : (
          <>
            <View className="items-end">
              <Image
                className="w-48 h-48 border-2 rounded-full translate-y-12"
                source={require("../../assets/gilgoiaba.jpg")}
              />
              <Pressable
                style={{ borderColor: colors.blueBg }}
                className="p-2 border-4 rounded-full bg-slate-50"
              >
                <Feather name="edit" size={28} />
              </Pressable>
            </View>
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
                    style={{ backgroundColor: colors.blueBg }}
                    className="px-4 items-center justify-center rounded-xl"
                  >
                    <Text className="text-slate-50 text-xl font-bold">
                      Diário
                    </Text>
                    <Text className="text-slate-50 text-2xl font-bold">
                      {stats.daily}
                    </Text>
                    <Text className="text-slate-50 text-xl font-bold">
                      pontos
                    </Text>
                  </View>
                  {cards.map((card, index) => (
                    <View
                      key={index}
                      style={{ backgroundColor: card.color1 }}
                      className="px-4 items-center justify-center rounded-xl"
                    >
                      <Text className="text-center leading-none text-slate-50 text-xl font-bold">
                        {card.title}
                      </Text>
                      <Text className="text-slate-50 text-2xl font-bold">
                        {stats[card.img]}
                      </Text>
                      <Text className="text-slate-50 text-xl font-bold">
                        seguidos
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
            <Pressable
              onPress={() => navigation.navigate("changePassword")}
              className="w-full flex-row items-center justify-center bg-sky-50 mt-2 border-2 border-sky-600 rounded-xl h-10"
            >
              <Feather name="lock" color={colors.blue} />
              <Text className="self-center text-sky-600 pl-2">Mudar Senha</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("login")}
              className="w-full flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
            >
              <Feather name="log-out" color={colors.red} />
              <Text className="self-center text-red-600 pl-2">Sair</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("adminStack")}
              className="w-full flex-row items-center justify-center bg-emerald-50 mt-2 border-2 border-emerald-600 rounded-xl h-10"
            >
              <Feather name="database" color={colors.green} />
              <Text className="self-center text-emerald-600 pl-2">Admin</Text>
            </Pressable>
          </>
        )}
      </ImageBackground>
    </LinearGradient>
  );
}
