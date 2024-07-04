import React, { useCallback, useEffect, useState } from "react";
import { AppRegistry, ImageBackground, Text, View } from "react-native";
import GameInput from "../components/GameInput";
import { api } from "../config/api";
import { checkMovie } from "../helpers/movieHelper";
import { loadAllEmojis } from "../helpers/emojiHelper";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";

AppRegistry.registerComponent("main", () => HomeScreen);

export default function HomeScreen() {
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
        loadAllEmojis(currentEmoji, setCurrentEmoji);
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
        {isLoading ? (
          <Text>Carregando...</Text>
        ) : (
          <>
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
