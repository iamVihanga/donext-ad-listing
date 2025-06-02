/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  GraduationCapIcon,
  LayoutDashboard,
  ShieldIcon,
  UserCog2Icon,
  UsersRoundIcon,
  NewspaperIcon
} from "lucide-react";

import { type Session } from "@/lib/auth";
import { NavMain } from "@/components/layouts/nav-groups/nav-main";
import { NavOrgManagement } from "./nav-groups/nav-org-management";
import { NavContent } from "./nav-groups/nav-content";
import { NavSettings } from "./nav-groups/nav-settings";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Props = {
  activeMember: any;
  session: Session;
};

export default function AppSidebarContent({ activeMember, session }: Props) {
  const activeOrganization = authClient.useActiveOrganization();
  const router = useRouter();

  useEffect(() => {
    if (activeOrganization) router.refresh();
  }, [activeOrganization]);

  const data = {
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise"
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup"
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free"
      }
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard
      },
      {
        title: "Organizations",
        url: "/dashboard/organizations",
        icon: UsersRoundIcon
      }
    ],
    agentManagement: [
      {
        name: "Admins", // Agent Admins
        url: "/dashboard/admins",
        icon: ShieldIcon,
        roles: ["owner"] // owner -> agent admin
      },
      {
        name: "Managers", // Agent Managers
        url: "/dashboard/managers",
        icon: GraduationCapIcon,
        roles: ["owner"] // owner -> agent manager
      }
      // {
      //   name: "Parents",
      //   url: "/dashboard/parents",
      //   icon: UsersIcon,
      //   roles: ["admin", "owner"]
      // }
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getContents: (isAdmin: boolean) => [
      {
        title: "Ads",
        url: "/dashboard/ads",
        icon: NewspaperIcon,
        roles: ["owner", "admin", "member"]
      }
    ],
    getSettings: (isAdmin: boolean) => [
      ...(isAdmin
        ? [
            {
              title: "User Management",
              url: "/dashboard/user-management",
              icon: UserCog2Icon
            }
          ]
        : []),
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "/dashboard/settings"
          }
        ]
      }
    ]
  };

  return (
    <>
      <NavMain items={data.navMain} />

      {activeOrganization.data && activeMember?.role !== "member" && (
        <NavOrgManagement
          cmLinks={data.agentManagement}
          activeMemberRole={activeMember?.role || null}
        />
      )}

      <NavContent
        items={data.getContents(
          activeMember?.role === "owner" || activeMember?.role === "admin"
        )}
      />

      <NavSettings items={data.getSettings(session.user.role === "admin")} />
    </>
  );
}
