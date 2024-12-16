import { FeverDiaryEntry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FeverDiaryEntry>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <time dateTime={date.toISOString()}>
          {date.toLocaleDateString()}, {date.toLocaleTimeString()}
        </time>
      );
    },
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
