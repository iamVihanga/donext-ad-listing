import React from "react";

import { AppPageShell } from "@/components/layouts/page-shell";
import PageContainer from "@/components/layouts/page-container";
import { Separator } from "@/components/ui/separator";

import { AddNewOrganization } from "@/features/organizations/components/add-new-org";
// import { NurseriesTable as NurseriesListing } from "@/features/nurseries/components/nursery-listing";
// import { NurseriesTableActions } from "@/features/nurseries/components/nurseries-table/nurseries-table-actions";

export default function OrganizationsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Manage Organizations"
          description="Manage your all organizations here"
          actionComponent={<AddNewOrganization />}
        />

        <Separator />

        {/* <NurseriesTableActions />

        <NurseriesListing /> */}
      </div>
    </PageContainer>
  );
}
