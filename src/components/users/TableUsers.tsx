import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import DialogAsignPlanUser from "../dialogs/users/DialogAsignPlanUser";
import DialogDeleteUser from "../dialogs/users/DialogDeleteUser";
import PaginationTable from "@/shared/PaginationTable";
import { useUsersStore } from "@/store/users.store";
import type { User } from "@/interfaces";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

const columnHelper = createColumnHelper<User>();

interface TableUserProps {
  handleOpenDialog: (edit?: boolean, user?: User) => void;
}

const TableUsers = ({ handleOpenDialog }: TableUserProps) => {
  const [openSub, setOpenSub] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { users, desactivateUser } = useUsersStore();

  const handleOpenSubscription = (user: User) => {
    setSelectedUser(user);
    setOpenSub(true);
  };

  const columns = [
    columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
      id: "nombre",
      header: "Nombre",
    }),
    columnHelper.accessor("dni", {
      header: "DNI",
    }),
    columnHelper.accessor("email", {
      header: "Correo",
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: ({ getValue }) => {
        const status = getValue();
        return (
          <Badge
            className={
              status === "ACTIVO"
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600"
            }
          >
            {status}
          </Badge>
        );
      },
    }),
    columnHelper.display({
      id: "acciones",
      header: () => <span className="flex justify-end">Acciones</span>,
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button
            className="text-black cursor-pointer hover:bg-lime-500"
            onClick={() => handleOpenSubscription(row.original)}
          >
            Suscripción
          </Button>
          <Button
            className="text-black cursor-pointer hover:bg-lime-500"
            onClick={() => handleOpenDialog(true, row.original)}
          >
            Editar
          </Button>

          <DialogDeleteUser desactivateUser={desactivateUser} row={row} />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    state: {
      globalFilter,
      pagination: { pageIndex: 0, pageSize: 10 },
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <Select>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Seleccione un estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Todos los estados</SelectItem>
            <SelectItem value="ACTIVO">Activo</SelectItem>
            <SelectItem value="INACTIVO">Inactivo</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        placeholder="Buscar por nombre o DNI..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-zinc-400">
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

      <DialogAsignPlanUser
        openSub={openSub}
        setOpenSub={setOpenSub}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default TableUsers;
