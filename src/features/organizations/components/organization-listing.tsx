"use client";

import React from "react";

import { useGetOrganizations } from "@/features/organizations/api/use-get-orgs";

import { columns } from "./organizations-table/columns";
import { useOrgsTableFilters } from "./organizations-table/use-org-table-filters";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

export function OrganizationsTable() {
  const { page, limit, searchQuery } = useOrgsTableFilters();

  const { data, error, isPending } = useGetOrganizations({
    limit,
    page,
    search: searchQuery
  });

  if (isPending) {
    return <DataTableSkeleton columnCount={columns.length} rowCount={4} />;
  }

  if (!data || error) {
    return <DataTableError error={error} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data.organizations}
      totalItems={data.pagination.total}
    />
  );
}
