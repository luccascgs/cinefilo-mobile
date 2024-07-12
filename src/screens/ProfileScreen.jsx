import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";

import { colors } from "../config/variables";
import { Pressable } from "react-native";
import UsernameModal from "../components/UsernameModal";

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("luccascgs");

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
        <View className="flex-1 z-10 absolute w-full h-full bg-black/75" />
      )}
      <ImageBackground
        source={require("../../assets/background-image.png")}
        resizeMode="repeat"
        className="flex-1 px-8 justify-center items-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16 self-center">
          CINÉFILO
        </Text>
        <UsernameModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          username={username}
        />
        <View className="items-end">
          <Image
            className="w-48 h-48 border-2 rounded-full translate-y-12"
            source={require("../../assets/gilgoiaba.jpg")}
          />
          <Pressable
            style={{ borderColor: colors.blueBg }}
            className="p-2 border-4 rounded-full bg-slate-50"
          >
            <Feather name="edit" size={28} />
          </Pressable>
        </View>
        <View className="w-full items-center bg-slate-50 mt-2 border-2 border-slate-600 rounded-xl p-6">
          <View className="flex-row items-center">
            <Text className="text-slate-600 text-2xl font-semibold pr-2">
              {username}
            </Text>
            <Feather
              onPress={() => setModalVisible(true)}
              color={colors.black}
              name="edit"
              size={24}
            />
          </View>
          <Text className="mt-2 text-slate-400">
            Conta criada em 08/11/2006
          </Text>
          <View className="mt-4 w-full">
            <Text className="text-lg justify-self-start">Estatísticas</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              saepe ad inventore? Ratione similique quo ipsam eum eligendi
              explicabo, odio iusto ea officiis! Sint fuga rerum veritatis,
              animi iste nobis.
            </Text>
          </View>
        </View>
        <View className="flex-row w-full justify-between mt-2">
          <Pressable
            onPress={() => navigation.navigate("changeEmail")}
            style={{ width: "49.5%" }}
            className="flex-row items-center justify-center bg-sky-50 border-2 border-sky-600 rounded-xl h-10"
          >
            <Feather name="at-sign" color={colors.blue} />
            <Text className="self-center text-sky-600 pl-2">Mudar Email</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("changePassword")}
            style={{ width: "49.5%" }}
            className="flex-row items-center justify-center bg-sky-50 border-2 border-sky-600 rounded-xl h-10"
          >
            <Feather name="lock" color={colors.blue} />
            <Text className="self-center text-sky-600 pl-2">Mudar Senha</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => console.log("Saiu")}
          className="w-full flex-row items-center justify-center bg-red-50 mt-2 border-2 border-red-600 rounded-xl h-10"
        >
          <Feather name="log-out" color={colors.red} />
          <Text className="self-center text-red-600 pl-2">Sair</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("admin")}
          className="w-full flex-row items-center justify-center bg-emerald-50 mt-2 border-2 border-emerald-600 rounded-xl h-10"
        >
          <Feather name="database" color={colors.green} />
          <Text className="self-center text-emerald-600 pl-2">Admin</Text>
        </Pressable>
      </ImageBackground>
    </LinearGradient>
  );
}
