import { View, Text, Button } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useSession } from "./ctx";

export default function SignIn() {
  const { signIn } = useSession();

  const handleSignIn = () => {
    if (typeof signIn === 'function') {
      signIn()
      router.replace("/")
    } else {
      console.log('sign in is not a function')
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign In</Text>
      <Button
        title="Sign In"
        onPress={handleSignIn}
      />
    </View>
  );
}
