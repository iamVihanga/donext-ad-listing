"use client";

import React, { useId, useState, useEffect } from "react";
import { ChevronsUpDown, CogIcon, GraduationCap } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Skeleton } from "@/components/ui/skeleton";

export function NurserySwitcher() {
  const toastId = useId();
  const { isMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  const { data: activeNursery, isPending: isPendingActiveNursery } =
    authClient.useActiveOrganization();
  const { data: allNurseries, isPending: isPendingAllNurseries } =
    authClient.useListOrganizations();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after hydration
  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex w-full items-center gap-2 p-2">
            <Skeleton className="aspect-square size-8 rounded-lg" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
            </div>
            <Skeleton className="size-4" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const handleSetActiveNursery = async (id: string) => {
    await authClient.organization.setActive(
      {
        organizationId: id
      },
      {
        onRequest() {
          toast.loading("Switching nursery...", { id: toastId });
        },
        onSuccess() {
          toast.success("Switched to nursery successfully!", { id: toastId });
        },
        onError({ error }) {
          toast.error(error.message || "Failed to switch nursery", {
            id: toastId
          });
        }
      }
    );
  };

  const renderActiveClassContent = () => {
    if (isPendingActiveNursery) {
      return (
        <div className="flex w-full items-center gap-2 p-2">
          <Skeleton className="aspect-square size-8 rounded-lg" />
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <Skeleton className="size-4" />
        </div>
      );
    }

    if (!activeNursery) {
      return (
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GraduationCap className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Select a nursery</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      );
    }

    return (
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        {activeNursery?.logo ? (
          <Image
            alt={activeNursery.name}
            src={activeNursery.logo}
            width={50}
            height={50}
            className="flex aspect-square size-8 rounded-lg object-cover"
          />
        ) : (
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            {activeNursery?.name.slice(0, 2)}
          </div>
        )}

        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeNursery?.name}</span>
          <span className="truncate text-xs text-foreground/60">
            {activeNursery?.metadata &&
              JSON.parse(activeNursery?.metadata)?.description}
          </span>
        </div>
        <ChevronsUpDown className="ml-auto" />
      </SidebarMenuButton>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {renderActiveClassContent()}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Nurseries
            </DropdownMenuLabel>
            {!isPendingAllNurseries && allNurseries ? (
              allNurseries.map((nursery) => (
                <DropdownMenuItem
                  key={nursery.id}
                  onClick={() => handleSetActiveNursery(nursery.id)}
                  className="gap-2 p-2"
                >
                  {nursery?.logo ? (
                    <Image
                      alt={nursery.name}
                      src={nursery.logo}
                      width={50}
                      height={50}
                      className="flex aspect-square size-6 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      {nursery?.name.slice(0, 2)}
                    </div>
                  )}
                  {nursery.name}
                </DropdownMenuItem>
              ))
            ) : (
              <div className="space-y-2">
                {Array(5)
                  .fill("_")
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center gap-2 p-2"
                    >
                      <Skeleton className="aspect-square size-6 rounded-lg" />
                      <div className="grid flex-1 gap-1">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-3 w-[60px]" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link className="gap-2 p-2" href="/dashboard/nurseries">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <CogIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Manage Nurseries
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
