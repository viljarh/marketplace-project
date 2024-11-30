import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";
import { fetchProductsById } from "firebase/firebase";
import { Product } from "types/types";

// CheckoutScreen component for displaying product details and handling checkout
export default function CheckoutScreen() {
  // Get the product ID from the URL parameters
  const { id } = useLocalSearchParams();
  // State variables
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");

  const router = useRouter();
  // Fetch product details when the component mounts or ID changes
  useEffect(() => {
    const loadProductDetails = async () => {
      if (typeof id === "string") {
        try {
          setLoading(true);
          const productData = await fetchProductsById(id);
          if (productData) {
            setProduct(productData as Product);
          } else {
            console.log("Product not found");
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadProductDetails();
  }, [id]);

  // Handle checkout action
  const handleCheckout = () => {
    if (!address) {
      Alert.alert("Error", "Please fill in the address.");
      return;
    }

    Alert.alert(
      "Order Confirmed",
      `Your order for "${product?.title}" will be delivered to "${address}" in 3 days.`
    );
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  // Show error message if product is not found
  if (!product) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color={COLORS.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Details */}
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={
              product.imageUrl
                ? { uri: product.imageUrl }
                : require("../../assets/images/placeholder.png")
            }
          />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productPrice}>{product.price} NOK</Text>
        </View>

        {/* Address Input */}
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Delivery Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your delivery address"
            value={address}
            onChangeText={setAddress}
            multiline
          />
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.small,
  },
  headerTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 50,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.large,
  },
  productContainer: {
    alignItems: "center",
    marginBottom: SPACING.large,
  },
  productImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: SPACING.small,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.small,
  },
  productTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  productPrice: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    marginVertical: SPACING.small,
  },
  addressContainer: {
    marginBottom: SPACING.large,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    backgroundColor: COLORS.secondary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: "center",
    marginVertical: SPACING.medium,
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});
