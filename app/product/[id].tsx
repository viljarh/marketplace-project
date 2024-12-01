import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  checkIfFavorited,
  fetchProductsById,
  toggleFavoriteProduct,
  fetchUserById,
} from "firebase/firebase";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Product } from "types/types";

// ProductDetails component for displaying product details
export default function ProductDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Handle favorite toggle action
  const handleFavoriteToggle = async () => {
    try {
      if (product?.id) {
        const updatedFavoriteStatus = await toggleFavoriteProduct(product.id);
        setIsFavorited(updatedFavoriteStatus);
      }
    } catch (error) {
      console.log("Error updating favorites", error);
      Alert.alert("Failed to update favorites. Please try again.");
    }
  };

  // Fetch product details when the component mounts or ID changes
  useEffect(() => {
    if (typeof id === "string") {
      fetchProductsById(id).then(async (data) => {
        if (data) {
          const productData = data as Product;
          setProduct(productData);

          try {
            const isFavorite = await checkIfFavorited(id);
            setIsFavorited(isFavorite);
          } catch (error) {
            console.log("Error checking favorite status: ", error);
          }

          try {
            const userData = await fetchUserById(productData.userId);
            if (userData) {
              setUser(userData);
            } else {
              console.log("User not found for userId:", productData.userId);
            }
          } catch (error) {
            console.log("Error fetching user data:", error);
          }
        }
        setLoading(false);
      });
    }
  }, [id]);

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
    console.log("Product not found", product);
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

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <TouchableOpacity onPress={toggleModal}>
          <Image
            style={styles.image}
            source={
              product.imageUrl
                ? { uri: product.imageUrl }
                : require("../../assets/images/placeholder.png")
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoriteToggle}
        >
          <MaterialIcons
            name="favorite"
            size={30}
            color={isFavorited ? "red" : "gray"}
          />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{product.price} NOK</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(`/checkout/${product.id}`)}
          >
            <Text style={styles.buttonText}>Buy this product</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.sectionText}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Condition</Text>
          <Text style={styles.sectionText}>{product.condition}</Text>

          <Text style={styles.sectionTitle}>Published by</Text>
          {user ? (
            <Text style={styles.sectionText}>{user.email}</Text>
          ) : (
            <Text style={styles.sectionText}>User not found</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={toggleModal}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image
            style={styles.modalImage}
            source={
              product.imageUrl
                ? { uri: product.imageUrl }
                : require("../../assets/images/placeholder.png")
            }
          />
        </View>
      </Modal>
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
  publisher: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.small,
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
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "contain",
    marginBottom: 10,
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalImage: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },

  modalCloseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
  },

  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },

  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
    zIndex: 10,
  },
  scrollContentContainer: {
    paddingBottom: 80,
  },
});

