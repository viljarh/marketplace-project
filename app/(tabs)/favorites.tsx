import React, { useState, useEffect} from "react";
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "firebase/firebase";
import { doc, getDocs, collection, query, where } from "firebase/firestore";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from "constants/constants";

interface FavoriteProduct {
  id: string;
  userId: string;
  productId: string;
  title: string;
  imageUrl: string;
  price: string;
}


export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return;
      }

      try {
        const userId = currentUser.uid;

        const q = query(
          collection(db, "favorites"),
          where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);

        const fetchedFavorites: FavoriteProduct[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, 
            userId: data.userId,
            productId: data.productId,
            title: data.title,
            imageUrl: data.imageUrl,
            price: data.price,
          };
        });

        setFavorites(fetchedFavorites);

      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if(loading){
    return(
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorites</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {favorites.length === 0 ? (
          <Text>No favorites found</Text>
        ) : (
          favorites.map((favorite) => (
            <View key={favorite.id} style={styles.itemWrapper}>
              <TouchableOpacity onPress={() => {/* Navigate to product details */}}>
                <View style={styles.itemBox}>
                  <Image
                    source={{ uri: favorite.imageUrl }}
                    style={{ width: "100%", height: 120, borderRadius: BORDER_RADIUS.medium }}
                  />
                </View>
                <View style={styles.favoriteDetails}>
                  <Text style={styles.title}>{favorite.title}</Text>
                  <Text style={styles.price}>{favorite.price}</Text>
              </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    marginBottom: SPACING.medium,
  },
  headerText: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  scrollViewContainer: {
    paddingHorizontal: SPACING.medium,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  itemWrapper: {
    width: "48%",
    padding: SPACING.small,
    marginBottom: SPACING.small,
  },
  itemBox: {
    width: "100%",
    height: 160,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.small,
  },

  favoriteDetails:{
    marginTop: SPACING.small,
    paddingHorizontal: SPACING.small,
  },

  image: {
    width: "100%",
    height: 100,
    borderRadius: BORDER_RADIUS.medium,
    marginBottom: SPACING.small,
  },
  title: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: SPACING.small,
  },
  price: {
    fontSize: FONT_SIZES.small,
    fontWeight: "400",
    color: COLORS.textSecondary,
  },
});
