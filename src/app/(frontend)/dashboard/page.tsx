import React from "react";

import { SignoutButton } from "@/features/auth/components/signout-button";

export default function DashboardPage() {
  return (
    <div>
      <h2>Dashboard</h2>
      <SignoutButton />
    </div>
  );
}
