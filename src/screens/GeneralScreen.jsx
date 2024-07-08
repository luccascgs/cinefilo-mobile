import React, { useCallback, useEffect, useState } from "react";
import {
  AppRegistry,
  Button,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import GameInput from "../components/GameInput";
import { api } from "../config/api";
import { checkMovie } from "../helpers/movieHelper";
import { loadAllEmojis } from "../helpers/emojiHelper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";
import { Feather } from "@expo/vector-icons";
import { X } from "react-native-feather";

AppRegistry.registerComponent("main", () => HomeScreen);

export default function GeneralScreen() {
  const [currentMovie, setCurrentMovie] = useState({
    id: "69b88f4a-72b0-457f-9997-2d1efe1abae3",
    genre: 6,
    emojis: ["🚢", "🌊", "🚪", "💔", "🎻"],
    acceptableNames: ["titanic", "thetitanic", "otitanic"],
    name: "Titanic",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [guessType, setGuessType] = useState(Array(5).fill(2));
  const [modalVisible, setModalVisible] = useState(false);
  const [over, setOver] = useState(false);

  // const loadCurrentMovie = useCallback(async () => {
  //   setIsLoading(true);
  //   const response = await api.get("/movies/daily");
  //   console.log(response.data);
  //   setCurrentMovie(response.data);
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   loadCurrentMovie();
  // }, [loadCurrentMovie]);

  const handleSubmit = (value, index) => {
    if (value) {
      if (checkMovie(value, currentMovie)) {
        guessType[index] = 4;
        setCurrentGuess(5);
        loadAllEmojis(currentEmoji, setCurrentEmoji, setModalVisible);
        setTimeout(() => {
          setModalVisible(true);
          setOver(true);
        }, 1500);
        console.log("Acertou: " + currentMovie.name);
      } else {
        guessType[index] = 3;
        console.log("Errou");
        setCurrentGuess(currentGuess + 1);
        setCurrentEmoji(currentEmoji + 1);
      }
    }
  };

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
        className="flex-1 p-8 items-center justify-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-12">
          CINÉFILO
        </Text>
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            className="flex-1 z-20 justify-center items-center bg-black/75 p-8"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View className="w-full relative py-6 items-center bg-slate-50 rounded-xl border-2 boreder-slate-600">
              <Text className="text-2xl font-bold text-slate-600">
                Progresso
              </Text>
              <X
                color={colors.black}
                className="absolute top-2 right-2"
                onPress={() => setModalVisible(!modalVisible)}
              />
              <Text className="text-lg font-bold text-slate-600 mb-4">
                Resposta: {currentMovie.name}
              </Text>
              <Text className="text-2xl font-bold text-slate-600">
                Você conseguiu
              </Text>
              <Text className="text-2xl font-bold text-slate-600">10</Text>
              <Text className="text-2xl font-bold text-slate-600">
                Seguidas
              </Text>
              <View className="flex-row w-full justify-around mt-5">
                <Pressable className="flex-row items-center p-1 bg-emerald-50 border-2 border-emerald-600 rounded-xl">
                  <Text className="text-emerald-600 pr-2 text-lg">
                    Reiniciar
                  </Text>
                  <Feather color={colors.green} size={18} name="rotate-ccw" />
                </Pressable>
                <Pressable className="flex-row items-center p-1 bg-sky-50 border-2 border-sky-600 rounded-xl">
                  <Text className="text-sky-600 pr-2 text-lg">
                    Compartilhar
                  </Text>
                  <Feather color={colors.blue} size={18} name="share-2" />
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>

        {isLoading ? (
          <Text>Carregando...</Text>
        ) : (
          <>
            {over && (
              <Pressable
                className="flex-1 z-10 absolute w-full h-full"
                onPress={() => setModalVisible(!modalVisible)}
              />
            )}
            <Text className=" mb-2 bg-slate-50 border-2 border-slate-600 px-4 py-1 text-xl rounded-xl font-black">
              DIÁRIO
            </Text>
            <View className="w-full h-20 flex-row justify-evenly items-center rounded-xl bg-slate-50 border-2 border-slate-600 overflow-hidden">
              {currentMovie.emojis.map((emoji, index) => (
                <Text
                  key={index}
                  className="text-4xl"
                  style={{
                    transform: [
                      {
                        translateY: index > currentEmoji ? 100 : 0,
                      },
                    ],
                  }}
                >
                  {index > currentEmoji ? "🤫" : emoji}
                </Text>
              ))}
            </View>
            {[...Array(5)].map((_, index) => (
              <GameInput
                movieName={currentMovie.name}
                key={index}
                index={index}
                type={index === currentGuess ? 1 : guessType[index]}
                currentGuess={currentGuess}
                onSubmit={(value) => handleSubmit(value, index)}
              />
            ))}
          </>
        )}
      </ImageBackground>
    </LinearGradient>
  );
}
