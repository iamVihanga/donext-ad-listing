"use client"

import React from "react";
import { useRouter } from "next/navigation"; // Import router for navigation

import PageContainer from "@/components/layouts/page-container";
import { AppPageShell } from "@/components/layouts/page-shell";
import { Separator } from "@/components/ui/separator";
import { SetupAdDialog } from "@/features/ads/components/setup-ad";

import { AdsTable as AdsListing } from "@/features/ads/components/ad-listing";
import { AdsTableActions } from "@/features/ads/components/ad-table/ads-table-actions";
import { Button } from "@/components/ui/button";

export default function AdsPage() {
  const router = useRouter(); // Use Next.js router
  
  const handleCreateAd = () => {
    router.push('/dashboard/ads/new');
  };
  
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title={`Ad Listing Management`}
          description="Manage your all ads for selected agent in here"
          actionComponent={
            <Button 
              onClick={handleCreateAd} 
              variant="default"
            >
              Create New Ad
            </Button>
          }
        />

        <Separator />

        <AdsTableActions />

        <AdsListing />
      </div>
    </PageContainer>
  );
}