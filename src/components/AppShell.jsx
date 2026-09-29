import React, { useEffect } from "react";

import { LayoutAdminNavigation, LayoutAdminSidebar } from '../patials/LayoutAdmin.jsx';

export default function AppShell({ children }) {

    useEffect(() =>
        {
            const $ = window.jQuery;

            if ($ && typeof $.fn.metisMenu === "function") {
                $("#side-menu").metisMenu();
            }

            if (window.Waves) {
                window.Waves.init();
            }

        },
        []
    );

    return (
      <div id="layout-wrapper">

        <LayoutAdminNavigation />

        <LayoutAdminSidebar />

        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">{children}</div>
          </div>
        </div>

      </div>
    );
}
