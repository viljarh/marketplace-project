import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged((user) => {
      setSession(user);
      setLoading(false);
    })
    return () => unsubscribe;
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      await firebaseSignIn(email, password);
    } catch (error) {
      console.error("Sign in failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      await firebaseSignUp(email, password);
    } catch (error) {
      console.error("Sign up failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign out failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
