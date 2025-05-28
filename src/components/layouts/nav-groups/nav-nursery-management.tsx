"use client";

import { useEffect, useState } from "react";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

export function NavNurseryManagement({
  cmLinks,
  activeMemberRole
}: {
  cmLinks: {
    name: string;
    url: string;
    icon: LucideIcon;
    roles?: string[];
  }[];
  activeMemberRole: string;
}) {
  const pathname = usePathname();

  const [access, setAccess] = useState<"owner" | "admin" | string | null>(
    activeMemberRole
  );

  useEffect(() => {
    setAccess(activeMemberRole);
  }, [activeMemberRole]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Nursery Management</SidebarGroupLabel>
      <SidebarMenu>
        {cmLinks.map((item) => {
          const isPublic = !item?.roles;
          const hasAccess = item.roles?.includes(access ?? "");

          if (isPublic || hasAccess)
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={pathname === item.url}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
