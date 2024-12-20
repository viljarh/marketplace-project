import React, { useCallback, useEffect, useState } from "react";
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
import { router } from "expo-router";
import { debounce } from "lodash";
import { Product } from "types/types";

// Index component for the main screen
export default function Index() {
  // State variables
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Debounced search function to filter products based on search query
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      const filteredData = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filteredData);
    }, 300),
    [products]
  );

  // Function to fetch products and categories from Firebase
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      await fetchCategoriesFromProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  // Update filtered products when search query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Show loading indicator while data is being fetched
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              Market<Text style={styles.headerTitleAccent}>Place</Text>
            </Text>
            <BellIcon
              size={24}
              color={COLORS.textSecondary}
              onPress={() => router.push("/notifications")}
            />
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
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Filtered Products List */}
          {searchQuery.length > 0 && filteredProducts.length > 0 && (
            <View style={styles.filteredProductsContainer}>
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.filteredProductItem}
                  onPress={() =>
                    router.push({
                      pathname: "/product/[id]",
                      params: { id: product.id },
                    })
                  }
                >
                  <Text style={styles.filteredProductTitle}>
                    {product.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

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

          {/* Recent Section */}
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent</Text>
          </View>

          {/* Scrollable Recent Items */}
          <View style={styles.recentContainer}>
            {products
              .slice(0, 10)
              .reverse()
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </View>
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
  scrollContainer: {
    paddingBottom: SPACING.medium,
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
  filteredProductsContainer: {
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  filteredProductItem: {
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  filteredProductTitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
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
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    marginBottom: SPACING.small,
  },
  recentTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  seeAll: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
  },
  recentContainer: {
    paddingHorizontal: SPACING.medium,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
