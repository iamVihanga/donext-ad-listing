import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

type Props = {
  children?: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Modify with conditional classes based on scroll state */}
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
