import React, { createContext, useContext, useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoadingPublicSettings(false);
        
        try {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
          setAuthError(null);
        } catch (error) {
          // User not authenticated - this is fine for public apps
          setUser(null);
          setAuthError(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthError({ type: 'auth_error', message: error.message });
      } finally {
        setIsLoadingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const navigateToLogin = () => {
    base44.auth.redirectToLogin(window.location.pathname);
  };

  const logout = async () => {
    await base44.auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      navigateToLogin,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}