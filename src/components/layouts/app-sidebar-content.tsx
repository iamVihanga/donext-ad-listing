/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  GraduationCapIcon,
  UsersIcon,
  LayoutDashboard,
  ShieldIcon,
  UserCog2Icon,
  School2Icon,
  SmileIcon,
  School,
  FileBadge2Icon,
  BadgeAlert
} from "lucide-react";

import { type Session } from "@/lib/auth";
import { NavMain } from "@/components/layouts/nav-groups/nav-main";
import { NavNurseryManagement } from "./nav-groups/nav-nursery-management";
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
        title: "Nurseries",
        url: "/dashboard/nurseries",
        icon: School2Icon
      }
    ],
    nurseryManagement: [
      {
        name: "Admins", // Nursery Admins
        url: "/dashboard/admins",
        icon: ShieldIcon,
        roles: ["owner"] // owner -> nursery admin
      },
      {
        name: "Teachers", // Nursery Teachers
        url: "/dashboard/teachers",
        icon: GraduationCapIcon,
        roles: ["owner"] // owner -> nursery admin
      },
      {
        name: "Parents",
        url: "/dashboard/parents",
        icon: UsersIcon,
        roles: ["admin", "owner"]
      }
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getContents: (isAdmin: boolean) => [
      {
        title: "Children",
        url: "/dashboard/children",
        icon: SmileIcon,
        roles: ["owner", "admin", "member"]
      },
      {
        title: "Classes",
        url: "/dashboard/classes",
        icon: School,
        roles: ["owner", "admin"]
      },
      {
        title: "Badges",
        url: "/dashboard/badges",
        icon: FileBadge2Icon,
        roles: ["owner", "admin"]
      },
      {
        title: "Feedbacks",
        url: "/dashboard/feedbacks",
        icon: BadgeAlert,
        roles: ["owner", "admin"]
      }
      // {
      //   title: "Materials",
      //   url: "/dashboard/materials",
      //   icon: LibraryBigIcon
      // },
      // {
      //   title: "Quizzes",
      //   url: "/dashboard/quizzes",
      //   icon: FileQuestionIcon,
      //   items: [
      //     {
      //       title: "All Quizzes",
      //       url: "/dashboard/quizzes"
      //     },
      //     ...(isAdmin
      //       ? [
      //           {
      //             title: "Categories",
      //             url: "/dashboard/quizzes/tags"
      //           }
      //         ]
      //       : [])
      //   ]
      // }
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
        <NavNurseryManagement
          cmLinks={data.nurseryManagement}
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
