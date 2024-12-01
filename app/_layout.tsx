import { Stack } from "expo-router";
import React from "react";
import { SessionProvider } from "./ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

// RootLayout component for providing session and safe area context
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <StatusBar barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="sign-in"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
