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
  resetGame,
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
    setIsloading(true);
    loadScoreboard();
  }, [loadScoreboard, modalVisible]);

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
          <Text className="text-lg font-bold text-slate-600 mt-1">
            Você conseguiu
            {` ${streak} ${genre === "daily" ? "ponto" : "seguida"}`}
            {`${streak === 1 ? "" : "s"}`}
          </Text>
          <Text className="text-lg font-medium text-slate-600 mb-2">
            Resposta: {currentMovie.name}
          </Text>
          <Text className="text-xl font-bold text-slate-600 mb-1">
            Tabela semanal: {mode}
          </Text>
          {isLoading ? (
            <View className="h-64 justify-center">
              <ActivityIndicator size={"large"} color={colors.black} />
            </View>
          ) : (
            <View className="w-full h-64 items-center">
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
                        className="mx-1 text-xl font-black text-slate-600"
                      >
                        #{index + 1}
                      </Text>
                      <Text
                        style={styles[`border${handleLeaderColor(index)}`]}
                        className="text-lg font-medium text-slate-600"
                      >
                        {player.username}
                      </Text>
                    </View>
                    <Text
                      style={styles[`border${handleLeaderColor(index)}`]}
                      className="text-lg text-slate-600"
                    >
                      {`${player.score} ${
                        genre === "daily" ? "pontos" : "seguidas"
                      }`}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="flex-row w-full justify-between mt-5">
            {genre !== "daily" && (
              <Pressable
                onPress={resetGame}
                style={{ width: "49%" }}
                className="h-12 flex-row justify-center items-center bg-emerald-50 border-2 border-emerald-600 rounded-xl"
              >
                <Feather color={colors.green} size={18} name="rotate-ccw" />
                <Text className="text-emerald-600 pl-2 text-lg">Reiniciar</Text>
              </Pressable>
            )}
            <Pressable
              onPress={onShare}
              style={{ width: genre === "daily" ? "100%" : "49%" }}
              className="h-12 flex-row justify-center items-center bg-sky-50 border-2 border-sky-600 rounded-xl"
            >
              <Feather color={colors.blue} size={18} name="share-2" />
              <Text className="text-sky-600 pl-2 text-lg">Compartilhar</Text>
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
