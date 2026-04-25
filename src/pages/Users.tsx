import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";
import FormUser from "@/components/FormUser";
import TableUsers from "@/components/TableUsers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUsersStore } from "@/store/users.store";
import TableSkeleton from "@/components/TableSkeleton";

const Users = () => {
  const [open, setOpen] = useState(false);
  const { loading, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Socios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Administra los socios de tu gimnasio
          </p>
        </div>

        <Button
          className="text-black hover:bg-lime-500 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <IconUserPlus className="" size={20} />
          Nuevo Socio
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuevo Socio</DialogTitle>
            <DialogDescription>
              Completa los datos para registrar un nuevo socio.
            </DialogDescription>
          </DialogHeader>
          <FormUser setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      {loading ? <TableSkeleton /> : <TableUsers />}
    </div>
  );
};

export default Users;
