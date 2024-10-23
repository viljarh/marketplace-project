import { Stack } from "expo-router";
import React from "react";
import { SessionProvider } from "./ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
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
