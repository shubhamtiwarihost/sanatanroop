'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_ROLES, ADMIN_SESSION_TOKEN, verifyAdminCredentials } from '@/lib/adminAuth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  preferredLocale: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string; role?: string }>;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        if (typeof window !== 'undefined') {
          const localSaved = localStorage.getItem('sanatan_auth_user');
          if (localSaved) {
            const savedUser = JSON.parse(localSaved);
            const savedToken = localStorage.getItem('auth_token');
            // Admin sessions are only valid if created by a verified admin login
            if (ADMIN_ROLES.includes(savedUser?.role) && savedToken !== ADMIN_SESSION_TOKEN) {
              localStorage.removeItem('sanatan_auth_user');
              localStorage.removeItem('auth_token');
              setIsLoading(false);
              return;
            }
            setUser(savedUser);
            setToken(savedToken || 'demo-token');
            setIsLoading(false);
            return;
          }
        }
        const hasToken =
          (typeof document !== 'undefined' && document.cookie.includes('auth_token=')) ||
          (typeof window !== 'undefined' && localStorage.getItem('auth_token'));
        if (!hasToken) {
          setIsLoading(false);
          return;
        }
        const res = await fetch('/api/v1/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch {
        // Network or static export fallback
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('sanatan_auth_user', JSON.stringify(data.user));
          localStorage.setItem('auth_token', data.token);
        }
        return { success: true, role: data.user?.role };
      }
    } catch {
      // Backend route unavailable in static mode
    }

    // Static mode fallback login: admin role only for verified admin credentials
    const isAdmin = await verifyAdminCredentials(email, pass);
    const role = isAdmin ? 'SUPER_ADMIN' : 'SEEKER';
    const name = isAdmin ? 'Shubham Tiwari (Super Admin)' : email.split('@')[0] || 'Sanatan Seeker';
    const sessionToken = isAdmin ? ADMIN_SESSION_TOKEN : 'demo-token-108';

    const mockUser: AuthUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      preferredLocale: 'hi',
    };

    setUser(mockUser);
    setToken(sessionToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanatan_auth_user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', sessionToken);
    }
    return { success: true, role };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sanatan_auth_user');
      localStorage.removeItem('auth_token');
    }
    document.cookie = 'auth_token=; path=/; max-age=0';
  };

  const hasRole = (roles: string[]) => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
