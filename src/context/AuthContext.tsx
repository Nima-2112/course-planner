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
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

//-------Context-------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//-------Props-------
type Props = {
  children: ReactNode;
};

//-------Provider-------
export function AuthProvider({ children }: Props) {
  //-------State-------
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //-------Restore Session-------
  useEffect(() => {
    const savedToken = localStorage.getItem("course_planner_token");
    const savedUser = localStorage.getItem("course_planner_user");

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("course_planner_token");
        localStorage.removeItem("course_planner_user");
      }
    }

    setIsLoading(false);
  }, []);

  //-------Login-------
  const login = async (username: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
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

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("course_planner_token", data.token);
    localStorage.setItem("course_planner_user", JSON.stringify(data.user));
  };

  //-------Register-------
  const register = async (username: string, password: string) => {
    const response = await fetch("http://localhost:5000/api/auth/register", {
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

    setUser(data.user);
    setToken(data.token);

    localStorage.setItem("course_planner_token", data.token);
    localStorage.setItem("course_planner_user", JSON.stringify(data.user));
  };

  //-------Logout-------
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("course_planner_token");
    localStorage.removeItem("course_planner_user");
  };

  //-------Context Value-------
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//-------Hook-------
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
