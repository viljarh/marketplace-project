import { router } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function FavoritesScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center px-4 mb-4 border-b border-gray-300 py-2">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">My favorites</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} className="w-1/2 p-2">
            <View className="w-full h-40 bg-gray-200 rounded-lg" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
