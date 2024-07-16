import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Share,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { X } from "react-native-feather";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";
import { api } from "../config/api";

export default function ProgressModal({
  modalVisible,
  setModalVisible,
  currentMovie,
  mode,
  genre,
  streak,
}) {
  const [isLoading, setIsloading] = useState(true);
  const [playersStats, setPlayersStats] = useState([]);

  const loadPlayer = useCallback(async (id_user) => {
    const response = await api.get(`/users/${id_user}`);
    return response.data?.username;
  }, []);

  const loadScoreboard = useCallback(async () => {
    try {
      const response = await api.get(`/stats/scoreboard/${genre}`);
      if (response.data) {
        const statsWithUser = await Promise.all(
          response.data.map(async (stats, index) => ({
            id: index,
            score: stats[genre],
            username: await loadPlayer(stats.id_user),
          }))
        );
        setPlayersStats(statsWithUser);
      }
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Joguei cinefi.lol ${mode} ${currentMovie.emojis[0]} | consegui ${streak} acertos em série! 🔥 `,
      });
    } catch (error) {}
  };

  const handleLeaderColor = (index) => {
    if (index === 0) return "yellow";
    if (index === 1) return "zinc";
    if (index === 2) return "orange";
  };

  useEffect(() => {
    loadScoreboard();
  }, [loadScoreboard]);

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        className="flex-1 justify-center items-center p-8"
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View className="w-full relative p-6 items-center bg-slate-50 rounded-xl border-2 boreder-slate-600">
          <X
            color={colors.black}
            className="absolute top-2 right-2"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Text className="text-2xl font-bold text-slate-600 mb-1">
            Tabela semanal: {mode}
          </Text>
          {isLoading ? (
            <View>
              <ActivityIndicator size={"large"} color={colors.black} />
            </View>
          ) : (
            <View className="w-full h-80 items-center">
              <ScrollView>
                {playersStats?.map((player, index) => (
                  <View
                    style={[
                      styles[`bg${handleLeaderColor(index)}`],
                      styles[`border${handleLeaderColor(index)}`],
                    ]}
                    key={index}
                    className="w-full p-2 flex-row items-center justify-between border-2 border-slate-600 mb-1 rounded-xl"
                  >
                    <View className="flex-row items-center">
                      <View
                        style={styles[`border${handleLeaderColor(index)}`]}
                        className="h-12 w-12 rounded-full border-2 border-slate-600"
                      >
                        <Image
                          className="w-full h-full rounded-full"
                          source={require("../../assets/gilgoiaba.jpg")}
                        />
                      </View>
                      <Text
                        style={styles[`border${handleLeaderColor(index)}`]}
                        className="mx-2 text-xl font-black text-slate-600"
                      >
                        #{index + 1}
                      </Text>
                      <Text
                        style={styles[`border${handleLeaderColor(index)}`]}
                        className="text-lg font-bold text-slate-600"
                      >
                        {player.username}
                      </Text>
                    </View>
                    <Text
                      style={styles[`border${handleLeaderColor(index)}`]}
                      className="text-lg text-slate-600"
                    >
                      {player.score} pontos
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <Text className="text-lg font-bold text-slate-600 mt-2">
            Resposta: {currentMovie.name}
          </Text>
          <View className="flex-row w-full justify-between mt-5">
            <Pressable className="flex-row items-center p-1 bg-emerald-50 border-2 border-emerald-600 rounded-xl">
              <Text className="text-emerald-600 pr-2 text-lg">Reiniciar</Text>
              <Feather color={colors.green} size={18} name="rotate-ccw" />
            </Pressable>
            <Pressable
              onPress={onShare}
              className="flex-row items-center p-1 bg-sky-50 border-2 border-sky-600 rounded-xl"
            >
              <Text className="text-sky-600 pr-2 text-lg">Compartilhar</Text>
              <Feather color={colors.blue} size={18} name="share-2" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bgyellow: {
    backgroundColor: "#fef9c3",
  },
  bgzinc: {
    backgroundColor: "#e4e4e7",
  },
  bgorange: {
    backgroundColor: "#ffedd5",
  },
  borderyellow: {
    borderColor: "#854d0e",
    color: "#854d0e",
  },
  borderzinc: {
    borderColor: "#27272a",
    color: "#27272a",
  },
  borderorange: {
    borderColor: "#9a3412",
    color: "#9a3412",
  },
});
