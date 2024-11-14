import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { useSession } from "./ctx";
import { router } from "expo-router";

export default function SignIn() {
  const { signIn, signUp, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    
    try {
      await signIn(email, password);
      router.replace("/");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.replace("/");
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const handleFirebaseError = (err: any) => {
    let message;
    switch (err.code) {
      case "auth/invalid-credential":
        message = "The provided credentials are invalid. Please try again.";
        break;
      case "auth/user-not-found":
        message = "No user found with this email.";
        break;
      case "auth/wrong-password":
        message = "The password is incorrect. Please try again.";
        break;
      case "auth/too-many-requests":
        message = "Too many attempts. Please try again later.";
        break;
      case "auth/invalid-email":
        message = "The email address is not valid.";
        break;
      default:
        message = "Failed to sign in. Please try again.";
    }
    setError(message);
    Alert.alert("Error", message, [{ text: "OK", onPress: () => setError(null) }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(null);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(null);
        }}
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button
        title={loading ? "Loading..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
      />
      <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
