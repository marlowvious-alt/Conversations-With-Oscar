import { createContext, useContext } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider
      value={{
        user: { name: "Guest" },
        loading: false,
        signUp: async () => {},
        signIn: async () => {},
        signOut: async () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
