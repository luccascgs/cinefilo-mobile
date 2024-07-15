import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, TextInput, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import UsernameModal from "../components/UsernameModal";
import { api } from "../config/api";

export default function ProfileScreen({ route, navigation }) {
  const [user, setUser] = useState([]);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const loadProfile = useCallback(async () => {
    const userResponse = await api.get(`/users/aSIFn2mAcHgbBNCsz6IVcmfF6Xz1`);
    const statsResponse = await api.get(`/stats/aSIFn2mAcHgbBNCsz6IVcmfF6Xz1`);
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
          usernameProp={user.username}
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
                Conta criada em {user.date}
              </Text>
              <View className="mt-4 w-full">
                <Text className="text-lg justify-self-start">Estatísticas</Text>
                <Text>Diário: {stats.daily} pontos</Text>
                <Text>Geral: {stats.genreal} pontos</Text>
                <Text>Terror: {stats.horror} pontos</Text>
                <Text>Comédia: {stats.comedy} pontos</Text>
                <Text>Ficção: {stats.scifi} pontos</Text>
                <Text>Animação: {stats.cartoon} pontos</Text>
                <Text>Séries: {stats.series} pontos</Text>
                <Text>Drama: {stats.drama} pontos</Text>
                <Text>Adam: {stats.adam} pontos</Text>
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
              onPress={() => console.log("Saiu")}
              className="w-full flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
            >
              <Feather name="log-out" color={colors.red} />
              <Text className="self-center text-red-600 pl-2">Sair</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("admin")}
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
