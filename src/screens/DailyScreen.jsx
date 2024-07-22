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

export default function DailyScreen({ route }) {
  const { id_user } = route.params;

  const [currentMovie, setCurrentMovie] = useState({});
  const [guess, setGuess] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [guessType, setGuessType] = useState(Array(5).fill(2));
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(0);

  const setPlayerStats = useCallback(async (score) => {
    try {
      const response = await api.get(`/stats/${id_user}`);
      const points = response.data.daily;
      const payload = { genre: "daily", value: points + score };
      await api.put(`/stats/${id_user}`, payload);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const loadCurrentMovie = useCallback(async () => {
    const response = await api.get("/movies/daily");
    const user = await api.get(`/users/${id_user}`);
    loadTries(user.data.tries, response.data);

    setGuess(user.data.tries);
    setCurrentEmoji(user.data.tries.length);
    setCurrentGuess(user.data.tries.length);
    setCurrentMovie(response.data);
    setIsLoading(false);
  }, []);

  const handleSubmit = (value, index) => {
    if (value) {
      api.put(`/users/tries/${id_user}`, { trie: value });
      if (checkMovie(value, currentMovie)) {
        guessType[index] = 4;
        setScore(5 - currentGuess);
        setPlayerStats(5 - currentGuess);
        setCurrentGuess(5);
        loadAllEmojis(currentEmoji, setCurrentEmoji, setModalVisible);
        setTimeout(() => {
          setModalVisible(true);
          setOver(true);
        }, 1500);
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

  const loadTries = (tries, movie) => {
    for (index in tries) {
      if (checkMovie(tries[index], movie)) {
        guessType[index] = 4;
        setScore(5 - currentGuess);
        setCurrentGuess(5);
        setCurrentEmoji(5);
        setTimeout(() => {
          setModalVisible(true);
          setOver(true);
        }, 1500);
      } else {
        guessType[index] = 3;
        console.log(index);
        if (index == 4) {
          setTimeout(() => {
            setModalVisible(true);
            setOver(true);
          }, 1500);
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
          currentMovie={currentMovie}
          mode="diário"
          genre="daily"
          streak={score}
        />
        <Text className=" mb-2 bg-slate-50 border-2 border-slate-600 px-4 py-1 text-xl rounded-xl font-black">
          DIÁRIO
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
                guess={guess[index]}
                type={index === currentGuess ? 1 : guessType[index]}
                onSubmit={(value) => handleSubmit(value, index)}
              />
            ))}
          </>
        )}
      </ImageBackground>
    </LinearGradient>
  );
}
