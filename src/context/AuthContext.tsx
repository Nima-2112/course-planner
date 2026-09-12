//-------import-------
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

//-------Types-------
type User = {
  id: number;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

//-------Constants-------
const AUTH_STORAGE_KEY = "coursePlannerAuth";

//-------Context-------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//-------Provider-------
function AuthProvider({ children }: { children: ReactNode }) {
  //-------State-------
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

      if (!savedAuth) {
        return null;
      }

      const parsed = JSON.parse(savedAuth);

      return parsed.user || null;
    } catch {
      return null;
    }
  });

  //-------Save Authentication-------
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user,
        }),
      );
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  //-------Login-------
  async function login(username: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    localStorage.setItem("coursePlannerToken", data.token);

    setUser(data.user);
  }

  //-------Register-------
  async function register(username: string, password: string) {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed.");
    }

    localStorage.setItem("coursePlannerToken", data.token);

    setUser(data.user);
  }

  //-------Logout-------
  function logout() {
    localStorage.removeItem("coursePlannerToken");
    localStorage.removeItem("coursePlannerAuth");

    setUser(null);
  }

  //-------Return-------
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
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
