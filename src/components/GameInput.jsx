import { useEffect, useRef, useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Check, Edit2, MessageCircle, X } from "react-native-feather";
import { Feather } from "@expo/vector-icons";
import { colors } from "../config/variables";

export default function GameInput({
  index,
  type,
  currentGuess,
  onSubmit,
  movieName,
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (onSubmit && value) {
      onSubmit(value.trim());
    }
  };

  const handleTypeColors = () => {
    if (type === 1) return "slate";
    else if (type === 2) return "sky";
    else if (type === 3) return "red";
    else if (type === 4) return "emerald";
  };

  const typeColor = handleTypeColors();

  return (
    <View
      style={[
        styles.inputContainer,
        styles[`bg${typeColor}50`],
        styles[`border${typeColor}600`],
      ]}
    >
      {type === 1 && (
        <Feather
          name="edit-2"
          size={24}
          color={colors.black}
          style={{ marginLeft: 12 }}
        />
      )}
      {type === 2 && (
        <Feather
          name="message-circle"
          size={24}
          color={colors.blue}
          style={{ marginLeft: 12 }}
        />
      )}
      {type === 3 && (
        <Feather
          name="x"
          size={24}
          color={colors.red}
          style={{ marginLeft: 12 }}
        />
      )}
      {type === 4 && (
        <Feather
          name="check"
          size={24}
          color={colors.green}
          style={{ marginLeft: 12 }}
        />
      )}
      <TextInput
        placeholderTextColor={type === 1 ? "#475569" : "#0284c7"}
        style={[styles.textInput, styles[`text${typeColor}600`]]}
        ref={inputRef}
        value={type === 4 ? movieName : value}
        onChangeText={setValue}
        mode="outlined"
        placeholder={type !== 1 ? `${index + 1}º Palpite` : "Digite um título"}
        editable={type === 1}
        blurOnSubmit={true}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    marginTop: 16,
    borderWidth: 2,
  },
  textInput: {
    marginLeft: 12,
    width: "100%",
  },
  bgslate50: {
    backgroundColor: "#f1f5f9",
  },
  bgsky50: {
    backgroundColor: "#ebf8ff",
  },
  bgred50: {
    backgroundColor: "#fef2f2",
  },
  bgemerald50: {
    backgroundColor: "#ecfdf5",
  },
  borderslate600: {
    borderColor: "#475569",
  },
  bordersky600: {
    borderColor: "#0284c7",
  },
  borderred600: {
    borderColor: "#dc2626",
  },
  borderemerald600: {
    borderColor: "#059669",
  },
  textslate600: {
    color: "#475569",
  },
  textsky600: {
    color: "#0284c7",
  },
  textred600: {
    color: "#dc2626",
  },
  textemerald600: {
    color: "#059669",
  },
});
