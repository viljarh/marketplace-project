import { router } from "expo-router";
import { fetchProducts } from "firebase/firebase";
import { Product } from "firebase/firebaseTypes";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3A82F6" />
      </SafeAreaView>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
          <Text className="text-2xl font-bold">
            Market<Text className="text-blue-500">Place</Text>
          </Text>
          <BellIcon size={24} color="gray" />
        </View>

        {/* Search Bar */}
        <View className="mx-4 mb-4">
          <View className="flex-row items-center bg-gray-100 rounded-lg p-2 border border-gray-300">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              autoCapitalize="none"
              className="ml-2 flex-1"
              placeholder="Search"
              placeholderTextColor="gray"
            />
          </View>
        </View>

        {/* Categories */}
        <View className="flex-row flex-wrap justify-evenly mx-4 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              className="w-1/4 p-2"
              onPress={() => router.push("/feed")}
            >
              <View className="w-full h-20 bg-gray-200 rounded-lg" />
              <Text className="text-center mt-2">Category {i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Section */}
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-lg font-semibold">Recommended</Text>
          <Text className="text-sm text-gray-500">See all</Text>
        </View>

        {/* Scrollable Recommended Items */}
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="w-1/2 p-2"
              onPress={() => router.push("/product")}
            >
              <View className="w-full h-40 bg-gray-200 rounded-lg">
                <Text className="text-center font-semibold mt-2">
                  {product.title}
                </Text>
                <Text className="text-center text-gray-600">
                  {product.price} NOK
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
