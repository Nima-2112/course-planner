import { createContext, useEffect, useState } from "react";

import type { User, AuthContextType } from "../interfaces/Auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === "admin" && password === "123456") {
      const loggedUser: User = {
        username: "admin",
        email: "admin@example.com",
      };

      setUser(loggedUser);

      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("loggedUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
