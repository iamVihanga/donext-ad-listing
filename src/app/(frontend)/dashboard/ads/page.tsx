import React from "react";

import PageContainer from "@/components/layouts/page-container";
import { AppPageShell } from "@/components/layouts/page-shell";
import { Separator } from "@/components/ui/separator";
import { SetupAdDialog } from "@/features/ads/components/setup-ad";

import { AdsTable as AdsListing } from "@/features/ads/components/ad-listing";
import { AdsTableActions } from "@/features/ads/components/ad-table/ads-table-actions";

export default function AdsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title={`Ad Listing Management`}
          description="Manage your all ads for selected agent in here"
          actionComponent={<SetupAdDialog />}
        />

        <Separator />

        <AdsTableActions />

        <AdsListing />
      </div>
    </PageContainer>
  );
}
