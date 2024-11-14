import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CameraIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { handleCreatePost } from "../../firebase/firebase";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIES } from "constants/constants";

export default function CreatePostScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");

  const router = useRouter();

  const createProduct = async () => {
    const newProductId = await handleCreatePost(
      title,
      description,
      price,
      category,
      condition,
    );

    if (newProductId) {
      console.log("product created with ID:", newProductId);
      router.replace("/");
    } else {
      console.error("Failed to create product");
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row justify-between items-center px-4 mb-4 
      border-b border-gray-300 py-2"
      >
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
          value={title}
          onChangeText={setTitle}
        />

        <Text className="text-lg font-semibold mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />

        <Text className="text-lg font-semibold mb-2">Price</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Enter price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text className="text-lg font-semibold mb-2">Select Category</Text>
        <View className="border border-gray-300 rounded-lg mb-4">
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={{ height: 50, color: "gray", marginBottom: 4 }}
          >
            <Picker.Item label="Select A Category" value="" />
            {CATEGORIES.map((category) => (
              <Picker.Item
                key={category.id}
                label={`${category.icon} ${category.name}`}
                value={category.id}
              />
            ))}
          </Picker>
        </View>

        <Text className="text-lg font-semibold mb-2">Condition</Text>
        <View className="border border-gray-300 rounded-lg mb-4">
          <Picker
            selectedValue={condition}
            onValueChange={(itemValue) => setCondition(itemValue)}
            style={{ height: 50, color: "gray", marginBottom: 4 }}
          >
            <Picker.Item label="Select Condition" value="" />
            <Picker.Item label="New" value="New" />
            <Picker.Item label="Used - Good" value="Used - Good" />
            <Picker.Item label="Used - Fair" value="Used - Fair" />
            <Picker.Item label="Used - Poor" value="Used - Poor" />
          </Picker>
        </View>

        <Text className="text-lg font-semibold mb-2">Images</Text>
        <TouchableOpacity
          className="border border-gray-300 rounded-lg p-4 
        flew-row justify-center items-center mb-6"
        >
          <CameraIcon size={24} color="gray" />
          <Text className="ml-2 text-gray-500">Upload Images</Text>
        </TouchableOpacity>

        <View className="pb-4">
          <TouchableOpacity
            onPress={createProduct}
            className="bg-blue-500 rounded-lg p-4"
          >
            <Text className="text-white text-center font-semibold  text-lg">
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
