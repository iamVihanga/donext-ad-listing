"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import type { Ad } from "@/types/schema-types/index";
import { CellAction } from "./cell-action";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AdType = Omit<Ad, "createdAt"> & {
  createdAt: string;
};

// Vehicle type labels mapping
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

// Helper function to generate ad title from components
const generateAdTitle = (ad: AdType): string => {
  return [ad.brand, ad.model, ad.manufacturedYear, vehicleTypeLabels[ad.type] || ad.type]
    .filter(Boolean)
    .join(' ') || ad.title || "Untitled Ad";
};

export const columns: ColumnDef<AdType>[] = [
  {
    accessorKey: "title",
    header: "Ad Title",
    cell: ({ row }) => {
      const ad = row.original;
      const displayTitle = generateAdTitle(ad);
      
      return (
        <Link
          href={`/dashboard/ads/${ad.id}`}
          className="hover:underline"
        >
          {displayTitle}
        </Link>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Ad Type",
    cell: ({ row }) => {
      const type = row.original.type;
      const displayType = vehicleTypeLabels[type] || type;
      
      return (
        <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">
          {displayType}
        </Badge>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString()
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];