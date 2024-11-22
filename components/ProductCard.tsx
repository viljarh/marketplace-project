import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SPACING } from "constants/constants";
import { Product } from "types/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        router.push({
          pathname: "/product/[id]",
          params: { id: product.id },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            product.imageUrl
              ? { uri: product.imageUrl }
              : require("../assets/images/placeholder.jpg")
          }
        />
      </View>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} NOK</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "48%",
    margin: SPACING.small,
    marginHorizontal: "1%",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  title: {
    marginTop: SPACING.small,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default ProductCard;
