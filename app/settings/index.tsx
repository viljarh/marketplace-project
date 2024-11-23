import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { reauthenticateUser, updateUserPassword } from "firebase/firebase";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { router } from "expo-router";

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpdatePassword = async () => {
    if (!newPassword) {
      Alert.alert("Validation Error", "Please enter a new password.");
      return;
    }

    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update your password?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              setLoading(true);
              await reauthenticateUser(currentPassword);
              await updateUserPassword(newPassword);
              Alert.alert(
                "Success",
                "Your password has been updated successfully.",
              );
              router.back();
            } catch (error) {
              Alert.alert(
                "Error",
                "Failed to update password. Please try again.",
              );
              console.error(error);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Update Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={[
            styles.button,
            !newPassword || !currentPassword ? styles.disabledButton : null,
          ]}
          onPress={handleUpdatePassword}
          disabled={!newPassword || !currentPassword || loading}
        >
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    fontSize: FONT_SIZES.medium,
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
    padding: SPACING.medium,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    marginBottom: SPACING.small,
    color: COLORS.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.small,
    marginBottom: SPACING.small,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: BORDER_RADIUS.medium,
    marginVertical: SPACING.small,
  },
  disabledButton: {
    backgroundColor: COLORS.accent,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
