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
import { Product } from "../../firebase/firebaseTypes";
import { fetchProductByCategory } from "firebase/firebase";
import ProductCard from "components/ProductCard";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";

export default function CategoryFeed() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const categoryId = params.id as string;
  const categoryName = params.categoryName as string | undefined;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductByCategory(categoryId as string);
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

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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

        {products.length > 0 ? (
          <ScrollView contentContainerStyle={styles.productListContainer}>
            {products.map((product) => (
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
          snapPoints={["70%"]}
          onChange={handleSheetChanges}
          backdropComponent={(props) => (
            <BottomSheetBackdrop {...props} pressBehavior="close" />
          )}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={styles.modalText}>Filter Options</Text>
            {/* Add filter options here */}
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
});
