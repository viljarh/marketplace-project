import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signIn,
  signUp,
  signOut,
  onAuthStateChangeListener,
} from "../firebase/firebase";
import { User } from "firebase/auth";

// Define the shape of the AuthContext
interface AuthContextType {
  session: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// Create the AuthContext with an undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useSession must be used within an AuthProvider");
  return context;
};

// SessionProvider component to provide the AuthContext to its children
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to get a user-friendly error message based on the error code
  const getFriendlyErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  // Effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setSession(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Function to handle user sign-in
  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign-up
  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (error: any) {
      const errorMessage = getFriendlyErrorMessage(error.code);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user sign-out
  const handleSignOut = async () => {
    setLoading(true);
    await signOut().catch((error) => {
      console.error("Sign out failed:", error.message);
      throw error;
    });
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};