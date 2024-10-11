import { router } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

export default function SettingsPage() {
  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row justify-between items-center px-4 mb-4 border-b border-gray-300 py-2"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
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
