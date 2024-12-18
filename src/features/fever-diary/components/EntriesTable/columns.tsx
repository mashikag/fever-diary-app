import { Button } from "@/components/ui/button";
import { FeverDiaryEntry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<FeverDiaryEntry>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <time dateTime={date.toISOString()}>
          {date.toLocaleDateString()}, {date.toLocaleTimeString()}
        </time>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "temperature",
    header: "Temperature",
  },
  {
    accessorKey: "medicationType",
    header: "Medication",
  },
  {
    accessorKey: "medicationDosage",
    header: "Dose",
  },
];
