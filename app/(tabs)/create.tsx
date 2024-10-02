import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraIcon, ChevronLeftIcon } from "react-native-heroicons/outline";

export default function CreatePostScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row justify-between items-center px-4 mb-4 border-b border-gray-300 py-2">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Create Post</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView
        className="flex-1 px-2 py-2"
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
      >
        <Text className="text-lg font-semibold mb-2">Title</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Enter title"
        />

        <Text className="text-lg font-semibold mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Enter description"
          multiline={true}
        />

        <Text className="text-lg font-semibold mb-2">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Enter price"
          keyboardType="numeric"
        />

        <Text className="text-lg font-semibold mb-2">Select Category</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Choose category"
        />

        <Text className="text-lg font-semibold mb-2">Condition</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Choose condition"
        />

        <Text className="text-lg font-semibold mb-2">Images</Text>
        <TouchableOpacity className="border border-gray-300 rounded-lg p-4 flew-row justify-center items-center mb-6">
          <CameraIcon size={24} color="gray" />
          <Text className="ml-2 text-gray-500">Upload Images</Text>
        </TouchableOpacity>

        <View className="pb-4">
          <TouchableOpacity className="bg-blue-500 rounded-lg p-4">
            <Text className="text-white text-center font-semibold  text-lg">
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
