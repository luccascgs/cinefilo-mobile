import { useCallback, useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../config/variables";
import { Feather } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import { api } from "../config/api";
import { Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filter, setFilter] = useState("");

  const loadMovies = useCallback(async () => {
    const response = await api.get("/movies");
    setMovies(response.data);
    setFilteredMovies(response.data);
    setIsloading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsloading(true);
      loadMovies();
    }, [])
  );

  const handleDelete = useCallback(async (id) => {
    await api.delete(`/movies/${id}`);
    loadMovies();
  }, []);

  const handleConfirmDelete = (movie) => {
    Alert.alert(
      `Deseja realmente excluir ${movie.name}?`,
      "Essa ação excluirá permanentemente o filme do banco de dados",
      [
        {
          text: "Não",
          style: "cancel",
        },
        { text: "Sim", onPress: () => handleDelete(movie.id) },
      ],
      {
        cancelable: true,
      }
    );
  };

  const search = useMemo(
    () =>
      debounce(() => {
        const filtered = movies.filter((item) =>
          item.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredMovies(filtered);
      }, 100),
    [filter, movies]
  );

  const handleSearch = useCallback(() => {
    search();
  }, [search]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

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
        className="flex-1 px-8 justify-center items-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16 self-center">
          CINÉFILO
        </Text>
        <View className="pl-4 pr-8 w-full h-12 mb-4 flex-row items-center justify-between border-2 border-slate-600 bg-slate-50 rounded-xl">
          <TextInput
            className="w-full"
            value={filter}
            onChangeText={setFilter}
            placeholder="Digite um título"
          />
          <Feather color={colors.black} name="search" size={20} />
        </View>
        {isLoading ? (
          <View className="w-full border-2 border-slate-600 bg-slate-50 rounded-xl py-2 h-1/2 justify-center items-center ">
            <ActivityIndicator size={"large"} color={colors.black} />
          </View>
        ) : (
          <View className="w-full border-2 border-slate-600 bg-slate-50 rounded-xl py-2 h-1/2">
            <ScrollView>
              {filteredMovies?.map((movie, index) => (
                <View
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.white : "#dadde0",
                  }}
                  className="flex-row items-center justify-between py-2 px-4"
                  key={index}
                >
                  <Text className="text-slate-600 w-4/6" numberOfLines={1}>
                    {movie.name}
                  </Text>
                  <View className="flex-row">
                    <Feather
                      onPress={() =>
                        navigation.navigate("form", { id: movie.id })
                      }
                      style={{ marginRight: 8 }}
                      color={colors.green}
                      name="edit"
                      size={28}
                    />
                    <Feather
                      onPress={() => handleConfirmDelete(movie)}
                      color={colors.red}
                      name="x"
                      size={28}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        <Pressable
          onPress={() => navigation.navigate("form")}
          className="w-full justify-center bg-emerald-50 mt-4 border-2 border-emerald-600 rounded-xl h-12"
        >
          <Text className="self-center text-emerald-600">Criar Filme</Text>
        </Pressable>
      </ImageBackground>
    </LinearGradient>
  );
}
