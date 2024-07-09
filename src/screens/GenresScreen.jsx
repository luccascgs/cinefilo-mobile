import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";
import PagerView from "react-native-pager-view";

const cards = [
  {
    title: "Geral",
    color1: "#a8ff37",
    color2: "#4f7918",
    img: "geral",
  },
  {
    title: "Terror",
    color1: "#C50C00",
    color2: "#2D0300",
    img: "horror",
  },
  {
    title: "Ação",
    color1: "#C87539",
    color2: "#2D1A0D",
    img: "action",
  },
  {
    title: "Comédia",
    color1: "#00DE81",
    color2: "#001f12",
    img: "comedy",
  },
  {
    title: "Ficção",
    color1: "#3000de",
    color2: "#0e0041",
    img: "sci",
  },
  {
    title: "Animação",
    color1: "#dbb300",
    color2: "#442200",
    img: "animation",
  },
  {
    title: "Drama",
    color1: "#DC2626",
    color2: "#2D0300",
    img: "drama",
  },
  {
    title: "Adam Sandler",
    color1: "#FBE200",
    color2: "#262200",
    img: "adam",
  },
  {
    title: "Séries",
    color1: "#6200DE",
    color2: "#0d011e",
    img: "series",
  },
];

export default function GenresScreen({ navigation }) {
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
        className="flex-1 justify-center"
      >
        <Text className="text-2xl text-slate-50 font-black absolute top-16 self-center">
          CINÉFILO
        </Text>
        <PagerView initialPage={0}>
          {cards.map((card, index) => (
            <TouchableOpacity onPress={()=>navigation.navigate("general")} className="mt-20 h-4/6 mx-12 rounded-3xl" key={index}>
              <LinearGradient
                className="h-full rounded-3xl items-center justify-end"
                colors={[card.color2, card.color1]}
              >
                {/* <Image source={require(`../../assets/genres/${card.img}.png`)} /> */}
                <Text className="mb-10 font-black text-slate-50 text-4xl">
                  {card.title}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </PagerView>
      </ImageBackground>
    </LinearGradient>
  );
}
