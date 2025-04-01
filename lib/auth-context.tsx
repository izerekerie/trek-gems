"use client";
import apiclient from "@/services/api";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Types
interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  role: "TRAVELER" | "OPERATOR" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    phoneNumber: String,

    role: User["role"]
  ) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      apiclient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
    setLoading(false);
  }, []);

  // Configure axios interceptors for token handling
  useEffect(() => {
    // Request interceptor
    const requestInterceptor = apiclient.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = apiclient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and not already retrying
        if (error.response?.status === 401 && !originalRequest._retry) {
          // Token expired or invalid, log out
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          delete apiclient.defaults.headers.common["Authorization"];
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      apiclient.interceptors.request.eject(requestInterceptor);
      apiclient.interceptors.response.eject(responseInterceptor);
    };
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiclient.post("/auth/login", { email, password });
      const { user, token } = response.data;

      // Save auth state
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);
    } catch (err: any) {
      setError(err.response?.data?.message[0] || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    phoneNumber: String,
    role: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiclient.post("/auth/register", {
        username,
        email,
        password,
        phoneNumber,
        role,
      });
      const { user, token } = response.data;

      // Save auth state
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setToken(token);
    } catch (err: any) {
      setError(err.response?.data?.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear auth state
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    delete apiclient.defaults.headers.common["Authorization"];
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export apiclient instance to be used across the app
