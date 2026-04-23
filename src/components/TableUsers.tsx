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

interface TableUsersProps {
  users: User[];
  loadUsers: () => void;
}

const TableUsers = ({ users, loadUsers }: TableUsersProps) => {
  const [openSub, setOpenSub] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenSubscription = (user: User) => {
    setSelectedUser(user);
    setOpenSub(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-zinc-400">Nombre</TableHead>
            <TableHead className="text-zinc-400">DNI</TableHead>
            <TableHead className="text-zinc-400">Correo</TableHead>
            <TableHead className="text-zinc-400">Teléfono</TableHead>
            <TableHead className="text-zinc-400">Estado</TableHead>
            <TableHead className="text-zinc-400 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>

              <TableCell>{user.dni}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>

              <TableCell>
                <Badge
                  className={
                    user.status === "ACTIVO"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover:bg-red-600"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button onClick={() => handleOpenSubscription(user)}>
                  Suscripción
                </Button>

                <Button className="text-black">Editar</Button>
                <Button className="text-black">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
            <FormSubscription user={selectedUser} setOpen={setOpenSub} loadUsers={loadUsers} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableUsers;
