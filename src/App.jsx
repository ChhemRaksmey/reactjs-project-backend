import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";

import PageAdminModules from './pages/admin/PageAdminModules.jsx';
import PageAdminApplications from './pages/admin/PageAdminApplications.jsx';
import PageAdminPrivileges from './pages/admin/PageAdminPrivileges.jsx';
import PageAdminUsers from './pages/admin/PageAdminUsers.jsx';

export default function App() {

  useEffect(() => {
    function blurFocusInsideModal(event) {
      const modal = event.target;
      if (document.activeElement && modal.contains(document.activeElement)) {
        document.activeElement.blur();
      }
    }
    document.addEventListener("hide.bs.modal", blurFocusInsideModal);
    return () => document.removeEventListener("hide.bs.modal", blurFocusInsideModal);
  }, []);

  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />

          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/users"     element={<ProtectedRoute><Users /></ProtectedRoute>} />

          <Route path="/admin/modules"      element={<ProtectedRoute><PageAdminModules /></ProtectedRoute>} />
          <Route path="/admin/applications" element={<ProtectedRoute><PageAdminApplications /></ProtectedRoute>} />
          <Route path="/admin/privileges"   element={<ProtectedRoute><PageAdminPrivileges /></ProtectedRoute>} />
          <Route path="/admin/users"        element={<ProtectedRoute><PageAdminUsers /></ProtectedRoute>} /> */}

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />

            <Route path="/admin/modules" element={<PageAdminModules />} />
            <Route path="/admin/applications" element={<PageAdminApplications />} />
            <Route path="/admin/privileges" element={<PageAdminPrivileges />} />
            <Route path="/admin/users" element={<PageAdminUsers />} />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}