import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSession } from "app/ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";
import { deletePostById, fetchPostsByUser } from "firebase/firebase";
import { router } from "expo-router";
import {
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon,
} from "react-native-heroicons/outline";
import { Product } from "types/types";
import ProductCard from "components/ProductCard";

export default function MyPostsScreen() {
  const { session } = useSession();
  const [posts, setPosts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserPosts = async () => {
      if (session) {
        try {
          setLoading(true);
          const userPosts = await fetchPostsByUser(session.uid);
          setPosts(userPosts);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserPosts();
  }, [session]);

  const handleEditPost = (postId: string) => {
    router.push({ pathname: "/edit-post/[id]", params: { id: postId } });
  };

  const handleDeletePost = async (postId: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await deletePostById(postId);
              setPosts((prevPosts) =>
                prevPosts.filter((post) => post.id !== postId),
              );
              Alert.alert("Success", "Post deleted successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to delete post. Please try again.");
              console.error("Error deleting post:", error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Posts</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.cardWrapper}>
                {/* Product Card */}
                <ProductCard product={post} />
                {/* Edit and Delete Buttons Overlaid */}
                <View style={styles.actionsOverlay}>
                  <TouchableOpacity onPress={() => handleEditPost(post.id)}>
                    <View style={styles.actionIcon}>
                      <PencilIcon size={18} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeletePost(post.id)}>
                    <View style={styles.actionIcon}>
                      <TrashIcon size={18} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven’t posted anything yet.
            </Text>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  postContainer: {
    width: "48%",
    marginBottom: SPACING.large,
  },
  cardWrapper: {
    position: "relative",
  },
  actionsOverlay: {
    position: "absolute",
    top: SPACING.small,
    right: SPACING.small,
    flexDirection: "row",
    gap: SPACING.small,
  },
  actionIcon: {
    backgroundColor: COLORS.primary,
    padding: SPACING.small / 2,
    borderRadius: BORDER_RADIUS.small,
    opacity: 0.8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.large,
  },
  emptyText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
});
