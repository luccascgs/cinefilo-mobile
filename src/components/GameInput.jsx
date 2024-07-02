import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Check, Edit2, MessageCircle, X } from "react-native-feather";

export default function GameInput({ index, type, currentGuess, onSubmit }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (onSubmit && value) {
      onSubmit(value.trim());
    }
  }

  const handleTypeColors = () => {
    if (type === 1) return "slate";
    else if (type === 2) return "sky";
    else if (type === 3) return "red";
    else if (type === 4) return "emerald";
  }

  return (
    <View
      className={`w-full rounded-lg bg-${handleTypeColors()}-50 border-2 border-${handleTypeColors()}-600 flex-row items-center h-12 mt-4`}
    >
      {type === 1 && <Edit2 className="text-slate-600 ml-3" />}
      {type === 2 && <MessageCircle className="text-sky-600 ml-3" />}
      {type === 3 && <X className="text-red-600 ml-3" />}
      {type === 4 && <Check className="text-emerald-600 ml-3" />}
      <TextInput
        className={`ml-3 w-full text-${handleTypeColors()}-600`}
        ref={inputRef}
        value={value}
        onChangeText={setValue}
        mode="outlined"
        placeholder={type !== 1 ? `${index + 1}º Palpite` : "Digite um título"}
        readOnly={type !== 1}
        blurOnSubmit={true}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}
