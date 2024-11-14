import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  BORDER_RADIUS,
} from "constants/constants";

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Messages</Text>
      </View>
      <View style={styles.messagesContainer}>
        {["Eirik", "Jeremy", "John", "Kjell Tore"].map((name, index) => (
          <TouchableOpacity key={index} style={styles.messageRow}>
            <Text style={styles.messageText}>{name}</Text>
            <ChevronRightIcon size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
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
  messagesContainer: {
    paddingHorizontal: SPACING.medium,
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
  },
  messageText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
  },
});
