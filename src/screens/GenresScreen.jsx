import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/variables";
import { cards } from "../config/genres";
import Carousel from "react-native-snap-carousel";

const imageMapping = {
  general: require("../../assets/genres/general.png"),
  horror: require("../../assets/genres/horror.png"),
  action: require("../../assets/genres/action.png"),
  comedy: require("../../assets/genres/comedy.png"),
  scifi: require("../../assets/genres/scifi.png"),
  cartoon: require("../../assets/genres/cartoon.png"),
  drama: require("../../assets/genres/drama.png"),
  adam: require("../../assets/genres/adam.png"),
  series: require("../../assets/genres/series.png"),
};

export default function GenresScreen({ navigation }) {
  const { width: screenWidth } = Dimensions.get("window");
  const sliderWidth = screenWidth;
  const cardWidth = screenWidth * 0.8;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("general")}
      style={{ backgroundColor: item.color2 }}
      className="mt-48 h-3/6 w-full rounded-3xl items-center justify-center"
    >
      <Image className="w-64 h-64 absolute" source={imageMapping[item.img]} />
      <LinearGradient
        className="h-full w-full rounded-3xl items-center justify-end"
        colors={["#ffffff00", item.color1]}
      >
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
