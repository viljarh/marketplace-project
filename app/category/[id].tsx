import React, { useCallback, useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ChevronLeftIcon, FunnelIcon } from "react-native-heroicons/outline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchProductByCategory } from "firebase/firebase";
import ProductCard from "components/ProductCard";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";
import { Timestamp } from "firebase/firestore";
import { Product } from "types/types";

export default function CategoryFeed() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const params = useLocalSearchParams();
  const categoryId = params.id as string;
  // const categoryName = params.categoryName as string | undefined;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductByCategory(categoryId as string);
        setProducts(data);
        setFilteredProducts(data);
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

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const applyFilter = (filterType: string) => {
    setFilter(filterType);
    bottomSheetRef.current?.close();

    const sortedProducts = [...products];
    switch (filterType) {
      case "newest":
        sortedProducts.sort((a, b) => {
          const dateA =
            a.createdAt instanceof Timestamp
              ? a.createdAt.toDate().getTime()
              : a.createdAt instanceof Date
                ? a.createdAt.getTime()
                : 0;
          const dateB =
            b.createdAt instanceof Timestamp
              ? b.createdAt.toDate().getTime()
              : b.createdAt instanceof Date
                ? b.createdAt.getTime()
                : 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        sortedProducts.sort((a, b) => {
          const dateA =
            a.createdAt instanceof Timestamp
              ? a.createdAt.toDate().getTime()
              : a.createdAt instanceof Date
                ? a.createdAt.getTime()
                : 0;
          const dateB =
            b.createdAt instanceof Timestamp
              ? b.createdAt.toDate().getTime()
              : b.createdAt instanceof Date
                ? b.createdAt.getTime()
                : 0;
          return dateA - dateB;
        });
        break;
      case "mostExpensive":
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price),
        );
        break;
      case "leastExpensive":
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price),
        );
        break;
      case "condition":
        sortedProducts.sort((a, b) => a.condition.localeCompare(b.condition));
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeftIcon size={20} color={COLORS.textSecondary} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openBottomSheet}>
            <FunnelIcon size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {filteredProducts.length > 0 ? (
          <ScrollView contentContainerStyle={styles.productListContainer}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No products found in this category.
            </Text>
          </View>
        )}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["40%"]}
          onChange={handleSheetChanges}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} pressBehavior="close" />
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.modalText}>Filter Options</Text>
            <TouchableOpacity onPress={() => applyFilter("newest")}>
              <Text style={styles.filterOption}>Newest First</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => applyFilter("oldest")}>
              <Text style={styles.filterOption}>Oldest First</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => applyFilter("mostExpensive")}>
              <Text style={styles.filterOption}>Most Expensive</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => applyFilter("leastExpensive")}>
              <Text style={styles.filterOption}>Least Expensive</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => applyFilter("condition")}>
              <Text style={styles.filterOption}>Condition</Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    marginBottom: SPACING.medium,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.small,
  },
  searchContainer: {
    marginHorizontal: SPACING.medium,
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
    marginLeft: SPACING.small,
    flex: 1,
    color: COLORS.textPrimary,
  },
  categoryName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: SPACING.small,
  },
  productListContainer: {
    paddingHorizontal: SPACING.medium,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textSecondary,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.large,
    alignItems: "center",
  },
  modalText: {
    marginBottom: SPACING.small,
    textAlign: "center",
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
  },
  filterOption: {
    padding: SPACING.medium,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
});
