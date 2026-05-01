import { es } from "date-fns/locale";
import { format } from "date-fns";

import { useAttendancesStore } from "@/store/attendances.store";
import PaginationTable from "@/shared/PaginationTable";
import type { Attendance } from "@/interfaces";

import {
  getPaginationRowModel,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "../ui/table";

const columnHelper = createColumnHelper<Attendance>();

const TableAttendance = () => {
  const { attendances } = useAttendancesStore();

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  const columns = [
    columnHelper.display({
      id: "user",
      header: "Socio",
      cell: ({ row }) => {
        const { lastName, firstName, email } = row.original.user;

        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center text-xs font-medium shrink-0">
              {getInitials(firstName, lastName)}
            </div>
            <div>
              <p className="font-medium text-sm">
                {firstName} {lastName}
              </p>
              <p className="text-xs text-muted-foreground">{email}</p>
            </div>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: "entryDate",
      header: "Fecha",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {format(new Date(row.original.entryDate), "dd/MM/yyyy", {
            locale: es,
          })}
        </div>
      ),
    }),

    columnHelper.display({
      id: "hora",
      header: "Hora",
      cell: ({ row }) => (
        <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
          {format(new Date(row.original.entryDate), "HH:mm", {
            locale: es,
          })}
        </span>
      ),
    }),
  ];

  const table = useReactTable({
    data: attendances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-muted-foreground">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationTable table={table} />
    </>
  );
};

export default TableAttendance;
