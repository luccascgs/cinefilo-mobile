import { View, Text } from "react-native";
import GameInput from "../components/GameInput";
import tw from "twrnc"

export default function HomeScreen() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <View>
        <Text>😊</Text>
        <Text>😊</Text>
        <Text>😊</Text>
        <Text>😊</Text>
        <Text>😊</Text>
      </View>
      <GameInput index={0}/>
      <GameInput index={1}/>
      <GameInput index={2}/>
      <GameInput index={3}/>
      <GameInput index={4}/>
    </View>
  );
}
