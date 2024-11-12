import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsPage() {
  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row justify-between items-center px-4 mb-4 border-b
      border-gray-300 py-2"
      >
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Settings</Text>
        <View style={{ width: 50 }} />
      </View>
    </SafeAreaView>
  );
}
