import { Button } from "@/components/ui/button";
import type { Table } from "@tanstack/react-table";

interface PaginationTableProps<T> {
  table: Table<T>;
}

const PaginationTable = <T,>({ table }: PaginationTableProps<T>) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-zinc-400">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </p>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default PaginationTable;
