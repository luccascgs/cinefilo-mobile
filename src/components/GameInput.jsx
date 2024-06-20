import React from "react";
import { TextInput, View } from "react-native";
import { Edit2 } from "react-native-feather";

export default function GameInput({index}) {
  return (
    <View className="bg-slate-50">
      <TextInput mode="outlined" placeholder={`${index+ 1}º Palpite`} />
    </View>
  );
}