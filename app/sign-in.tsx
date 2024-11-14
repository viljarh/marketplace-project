import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useSession } from "./ctx";
import { router } from "expo-router";
import Icon from 'react-native-vector-icons/Ionicons';

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
      setError("Failed to sign in");
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.replace("/");
    } catch (err) {
      setError("Failed to sign up");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
      <Icon name="mail-outline" size={25} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      </View>
      <View style={styles.inputContainer}>
      <Icon name="lock-closed-outline" size={25} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity 
      style={styles.button}
      onPress={handleSignIn}
      disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Login"}</Text>

      </TouchableOpacity>
      {error && <Button title="Sign Up" onPress={handleSignUp} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  signUp: {
    color: '#000',
  },
  signUpLink: {
    color: '#1E90FF',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    color: '#000',
  },
});
