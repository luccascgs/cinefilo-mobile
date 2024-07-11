import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useCallback, useEffect, useState } from "react";
import { colors } from "../config/variables";
import { api } from "../config/api";
import { formatText } from "../helpers/inputHelper";
import { splitEmojis } from "../helpers/emojiHelper";

export default function FormScreen({ route, navigation }) {
  const { id } = route.params;
  const [name, setName] = useState("");
  const [emojis, setEmojis] = useState("");
  const [acceptableNames, setAcceptableNames] = useState([{ id: 0, name: "" }]);
  const [genre, setGenre] = useState(4);

  const loadMovie = useCallback(async () => {
    if (id) {
      const response = await api.get(`/movies/${id}`);
      setName(response.data?.name);
      setGenre(response.data?.genre);
      setEmojis(response.data?.emojis?.join(""));
      setAcceptableNames(
        response.data?.acceptableNames.map((item, index) => ({
          id: index,
          name: item,
        }))
      );
    }
  }, [id]);

  const handleSubmit = useCallback(async () => {
    try {
      const payLoad = {
        name: name?.trim(),
        emojis: splitEmojis(emojis),
        acceptableNames: acceptableNames.map((item) => item.name?.trim()),
        genre: Number(genre),
      };

      console.log(payLoad);

      navigation.navigate("admin");
    } catch (err) {
      console.error(err);
    }
  }, [name, acceptableNames, emojis, genre, id]);

  function handleAddAcceptableName() {
    const newAcceptableNames = [
      ...acceptableNames,
      { id: acceptableNames.length, name: "" },
    ];
    setAcceptableNames(newAcceptableNames);
  }

  function handleRemoveAcceptableName(id) {
    let index = 0;
    const updatedAcceptableNames = [];

    for (const acceptableName of acceptableNames) {
      if (acceptableName.id !== id) {
        updatedAcceptableNames.push({ id: index, name: acceptableName.name });
        index++;
      }
    }

    setAcceptableNames(updatedAcceptableNames);
  }

  function handleChangeAcceptableName(event, id) {
    const index = acceptableNames.findIndex((item) => item.id === id);
    const updatedAcceptableNames = [...acceptableNames];

    updatedAcceptableNames[index].name = formatText(event);
    setAcceptableNames(updatedAcceptableNames);
  }

  useEffect(() => {
    loadMovie();
  }, [loadMovie]);

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
        <View className="w-full flex-row justify-between">
          <TextInput
            value={name}
            onChangeText={setName}
            placeholderTextColor={"#9acdf0"}
            placeholder="Digite o título..."
            className="pl-4 bg-sky-50 text-sky-600 w-3/5 text-lg border-2 border-sky-600 rounded-xl"
          />
          <View className="w-2/6 bg-sky-50 border-2 border-sky-600 rounded-xl">
            <Picker
              style={{ width: "100%", color: colors.blue }}
              selectedValue={genre}
              onValueChange={(itemValue) => setGenre(itemValue)}
            >
              <Picker.Item value={4} label="Ação" />
              <Picker.Item value={3} label="Adam Sandler" />
              <Picker.Item value={7} label="Animação" />
              <Picker.Item value={5} label="Comédia" />
              <Picker.Item value={8} label="Drama" />
              <Picker.Item value={6} label="Ficção" />
              <Picker.Item value={2} label="Série" />
              <Picker.Item value={1} label="Terror" />
            </Picker>
          </View>
        </View>

        <TextInput
          className="bg-sky-50 w-3/5 text-4xl w-full py-2 border-2 text-sky-600 border-sky-600 rounded-xl mt-2"
          textAlign="center"
          value={emojis}
          onChangeText={setEmojis}
          placeholderTextColor={"#9acdf0"}
          placeholder="Digite os Emojis"
        />
        <View className="w-full py-2 h-2/5">
          <ScrollView>
            {acceptableNames.map((acceptableName) => (
              <View
                key={acceptableName.id}
                className="w-full flex-row justify-between items-center bg-slate-50 px-4 mt-2 border-2 border-slate-600 rounded-xl h-12"
              >
                <TextInput
                  className="w-11/12 text-slate-600"
                  value={acceptableName.name}
                  onChangeText={(e) =>
                    handleChangeAcceptableName(e, acceptableName.id)
                  }
                  placeholder="Digite um nome permitido"
                />
                <TouchableOpacity
                  className="w-1/12"
                  onPress={() => handleRemoveAcceptableName(acceptableName.id)}
                >
                  <Feather name="x" size={24} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleAddAcceptableName}
          className="w-full justify-center bg-sky-50 mt-4 border-2 border-sky-600 rounded-xl h-12"
        >
          <Text className="self-center text-sky-600">
            Adicionar nome permitido
          </Text>
        </TouchableOpacity>
        <Pressable
          onPress={handleSubmit}
          className="w-full justify-center bg-emerald-50 mt-4 border-2 border-emerald-600 rounded-xl h-12"
        >
          <Text className="self-center text-emerald-600">Enviar</Text>
        </Pressable>
        <Image
          source={{ uri: "https://pbs.twimg.com/media/F1w71cMXsAEV6iy.jpg" }}
        />
      </ImageBackground>
    </LinearGradient>
  );
}
