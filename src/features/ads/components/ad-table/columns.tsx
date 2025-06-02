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

export const columns: ColumnDef<AdType>[] = [
  {
    accessorKey: "title",
    header: "Ad Title",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/ads/${row.original.id}`}
          className="hover:underline"
        >
          {row.original.title}
        </Link>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Ad Type",
    cell: ({ row }) => {
      return <Badge>{row.original.type}</Badge>;
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
