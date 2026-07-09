/**
 * src/context/AuthContext.jsx
 * 
 * Provides authentication state and helpers throughout the app.
 * Uses sessionStorage so login persists across hot-reloads but
 * clears when the browser tab is closed (good for a school app).
 */
import React, { createContext, useContext, useState, useCallback } from 'react';
import { authenticate } from '../data/mockUsers';

const AuthContext = createContext(null);

// ── Helper: persist / restore from sessionStorage ──────────────
const SESSION_KEY = 'bhm_auth_user';

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  if (user) sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else sessionStorage.removeItem(SESSION_KEY);
}

// ── Provider ───────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  /** Returns the user object on success, or an error string on failure */
  const login = useCallback((username, password) => {
    const found = authenticate(username, password);
    if (!found) return 'Invalid username or password.';
    // Strip password before storing
    const safe = { ...found, password: undefined };
    setUser(safe);
    writeSession(safe);
    return null; // null = no error
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook — throws if used outside AuthProvider */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
