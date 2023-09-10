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

export const columns: ColumnDef<Categories>[] = [
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
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isOrdered",
    header: "isOrdered",
  },
  {
    id: "settings",
    cell: ({ row }) => {
      const category = row.original;

      const { productDeleteData, setProductDeleteData } = useAdminState();
      const { toast } = useToast();

      async function handleDelete(id: string) {
        try {
          const response = await fetch(`api/product/${id}`, {
            method: "Delete",
          });
          if (response.ok) {
            setProductDeleteData(id);
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
              Copy Product ID
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
