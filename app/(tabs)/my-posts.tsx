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
import { PencilIcon, TrashIcon } from "react-native-heroicons/outline";
import { Product } from "types/types";
import ProductCard from "components/ProductCard";

// MyPostsScreen component for displaying user's posts
export default function MyPostsScreen() {
  // State variables
  const { session } = useSession();
  const [posts, setPosts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's posts when the component mounts or session changes
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

  // Handle edit post action
  const handleEditPost = (postId: string) => {
    router.push({ pathname: "/edit-post/[id]", params: { id: postId } });
  };

  // Handle delete post action
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
                prevPosts.filter((post) => post.id !== postId)
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
      ]
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Posts</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {posts.length > 0 ? (
          <View style={styles.postsContainer}>
            {posts.map((post) => (
              <View key={post.id} style={styles.postWrapper}>
                <ProductCard product={post} />
                <View style={styles.iconsContainer}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => handleEditPost(post.id)}
                  >
                    <PencilIcon size={18} color={COLORS.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletePost(post.id)}
                  >
                    <TrashIcon size={18} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  headerTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: SPACING.medium,
  },
  postsContainer: {

  },
  postWrapper: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: SPACING.medium,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SPACING.small,
    width: "50%",
  },
  icon: {
    padding: SPACING.small,
    backgroundColor: COLORS.secondary,
    borderRadius: BORDER_RADIUS.small,
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
  productCardImage: {
    height: 220,
    padding: SPACING.small,
    borderRadius: BORDER_RADIUS.small,
    backgroundColor: COLORS.accent, // Fallback color
  },
  editButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: SPACING.small,
    borderRadius: BORDER_RADIUS.small,
    marginRight: SPACING.small,
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: COLORS.error,
    padding: SPACING.small,
    borderRadius: BORDER_RADIUS.small,
    marginLeft: SPACING.small,
    alignItems: "center",
  },
});