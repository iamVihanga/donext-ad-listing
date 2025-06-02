"use client";

import React from "react";

import { useGetAds } from "@/features/ads/api/use-get-ads";

import { columns } from "./ad-table/columns";
import { useAdsTableFilters } from "./ad-table/use-ads-table-filters";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

export function AdsTable() {
  const { page, limit, searchQuery } = useAdsTableFilters();

  const { data, error, isPending } = useGetAds({
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
      data={data.ads}
      totalItems={data.pagination.total}
    />
  );
}
