import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BellIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  HeartIcon,
  PlusCircleIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
} from "react-native-heroicons/outline";

export default function Index() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-2xl font-bold">Logo</Text>
        <BellIcon size={24} color="gray" />
      </View>

      <View className="mx-4 mb-4">
        <View className="flex-row items-center bg-gray-100 rounded-full p-2">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>
      </View>

      <View className="flex-row flex-wrap justify-evenly mx-4 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <View className="w-1/2 p-2" key={i}>
            <View className="w-full h-40 bg-gray-200 rounded-lg" />
          </View>
        ))}
      </View>

      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-lg font-semibold">Recommended</Text>
        <Text className="text-sm text-gray-500">See all</Text>
      </View>
      <ScrollView
        className="flex-wrap flex-row"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} className="w-1/2 p-2">
            <View className="w-full h-40 bg-gray-200 rounded-lg" />
          </View>
        ))}
      </ScrollView>

      <View className="flex-row justify-around items-center py-4 bg-white border-t border-gray-100">
        <TouchableOpacity>
          <HomeIcon size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <HeartIcon size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <PlusCircleIcon size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ChatBubbleBottomCenterTextIcon size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <UserIcon size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
