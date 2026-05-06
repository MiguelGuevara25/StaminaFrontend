import { useMemo, useState } from "react";
import { es } from "date-fns/locale";
import { format } from "date-fns";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSubscriptionsStore } from "@/store/subscriptions.store";
import { Badge } from "../ui/badge";

import type { Subscription } from "@/interfaces";
import DialogCancelSubscription from "../dialogs/subscriptions/DialogCancelSubscription";
import PaginationTable from "@/shared/PaginationTable";
import FiltersSubscription from "./FiltersSubscription";

const columnHelper = createColumnHelper<Subscription>();

interface TableSubscriptioProps {
  isExpiringSoon: (endDate: string) => boolean;
}

const TableSubscription = ({ isExpiringSoon }: TableSubscriptioProps) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [planFilter, setPlanFilter] = useState("ALL");

  const { subscriptions, cancelSubscription } = useSubscriptionsStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white font-medium uppercase">
            Activa
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium uppercase">
            Cancelada
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium uppercase">
            Expirada
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

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

    columnHelper.accessor((row) => row.plan.name, {
      id: "plan",
      header: "Plan",
      cell: ({ row }) => row.original.plan.name,
    }),

    columnHelper.display({
      id: "startDate",
      header: "Inicio",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {format(row.original.startDate, "dd/MM/yyyy", { locale: es })}
        </span>
      ),
    }),

    columnHelper.display({
      id: "endDate",
      header: "Vence",
      cell: ({ row }) => (
        <span
          className={`font-medium ${
            isExpiringSoon(row.original.endDate)
              ? "text-yellow-600"
              : "text-muted-foreground"
          }`}
        >
          {format(row.original.endDate, "dd/MM/yyyy", { locale: es })}
        </span>
      ),
    }),

    columnHelper.display({
      id: "status",
      header: "Estado",
      cell: ({ row }) => getStatusBadge(row.original.status),
    }),

    columnHelper.display({
      id: "actions",
      header: () => <span className="flex justify-end">Acciones</span>,

      cell: ({ row }) => {
        return (
          <div className="flex justify-end">
            <DialogCancelSubscription
              row={row}
              cancelSubscription={cancelSubscription}
            />
          </div>
        );
      },
    }),
  ];

  const filteredSubscriptions = useMemo(
    () =>
      subscriptions
        .filter((s) =>
          statusFilter === "ALL" ? true : s.status === statusFilter,
        )
        .filter((s) =>
          planFilter === "ALL" ? true : s.plan.name === planFilter,
        ),
    [subscriptions, statusFilter, planFilter],
  );

  const table = useReactTable({
    data: filteredSubscriptions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  return (
    <>
      <FiltersSubscription
        planFilter={planFilter}
        globalFilter={globalFilter}
        statusFilter={statusFilter}
        setPlanFilter={setPlanFilter}
        setGlobalFilter={setGlobalFilter}
        setStatusFilter={setStatusFilter}
      />

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

export default TableSubscription;
