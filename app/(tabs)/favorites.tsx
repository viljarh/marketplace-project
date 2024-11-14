import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from "constants/constants";

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Favorites</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={styles.itemWrapper}>
            <View style={styles.itemBox} />
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
  },
});
