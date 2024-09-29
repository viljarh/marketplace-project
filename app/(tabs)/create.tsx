import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function CreateScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-center items-center px-4 mb-4 border-b border-gray-300 py-2">
        <Text className="text-lg font-semibold">Create Post</Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <Text className="text-lg font-semibold">Title</Text>
        <Text className="text-lg font-semibold">Description</Text>
        <Text className="text-lg font-semibold">Price</Text>
        <Text className="text-lg font-semibold">Condition</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
