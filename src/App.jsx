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


import PageAmlRiskLevel         from './pages/aml/PageAmlRiskLevel.jsx';
import PageAmlRiskCountry       from './pages/aml/PageAmlRiskCountry.jsx';
import PageAmlResourceLocal     from './pages/aml/PageAmlResourceLocal.jsx';
import PageAmlResourceOversea   from './pages/aml/PageAmlResourceOversea.jsx';
import PageAmlDetectionRoles    from './pages/aml/PageAmlDetectionRoles.jsx';
import PageAmlOnBoardScanning   from './pages/aml/PageAmlOnBoardScanning.jsx';
import PageAmlSanctionListBlack from './pages/aml/PageAmlSanctionListBlack.jsx';
import PageAmlSanctionListWatch from './pages/aml/PageAmlSanctionListWatch.jsx';
import PageAmlSanctionListWhite from './pages/aml/PageAmlSanctionListWhite.jsx';
import PageAmlDetectedRoles     from './pages/aml/PageAmlDetectedRoles.jsx';


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

          <Route element={<ProtectedRoute />}>

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />

            <Route path="/admin/modules"      element={<PageAdminModules />} />
            <Route path="/admin/applications" element={<PageAdminApplications />} />
            <Route path="/admin/privileges"   element={<PageAdminPrivileges />} />
            <Route path="/admin/users"        element={<PageAdminUsers />} />


            <Route path="/aml/risk-level"          element={<PageAmlRiskLevel />} />
            <Route path="/aml/risk-country"        element={<PageAmlRiskCountry />} />
            <Route path="/aml/resource-local"      element={<PageAmlResourceLocal />} />
            <Route path="/aml/resource-oversea"    element={<PageAmlResourceOversea />} />
            <Route path="/aml/detection-roles"     element={<PageAmlDetectionRoles />} />
            <Route path="/aml/onboard-scanning"    element={<PageAmlOnBoardScanning />} />
            <Route path="/aml/sanction/list-black" element={<PageAmlSanctionListBlack />} />
            <Route path="/aml/sanction/list-watch" element={<PageAmlSanctionListWatch />} />
            <Route path="/aml/sanction/list-white" element={<PageAmlSanctionListWhite />} />
            <Route path="/aml/detected-roles"      element={<PageAmlDetectedRoles />} />

          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}