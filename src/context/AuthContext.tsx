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

const ADMIN_LOGIN_API = '/api/login.php';

// The server decides when it is reachable; the local token is only accepted without it (local dev)
async function isAdminSessionValid(token: string | null): Promise<boolean> {
  try {
    const res = await fetch(ADMIN_LOGIN_API, { headers: { 'X-Admin-Token': token || '' }, cache: 'no-store' });
    if (res.ok) return true;
    if (res.status === 401) return false;
  } catch {
    // API unavailable
  }
  return token === ADMIN_SESSION_TOKEN;
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
            if (ADMIN_ROLES.includes(savedUser?.role) && !(await isAdminSessionValid(savedToken))) {
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
    // Admin login is verified by the server (public/api/login.php)
    let serverToken: string | null = null;
    let apiAvailable = false;
    try {
      const res = await fetch(ADMIN_LOGIN_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (res.ok) {
        serverToken = (await res.json()).token || null;
        apiAvailable = true;
      } else if (res.status === 401) {
        apiAvailable = true;
      } else if (res.status === 429) {
        return { success: false, error: 'बहुत अधिक प्रयास — 15 मिनट बाद पुनः प्रयास करें (Too many attempts, try again in 15 minutes)' };
      }
    } catch {
      // API unavailable (local dev without PHP)
    }

    // Without the API (local dev) fall back to the in-browser credential check
    const isAdmin = !!serverToken || (!apiAvailable && (await verifyAdminCredentials(email, pass)));
    const role = isAdmin ? 'SUPER_ADMIN' : 'SEEKER';
    const name = isAdmin ? 'Shubham Tiwari (Super Admin)' : email.split('@')[0] || 'Sanatan Seeker';
    const sessionToken = serverToken || (isAdmin ? ADMIN_SESSION_TOKEN : 'demo-token-108');

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
