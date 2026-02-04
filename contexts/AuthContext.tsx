import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';
import { User } from 'firebase/auth';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthChange,
  getUserProfile,
  getPurchaseHistory,
  recordPurchase,
  PurchaseRecord,
  UserProfile,
} from '@/services/firebase';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  recordPurchase: (purchase: PurchaseRecord) => Promise<{ success: boolean; purchaseId?: string; error?: string }>;
  getPurchaseHistory: () => Promise<any[]>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set up auth state listener
  useEffect(() => {
    if (Platform.OS === 'web') {
      const unsubscribe = onAuthChange(async (authUser) => {
        setUser(authUser);
        
        if (authUser) {
          // Load user profile
          const profileResult = await getUserProfile(authUser.uid);
          if (profileResult.success) {
            setUserProfile(profileResult.user as UserProfile);
          }
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const register = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const result = await registerUser(email, password);
    setIsLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Registration failed');
    }
    
    return result;
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const result = await loginUser(email, password);
    setIsLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Login failed');
    }
    
    return result;
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    const result = await logoutUser();
    setIsLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Logout failed');
    }
    
    return result;
  };

  const recordUserPurchase = async (purchase: PurchaseRecord) => {
    const result = await recordPurchase(purchase);
    
    if (result.success && user) {
      // Refresh user profile
      const profileResult = await getUserProfile(user.uid);
      if (profileResult.success) {
        setUserProfile(profileResult.user as UserProfile);
      }
    }
    
    return result;
  };

  const getUserPurchaseHistory = async () => {
    if (!user) return [];
    
    const result = await getPurchaseHistory(user.uid);
    return result.success ? result.purchases : [];
  };

  const refreshProfile = async () => {
    if (!user) return;
    
    const profileResult = await getUserProfile(user.uid);
    if (profileResult.success) {
      setUserProfile(profileResult.user as UserProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAuthenticated: !!user,
        isLoading,
        error,
        register,
        login,
        logout,
        recordPurchase: recordUserPurchase,
        getPurchaseHistory: getUserPurchaseHistory,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
