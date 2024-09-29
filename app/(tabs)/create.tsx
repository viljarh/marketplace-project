import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function CreateScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-center items-center px-4 mb-4 border-b border-gray-300 py-2">
        <Text className="text-lg font-semibold">Create Post</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-lg font-semibold">Title</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
