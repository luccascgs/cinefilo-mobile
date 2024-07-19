import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";
import PagerView from "react-native-pager-view";
import { cards } from "../config/genres";
import Carousel from "react-native-snap-carousel";

export default function GenresScreen({ navigation }) {
  const { width: screenWidth } = Dimensions.get("window");
  const sliderWidth = screenWidth;
  const cardWidth = screenWidth * 0.8;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("general")}
      className="mt-48 h-3/6 rounded-3xl"
    >
      <LinearGradient
        className="h-full rounded-3xl items-center justify-end"
        colors={[item.color2, item.color1]}
      >
        {/* <Image source={require(`../../assets/genres/${item.img}.png`)} /> */}
        <Text className="mb-10 font-black text-slate-50 text-4xl">
          {item.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

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
        <Carousel
          layout="default"
          data={cards}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={cardWidth}
        />
      </ImageBackground>
    </LinearGradient>
  );
}
