import { LinearGradient } from "expo-linear-gradient";
import { Image, ImageBackground, Text, View } from "react-native";
import { colors } from "../config/variables";

export default function ProfileScreen() {
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
        <Image source={{uri: "https://pbs.twimg.com/media/F1w71cMXsAEV6iy.jpg"}}/>
      </ImageBackground>
    </LinearGradient>
  );
}
