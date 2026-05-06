import { es } from "date-fns/locale";
import { format, isThisMonth, isThisWeek, isToday } from "date-fns";

import {
  getPaginationRowModel,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useAttendancesStore } from "@/store/attendances.store";
import PaginationTable from "@/shared/PaginationTable";
import type { Attendance } from "@/interfaces";

import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "../ui/table";
import { useMemo, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const columnHelper = createColumnHelper<Attendance>();

const TableAttendance = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("ALL");

  const { attendances } = useAttendancesStore();

  const filteredAttendances = useMemo(() => {
    return attendances.filter((a) => {
      const date = new Date(a.entryDate);

      const matchesDate =
        dateFilter === "ALL"
          ? true
          : dateFilter === "TODAY"
            ? isToday(date)
            : dateFilter === "WEEK"
              ? isThisWeek(date)
              : dateFilter === "MONTH"
                ? isThisMonth(date)
                : true;

      const fullName = `${a.user.firstName} ${a.user.lastName}`.toLowerCase();
      const matchesName = globalFilter
        ? fullName.includes(globalFilter.toLowerCase())
        : true;

      return matchesDate && matchesName;
    });
  }, [attendances, dateFilter, globalFilter]);

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  const columns = [
    columnHelper.accessor(
      (row) => `${row.user.firstName} ${row.user.lastName}`,
      {
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
      },
    ),

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
    data: filteredAttendances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <>
      <div className="flex gap-3">
        <Input
          placeholder="Buscar por nombre..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todas las fechas</SelectItem>
            <SelectItem value="TODAY">Hoy</SelectItem>
            <SelectItem value="WEEK">Esta semana</SelectItem>
            <SelectItem value="MONTH">Este mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
