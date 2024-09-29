import { router } from "expo-router";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TouchableOpacityBase,
} from "react-native";
import {
  ArrowRightEndOnRectangleIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  DocumentIcon,
  HeartIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";

export default function ProfileScreen() {
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
        <Text className="text-lg font-semibold">Profile</Text>
        <View style={{ width: 50 }} />
      </View>

      <View className="flex items-center my-6">
        <UserCircleIcon size={64} color="gray" />
        <Text className="text-lg font-semibold mt-2">Viljar Hoem-Olsen</Text>
        <Text className="text-gray-500">viljar.hoem.olsen@gmail.com </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">My Posts</Text>
          <DocumentIcon size={24} color="gray" />
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">My Favorites</Text>
          <HeartIcon size={24} color="gray" />
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">Settings</Text>
          <Cog6ToothIcon size={24} color="gray" />
        </TouchableOpacity>
      </ScrollView>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-base">Log Out</Text>
          <ArrowRightEndOnRectangleIcon size={24} color="gray" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
