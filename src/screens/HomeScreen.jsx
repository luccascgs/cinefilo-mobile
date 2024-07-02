import React, { useCallback, useEffect, useState } from "react";
import { Text, View, Animated, Easing } from "react-native";
import GameInput from "../components/GameInput";
import { api } from "../config/api";
import { checkMovie } from "../helpers/movieHelper";

export default function App() {
  const [currentMovie, setCurrentMovie] = useState({
    id: "69b88f4a-72b0-457f-9997-2d1efe1abae3",
    genre: 6,
    emojis: ["🚢", "🌊", "🚪", "💔", "🎻"],
    acceptableNames: ["titanic", "thetitanic", "otitanic"],
    name: "Titanic",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [guessType, setGuessType] = useState(Array(5).fill(2));
  const animations = currentMovie.emojis.map(() => new Animated.Value(0));

  useEffect(() => {
    if (currentGuess < animations.length) {
      Animated.timing(animations[currentGuess], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.exp),
      }).start();
    }
  }, [currentGuess]);

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
        setCurrentGuess(5);
        guessType[index] = 4;
        console.log("Acertou: " + currentMovie.name);
      } else {
        guessType[index] = 3;
        console.log("Errou");
        setCurrentGuess(currentGuess + 1);
      }
    }
  };

  return (
    <View className="flex-1 p-8 items-center justify-center bg-blue-500">
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <View className="w-full h-20 flex-row justify-evenly items-center rounded-xl bg-slate-50 border-2 border-slate-600 overflow-hidden">
            {currentMovie.emojis.map((emoji, index) => {
              const animationStyle = {
                opacity: animations[index],
                transform: [
                  {
                    translateY: animations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [120, 0],
                    }),
                  },
                ],
              };

              return (
                <Animated.View key={index} style={animationStyle}>
                  <Text className={`text-5xl`}>{emoji}</Text>
                </Animated.View>
              );
            })}
          </View>
          {[...Array(5)].map((_, index) => (
            <GameInput
              key={index}
              index={index}
              type={index === currentGuess ? 1 : guessType[index]}
              currentGuess={currentGuess}
              onSubmit={(value) => handleSubmit(value, index)}
            />
          ))}
        </>
      )}
    </View>
  );
}
