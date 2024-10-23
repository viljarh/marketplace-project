import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      const user = null;
      setSession(user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signIn = () => {
    setSession({ user: "testUser" });
  };

  const signOut = () => {
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
