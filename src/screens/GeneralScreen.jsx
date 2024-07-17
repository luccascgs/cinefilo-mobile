import { useCallback, useEffect, useState } from "react";
import {
  AppRegistry,
  ImageBackground,
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
import GameSkeleton from "../components/GameSkeleton";
import ProgressModal from "../components/ProgressModal";

export default function GeneralScreen({ navigation }) {
  const [currentMovie, setCurrentMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [guessType, setGuessType] = useState(Array(5).fill(2));
  const [modalVisible, setModalVisible] = useState(false);
  const [over, setOver] = useState(false);

  const resetGame = () => {
    navigation.goBack();
    navigation.navigate("general");
  };

  const loadCurrentMovie = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get("/movies/genres");
    setCurrentMovie(response.data);
    setIsLoading(false);
  }, []);

  const handleSubmit = (value, index) => {
    if (value) {
      if (checkMovie(value, currentMovie)) {
        guessType[index] = 4;
        setCurrentGuess(5);
        loadAllEmojis(currentEmoji, setCurrentEmoji, setModalVisible);
        setTimeout(() => {
          resetGame();
        }, 3000);
      } else {
        guessType[index] = 3;
        setCurrentGuess(currentGuess + 1);
        setCurrentEmoji(currentEmoji + 1);
        if (currentGuess === 4) {
          setTimeout(() => {
            setModalVisible(true);
            setOver(true);
          }, 500);
        }
      }
    }
  };

  useEffect(() => {
    loadCurrentMovie();
  }, [loadCurrentMovie]);

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
        <View className="flex-1 z-20 absolute w-full h-full bg-black/75" />
      )}
      <ImageBackground
        source={require("../../assets/background-image.png")}
        resizeMode="repeat"
        className="flex-1 px-8 items-center justify-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16">
          CINÉFILO
        </Text>
        <ProgressModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          resetGame={resetGame}
          currentMovie={currentMovie}
          mode="geral"
          genre="general"
          streak={1}
        />
        <Text className=" mb-2 bg-slate-50 border-2 border-slate-600 px-4 py-1 text-xl rounded-xl font-black">
          GERAL
        </Text>
        {isLoading ? (
          <GameSkeleton />
        ) : (
          <>
            {over && !modalVisible && (
              <Pressable
                className="flex-1 z-10 absolute w-full h-full"
                onPress={() => setModalVisible(!modalVisible)}
              />
            )}

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
