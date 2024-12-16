import { FeverDiaryEntry } from "@/types";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export type EntriesTableProps = {
  data: FeverDiaryEntry[];
};

function EntriesTable({ data }: EntriesTableProps) {
  return <DataTable data={data} columns={columns} />;
}

export default EntriesTable;
