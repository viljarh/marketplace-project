import React from "react";
import { useSession } from "app/ctx";
import { router } from "expo-router";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  DocumentIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT_SIZES, SPACING } from "constants/constants";

// ProfileScreen component for displaying user's profile and menu options
export default function ProfileScreen() {
  const { session, signOut } = useSession();

  // Handle sign out action
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userInfoContainer}>
          <UserCircleIcon size={64} color={COLORS.primary} />
          <Text style={styles.userName}>{session?.email || "User"}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/my-posts")}
          >
            <Text style={styles.menuText}>My Posts</Text>
            <DocumentIcon size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            style={styles.menuItem}
          >
            <Text style={styles.menuText}>Settings</Text>
            <Cog6ToothIcon size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
          <ArrowRightEndOnRectangleIcon size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>
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
  scrollContainer: {
    paddingHorizontal: SPACING.medium,
  },
  userInfoContainer: {
    alignItems: "center",
    marginVertical: SPACING.large,
  },
  userName: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: SPACING.small,
  },
  menuContainer: {
    paddingHorizontal: SPACING.medium,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  menuText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  logoutText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});
