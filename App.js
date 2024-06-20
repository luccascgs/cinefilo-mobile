import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import GameInput from "./src/components/GameInput";
import { api } from "./src/config/api";

export default function App() {
  const [currentMovie, setCurrentMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const loadCurrentMovie = useCallback(async () => {
    setIsLoading(true);
    const response = await api.get("/movies/daily");
    console.log(response.data);
    setCurrentMovie(response.data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadCurrentMovie();
  }, [loadCurrentMovie]);

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <View className="w-320 flex-row justify-evenly bg-slate-50">
            {currentMovie.emojis.map((emoji, index) => (
              <Text key={index}>{emoji}</Text>
            ))}
          </View>
          <GameInput index={0} />
          <GameInput index={1} />
          <GameInput index={2} />
          <GameInput index={3} />
          <GameInput index={4} />
        </>
      )}
    </View>
  );
}
