import { Skeleton } from "moti/skeleton";
import { Text, View } from "react-native";

export default function GameSkeleton({ title }) {
  return (
    <View className="items-center">
      <Skeleton colorMode="light" show={true} height={80} width={"100%"} />
      <View style={{ height: 16 }} />
      <Skeleton colorMode="light" show={true} height={48} width={"100%"} />
      <View style={{ height: 16 }} />
      <Skeleton colorMode="light" show={true} height={48} width={"100%"} />
      <View style={{ height: 16 }} />
      <Skeleton colorMode="light" show={true} height={48} width={"100%"} />
      <View style={{ height: 16 }} />
      <Skeleton colorMode="light" show={true} height={48} width={"100%"} />
      <View style={{ height: 16 }} />
      <Skeleton colorMode="light" show={true} height={48} width={"100%"} />
    </View>
  );
}
