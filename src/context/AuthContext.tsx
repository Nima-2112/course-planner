//-------import-------
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { getCurrentUser, loginUser, registerUser } from "../api/authApi";

import type { User } from "../types";

//-------Types-------
type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  authLoading: boolean;

  login: (username: string, password: string) => Promise<void>;

  register: (username: string, password: string) => Promise<void>;

  logout: () => void;
};

//-------Constants-------
const TOKEN_STORAGE_KEY = "coursePlannerToken";

const USER_STORAGE_KEY = "coursePlannerUser";

//-------Context-------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//-------Provider-------
function AuthProvider({ children }: { children: ReactNode }) {
  //-------State-------
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY),
  );

  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      return savedUser ? (JSON.parse(savedUser) as User) : null;
    } catch {
      return null;
    }
  });

  const [authLoading, setAuthLoading] = useState(Boolean(token));

  //-------Restore Session-------
  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!token) {
        if (active) {
          setUser(null);
          setAuthLoading(false);
        }

        return;
      }

      try {
        const currentUser = await getCurrentUser(token);

        if (active) {
          setUser(currentUser);

          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
        }
      } catch {
        if (active) {
          localStorage.removeItem(TOKEN_STORAGE_KEY);

          localStorage.removeItem(USER_STORAGE_KEY);

          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, [token]);

  //-------Login-------
  async function login(username: string, password: string) {
    const result = await loginUser(username.trim(), password);

    localStorage.setItem(TOKEN_STORAGE_KEY, result.token);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));

    setUser(result.user);
    setToken(result.token);
  }

  //-------Register-------
  async function register(username: string, password: string) {
    const result = await registerUser(username.trim(), password);

    localStorage.setItem(TOKEN_STORAGE_KEY, result.token);

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));

    setUser(result.user);
    setToken(result.token);
  }

  //-------Logout-------
  function logout() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    localStorage.removeItem(USER_STORAGE_KEY);

    setToken(null);
    setUser(null);
  }

  //-------Return-------
  return (
    <AuthContext.Provider
      value={{
        user,

        token,

        isLoggedIn: Boolean(user && token),

        authLoading,

        login,

        register,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//-------Custom Hook-------
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

//-------Export-------
export default AuthProvider;
