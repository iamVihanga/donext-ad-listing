import React from "react";
import { headers } from "next/headers";
import { Toaster } from "sonner";

import { auth } from "@/lib/auth";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { LayoutBreadcrumb } from "@/components/layouts/layout-breadcrumb";

type Props = {
  children: React.ReactNode;
};

export default async function AuthLayout({ children }: Props) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <>
      <Toaster theme="system" position="bottom-right" />

      <SidebarProvider>
        <AppSidebar session={session!} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              <LayoutBreadcrumb />
            </div>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
