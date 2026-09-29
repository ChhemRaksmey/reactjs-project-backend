import React from "react";
import AppShell from "../components/AppShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";


export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AppShell>
      
    </AppShell>
  );
}
