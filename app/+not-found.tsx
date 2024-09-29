import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red">Oops! This screen doesn't exist.</Text>
      <Link href="/">Go back home</Link>
    </View>
  );
}
