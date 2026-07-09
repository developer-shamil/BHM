import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './data/mockUsers';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentPage from './pages/StudentPage';
import BusDriverPage from './pages/BusDriverPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes by Role */}
          <Route
            path="/principal"
            element={
              <ProtectedRoute allowedRoles={ROLES.PRINCIPAL}>
                <PrincipalDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={ROLES.TEACHER}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={ROLES.STUDENT}>
                <StudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bus"
            element={
              <ProtectedRoute allowedRoles={ROLES.BUS_DRIVER}>
                <BusDriverPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
