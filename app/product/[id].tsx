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
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";

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
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.noProductText}>No product found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color={COLORS.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={
            product.imageUrl
              ? { uri: product.imageUrl }
              : require("../../assets/images/placeholder.png")
          }
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>{product?.price} NOK</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Buy button pressed")}
          >
            <Text style={styles.buttonText}>Buy this product</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{product?.description}</Text>
          <Text style={styles.sectionTitle}>Condition</Text>
          <Text style={styles.sectionText}>{product?.condition}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "150%",
    backgroundColor: COLORS.accent,
  },
  contentContainer: {
    padding: SPACING.medium,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: FONT_SIZES.large,
    color: COLORS.primary,
    marginVertical: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    borderRadius: BORDER_RADIUS.medium,
    marginTop: SPACING.medium,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "500",
    color: COLORS.textPrimary,
    marginTop: SPACING.large,
  },
  sectionText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    marginTop: SPACING.small,
  },
  noProductText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.medium,
  },
});
