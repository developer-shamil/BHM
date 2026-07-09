/**
 * src/components/ProtectedRoute.jsx
 * 
 * Wraps a route and:
 *  1. Redirects to /login if not authenticated
 *  2. Redirects to the user's own home if they try to access another role's page
 */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../data/mockUsers';

/** Map each role to its home route */
export const ROLE_HOME = {
  [ROLES.PRINCIPAL]:  '/principal',
  [ROLES.TEACHER]:    '/teacher',
  [ROLES.BUS_DRIVER]: '/bus',
  [ROLES.STUDENT]:    '/student',
};

/**
 * @param {string|string[]} allowedRoles – which role(s) may enter this route
 * @param {ReactNode} children
 */
const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  // Not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  // Wrong role → redirect to their own home
  if (!allowed.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
