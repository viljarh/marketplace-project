import React, { useCallback, useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "react-native-heroicons/outline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "firebase/firebaseTypes";

export default function FeedPage() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { categoryId, categoryName } = useLocalSearchParams();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory(categoryId as string);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchCategoryProducts();
  }, [categoryId]);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  // const closeBottomSheet = () => {
  //   bottomSheetRef.current?.close();
  // };

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3A82F6" />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-row justify-between items-center px-4 mb-4 py-2">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.back()}
          >
            <ChevronLeftIcon size={20} color="gray" />
            <Text className="text-gray-500 ml-1">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={openBottomSheet}>
            <FunnelIcon size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="mx-6 mb-4">
          <View className="flex-row items-center bg-gray-100 rounded-lg p-2 border border-gray-300">
            <MagnifyingGlassIcon size={20} color="gray" />
            <TextInput
              autoCapitalize="none"
              className="ml-2 flex-1"
              placeholder="Search"
              placeholderTextColor="gray"
            />
          </View>
          <Text className="font-semibold mt-3">{categoryName}</Text>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {products.map((product) => (
            <View key={product.id} className="w-1/2 p-2">
              <View className="w-full h-40 bg-gray-200 rounded-lg" />
              <Text>{product.title}</Text>
              <Text>{product.price} NOK</Text>
            </View>
          ))}
        </ScrollView>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["70%"]}
          onChange={handleSheetChanges}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} pressBehavior="close" />
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.modalText}>Filter Options</Text>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
