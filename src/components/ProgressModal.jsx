import { Modal, Pressable, Share, Text, View } from "react-native";
import { X } from "react-native-feather";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";
import { useCallback, useEffect } from "react";

export default function ProgressModal({
  modalVisible,
  setModalVisible,
  currentMovie,
  genre,
  streak,
}) {
  const [isLoading, setIsloading] = useState(true);
  const [players, setPlayers] = useState([]);

  const loadScoreboard = useCallback(async () => {
    const response = await api.get(`/stats/scoreboard/${genre}`);
    setPlayers(response.data);
    setIsloading(false);
  }, []);

  const onShare = async () => {
    try {
      await Share.share({
        message: `Joguei cinefi.lol ${mode} ${currentMovie.emojis[0]} | consegui ${streak} acertos em série! 🔥 `,
      });
    } catch (error) {}
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
        <View className="w-full relative py-6 items-center bg-slate-50 rounded-xl border-2 boreder-slate-600">
          <Text className="text-2xl font-bold text-slate-600">Progresso</Text>
          <X
            color={colors.black}
            className="absolute top-2 right-2"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Text className="text-lg font-bold text-slate-600 mb-4">
            Resposta: {currentMovie.name}
          </Text>
          {isLoading ? (
            <View>
              <ActivityIndicator size={"large"} color={colors.black} />
            </View>
          ) : (
            <View className="">
              <ScrollView>
                {players?.map((players, index) => (
                  <View key={index}></View>
                ))}
              </ScrollView>
            </View>
          )}
          <View className="flex-row w-full justify-around mt-5">
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
