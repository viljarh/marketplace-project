import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  DocumentIcon,
  HeartIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-center items-center px-4 mb-4 border-b border-gray-300 py-2">
        <Text className="text-lg font-semibold">Profile</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="flex items-center my-6">
          <UserCircleIcon size={64} color="gray" />
          <Text className="text-lg font-semibold mt-2">Viljar Hoem-Olsen</Text>
          <Text className="text-gray-500">viljar.hoem.olsen@gmail.com </Text>
        </View>

        <View className="p-4">
          <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
            <Text className="text-base">My Posts</Text>
            <DocumentIcon size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
            <Text className="text-base">My Favorites</Text>
            <HeartIcon size={24} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
            <Text className="text-base">Settings</Text>
            <Cog6ToothIcon size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View className="p-4">
        <TouchableOpacity className="flex-row justify-between items-center py-4 border-t border-gray-200">
          <Text className="text-red-600 font-semibold">Log Out</Text>
          <ArrowRightEndOnRectangleIcon size={24} color="red" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
