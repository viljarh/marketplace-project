import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZES,
  SPACING,
} from "constants/constants";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    { id: string; message: string; time: string }[]
  >([]);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          message: `${data.title || "New Product"}`,
          time: getTimeAgo(data.createdAt?.toDate() || new Date()),
        };
      });

      setNotifications(updatedNotifications);
    });

    return () => unsubscribe(); 
  }, []);

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeftIcon size={20} color={COLORS.textSecondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Newly Added</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationMessage}>
              {notification.message}
            </Text>
            <Text style={styles.notificationTime}>
              {notification.time}
            </Text>
          </View>
        ))}
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
  scrollContainer: {
    padding: SPACING.medium,
  },
  notificationCard: {
    backgroundColor: "#ECECEC",
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.medium,
    marginBottom: SPACING.small,
  },
  notificationMessage: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  notificationTime: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SPACING.small,
  },
});
