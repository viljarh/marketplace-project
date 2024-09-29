import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

export default function MessagesScreen() {
  return (
    <SafeAreaView>
      <View className="flex-row justify-center items-center px-4 mb-4 border-b border-gray-300 py-2">
        <Text className="text-lg font-semibold">Messages</Text>
      </View>
      <View className="p-4">
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">Eirik</Text>
          <ChevronRightIcon size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">Jeremy</Text>
          <ChevronRightIcon size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">John</Text>
          <ChevronRightIcon size={24} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">Kjell Tore</Text>
          <ChevronRightIcon size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
