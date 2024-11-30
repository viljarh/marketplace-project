import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from "constants/constants";

// NotFoundScreen component for displaying a 404 error message
export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Oops! This screen doesn't exist.</Text>
      <Link href="/" asChild>
        <TouchableOpacity style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Go back home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.large,
  },
  errorText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.error,
    textAlign: "center",
    marginBottom: SPACING.large,
    fontWeight: "600",
  },
  homeButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: "center",
  },
  homeButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});
