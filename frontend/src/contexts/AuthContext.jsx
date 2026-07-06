import { createContext, useEffect, useMemo, useState } from "react";
import { storage } from "../utils/storage";
import { authApi } from "../api/authApi";
import { profileApi } from "../api/profileApi";



export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = storage.getAccessToken();

        if (!token) return;

        const profile = await profileApi.getProfile();

        setUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        storage.clearAuth();

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const authenticate = async (data) => {
    storage.setAccessToken(data.accessToken);
    storage.setRefreshToken(data.refreshToken);

    const profile = await profileApi.getProfile();

    setUser(profile);
    setIsAuthenticated(true);
  };
  
  // login 
  const login = async (credentials) => {
    const data = await authApi.login(credentials);

    await authenticate(data);
  };

  // register
  const register = async (userData) => {
    const data = await authApi.register(userData);

    await authenticate(data);
  };
  // logout
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
    }

    storage.clearAuth();

    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
    }),
    [user, isAuthenticated, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;