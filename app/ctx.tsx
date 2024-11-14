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

interface AuthContextType {
  session: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useSession must be used within an AuthProvider");
  return context;
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      setSession(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setLoading(false);  
    }
  };
  
  const handleSignUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signUp(email, password);
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);  
    }
  };

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
