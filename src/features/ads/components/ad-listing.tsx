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

  // Transform the data to convert string dates to Date objects
  const formattedAds = data.ads.map((ad) => ({
    ...ad,
    expiryDate: ad?.expiryDate ? new Date(ad?.expiryDate) : new Date(),
    featureExpiry: ad?.featureExpiry ? new Date(ad?.featureExpiry) : new Date(),
    boostExpiry: ad?.boostExpiry ? new Date(ad?.boostExpiry) : new Date(),
    updatedAt: new Date(ad.updatedAt)
    // If there are other date fields that need conversion, add them here
  }));

  return (
    <DataTable
      columns={columns}
      data={formattedAds}
      totalItems={data.pagination.total}
    />
  );
}
