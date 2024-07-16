import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { X } from "react-native-feather";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";
import { useCallback, useState } from "react";
import { formatText } from "../helpers/inputHelper";
import { api } from "../config/api";

export default function UsernameModal({ modalVisible, setModalVisible, id }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      if (username !== formatText(username)) {
        setError("Não pode conter caracteres especiais");
        return;
      }
      setError(null);

      const response = await api.put(`/users/username/${id}`, {
        username,
      });
      console.log(username);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, [username]);

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
          <Text className="text-2xl font-bold text-slate-600">Mudar nome</Text>
          <X
            color={colors.black}
            className="absolute top-2 right-2"
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View
            style={{ borderColor: error ? colors.red : colors.black }}
            className="w-full flex-row justify-between items-center bg-slate-50 px-4 mt-2 border-2 border-slate-600 rounded-xl h-12"
          >
            <TextInput
              className="w-11/12"
              value={username}
              onChangeText={setUsername}
              placeholder="Digite seu novo nome de usuário"
            />
            {error && <Feather name="x" size={24} color={colors.red} />}
          </View>
          {error && (
            <Text className="mt-1 text-red-600 self-start">{error}</Text>
          )}
          <Pressable
            onPress={handleSubmit}
            className="w-full justify-center bg-emerald-50 mt-4 border-2 border-emerald-600 rounded-xl h-12"
          >
            <Text className="self-center text-emerald-600">Enviar</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
