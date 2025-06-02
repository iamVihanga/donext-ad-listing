import React from "react";

import { AppPageShell } from "@/components/layouts/page-shell";
import PageContainer from "@/components/layouts/page-container";
import { Separator } from "@/components/ui/separator";

import { AddNewOrganization } from "@/features/organizations/components/add-new-org";
import { OrganizationsTable as OrganizationsListing } from "@/features/organizations/components/organization-listing";
import { OrgTableActions } from "@/features/organizations/components/organizations-table/org-table-actions";

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

        <OrgTableActions />

        <OrganizationsListing />
      </div>
    </PageContainer>
  );
}
