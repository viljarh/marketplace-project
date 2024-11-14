import React, { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
  CATEGORIES,
} from "constants/constants";
import ProductCard from "components/ProductCard";
import { fetchCategoriesFromProducts, fetchProducts } from "firebase/firebase";
import { Product } from "firebase/firebaseTypes";
import { router } from "expo-router";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      await fetchCategoriesFromProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Market<Text style={styles.headerTitleAccent}>Place</Text>
          </Text>
          <BellIcon size={24} color={COLORS.textSecondary} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <MagnifyingGlassIcon size={20} color={COLORS.textSecondary} />
            <TextInput
              autoCapitalize="none"
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={COLORS.textSecondary}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() =>
                router.push({
                  pathname: "/category/[id]",
                  params: { id: category.id },
                })
              }
            >
              <View style={styles.categoryIconContainer}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommended Section */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendedTitle}>Recommended</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>

        {/* Scrollable Recommended Items */}
        <ScrollView contentContainerStyle={styles.recommendedContainer}>
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.medium,
  },
  headerTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  headerTitleAccent: {
    color: COLORS.primary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.small,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.medium,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.small,
  },
  categoryButton: {
    width: "23%",
    alignItems: "center",
    marginBottom: SPACING.medium,
  },
  categoryIconContainer: {
    width: "100%",
    height: 80,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIcon: {
    fontSize: FONT_SIZES.icons,
  },
  categoryName: {
    marginTop: SPACING.small,
    textAlign: "center",
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.small,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.small,
  },
  recommendedTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  recommendedContainer: {
    paddingHorizontal: SPACING.medium,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
