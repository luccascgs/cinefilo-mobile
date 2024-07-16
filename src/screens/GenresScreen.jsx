import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";
import PagerView from "react-native-pager-view";
import { cards } from "../config/genres";

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
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("general")}
              className="mt-20 h-4/6 mx-12 rounded-3xl"
              key={index}
            >
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
