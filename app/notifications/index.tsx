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

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "New iPhone 16 Added", time: "2 min ago" },
    { id: 2, message: "Table", time: "5 min ago" },
    { id: 3, message: "Washing machine", time: "2 hours ago" },
    { id: 4, message: "Sofa", time: "Yesterday" },
    { id: 5, message: "Clothes", time: "4 weeks ago" },
    { id: 6, message: "Old mobile", time: "Last year" },
    { id: 7, message: "Computer added", time: "Two years ago" },
  ];
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
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <Text style={styles.notificationMessage}>
              {notification.message}
            </Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
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
