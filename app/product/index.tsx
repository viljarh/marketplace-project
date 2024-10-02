import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

export default function ProductDetails() {
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
        <Text className="text-lg font-semibold">Product details</Text>
        <View style={{ width: 50}}/>
        
      </View>
      <View style={styles.container}>
        
        <Text>Product Details</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
