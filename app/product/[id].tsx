import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Product } from "firebase/firebaseTypes";
import { fetchProductsById } from "firebase/firebase";

export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (typeof id === "string") {
      fetchProductsById(id).then((data) => {
        if (data) {
          setProduct(data as Product);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="3A82F6" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>No product found</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View
        className="flex-row justify-between items-center px-4 border-b
        border-gray-300 py-2"
      >
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color="gray" />
          <Text className="text-gray-500 ml-1">Back</Text>
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Product details</Text>
        <View style={{ width: 50 }} />
      </View>
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/images/placeholder.png")}
        />
        <View style={styles.contentContainer}>
          <Text style={{ fontWeight: 600, fontSize: 18 }}>
            {product?.title}
          </Text>
          <Text style={{ fontSize: 18, color: "#3a82F6", marginVertical: 10 }}>
            {product?.price} NOK
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={{ color: "white" }}>Buy product</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 20, fontWeight: 500 }}>Description</Text>
          <Text>{product?.description}</Text>
          <Text style={{ marginTop: 20, fontWeight: 500 }}>Condition</Text>
          <Text>{product?.condition}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#D9D9D9",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "rgb(59, 130, 246)",
    alignItems: "center",
    height: 36,
    justifyContent: "center",
    borderRadius: 6,
    marginTop: 20,
  },
});
