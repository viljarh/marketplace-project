import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

export default function FeedPage() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center px-4 mb-4 py-2">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back </Text>
        </TouchableOpacity>
        <View style={{ width: 50 }} />
      </View>
      <View className="mx-6 mb-4">
        <View className="flex-row items-center bg-gray-100 rounded-lg p-2 border border-gray-300">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            autoCapitalize="none"
            className="ml-2 flex-1"
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
        <Text className="font-semibold mt-3">Electronics / Computer</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <View key={i} className="w-1/2 p-2">
            <View className="w-full h-40 bg-gray-200 rounded-lg" />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
