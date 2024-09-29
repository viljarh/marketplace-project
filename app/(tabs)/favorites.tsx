import { SafeAreaView, Text, View, ScrollView } from "react-native";

export default function FavoritesScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-center items-center px-4 mb-4 border-b border-gray-300 py-2">
        <Text className="text-lg font-semibold">My favorites</Text>
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
