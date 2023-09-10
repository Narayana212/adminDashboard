"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useAdminState } from "@/context/admin-provider";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Categories = {
  id: number;
  name: string;
};

const { categoryDeleteData, setCategoryDeleteData } = useAdminState();
const { toast } = useToast();

export const columns: ColumnDef<Categories>[] = 

[
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "settings",
    cell: ({ row }) => {
      const category = row.original;
      async function handleDelete(id: string) {
        try {
          const response = await fetch(`api/category/${id}`, {
            method: "Delete",
          });
          if (response.ok) {
            setCategoryDeleteData(id);
            toast({
              title: "Deleted SuccessFully",
            });
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(category.id.toLocaleString())
              }
            >
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant={"ghost"}
                className="p-0"
                onClick={() => handleDelete(category.id.toLocaleString())}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
