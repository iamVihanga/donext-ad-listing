"use client";

import Link from "next/link";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import type { Organization } from "@/types/schema-types/index";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrganizationT = Omit<Organization, "createdAt"> & {
  createdAt: string;
};

export const columns: ColumnDef<OrganizationT>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const content = row.original.logo ? (
        <div className="flex items-center gap-3">
          <Image
            alt={row.original.name}
            src={row.original.logo}
            width={50}
            height={50}
            className="size-8 rounded-md object-cover"
          />
          <p>{row.original.name}</p>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-md bg-primary flex items-center justify-center text-sm text-primary-foreground">
            {row.original.name.slice(0, 2)}
          </div>
          <p>{row.original.name}</p>
        </div>
      );

      return (
        <Link
          href={`/dashboard/organizations/${row.original.id}`}
          className="hover:underline text-primary cursor-pointer"
        >
          {content}
        </Link>
      );
    }
  },
  {
    accessorKey: "metadata",
    header: "Description",
    cell: ({ row }) => {
      if (row.original.metadata) {
        return JSON.parse(row.original.metadata)?.description || "-";
      } else return "-";
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
