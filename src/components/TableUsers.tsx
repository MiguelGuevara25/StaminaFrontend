import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "@/interfaces";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import FormSubscription from "./FormSubscription";
import { useUsersStore } from "@/store/users.store";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const columnHelper = createColumnHelper<User>();

const TableUsers = () => {
  const [openSub, setOpenSub] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { users, fetchUsers, desactivateUser } = useUsersStore();

  const handleOpenSubscription = (user: User) => {
    setSelectedUser(user);
    setOpenSub(true);
  };

  const handleDesactivate = async (id: number) => {
    try {
      await desactivateUser(id);
      toast.success("Socio eliminado correctamente", {
        position: "top-center",
      });
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar socio", err);
      toast.error("Error al eliminar el socio");
    }
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
          <Button onClick={() => handleOpenSubscription(row.original)}>
            Suscripción
          </Button>
          <Button className="text-black">Editar</Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer" variant="destructive">Eliminar</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción desactivará a{" "}
                  <span className="font-semibold">
                    {row.original.firstName} {row.original.lastName}
                  </span>{" "}
                  y no aparecerá en el listado.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDesactivate(row.original.id)}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
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

      <Dialog open={openSub} onOpenChange={setOpenSub}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Asignar Suscripción — {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </DialogTitle>

            <DialogDescription>
              Selecciona un plan y la fecha de inicio.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <FormSubscription
              selectedUser={selectedUser}
              setOpen={setOpenSub}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableUsers;
