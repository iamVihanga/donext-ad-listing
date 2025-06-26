"use client";

import React from "react";

import { useGetAds } from "@/features/ads/api/use-get-ads";

import { columns } from "./ad-table/columns";
import { useAdsTableFilters } from "./ad-table/use-ads-table-filters";

import { DataTable } from "@/components/table/data-table";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import DataTableError from "@/components/table/data-table-error";

// Vehicle type labels for title generation
const vehicleTypeLabels: Record<string, string> = {
  CAR: "Car",
  VAN: "Van",
  SUV_JEEP: "SUV / Jeep",
  MOTORCYCLE: "Motorcycle",
  CREW_CAB: "Crew Cab",
  PICKUP_DOUBLE_CAB: "Pickup / Double Cab",
  BUS: "Bus",
  LORRY: "Lorry",
  THREE_WHEEL: "Three Wheeler",
  OTHER: "Other",
  TRACTOR: "Tractor",
  HEAVY_DUTY: "Heavy-Duty",
  BICYCLE: "Bicycle"
};

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

  // Transform the data to convert string dates to Date objects and ensure proper title format
  const formattedAds = data.ads.map((ad) => {
    // Generate the standardized title format
    const generatedTitle = [ad.brand, ad.model, ad.manufacturedYear, vehicleTypeLabels[ad.type] || ad.type]
      .filter(Boolean)
      .join(' ');

    return {
      ...ad,
      // Use the generated title for consistency, fallback to original title if needed
      title: generatedTitle || ad.title || "Untitled Ad",
      expiryDate: ad?.expiryDate ? new Date(ad?.expiryDate) : new Date(),
      featureExpiry: ad?.featureExpiry ? new Date(ad?.featureExpiry) : new Date(),
      boostExpiry: ad?.boostExpiry ? new Date(ad?.boostExpiry) : new Date(),
      updatedAt: new Date(ad.updatedAt)
    };
  });

  return (
    <DataTable
      columns={columns}
      data={formattedAds}
      totalItems={data.pagination.total}
    />
  );
}