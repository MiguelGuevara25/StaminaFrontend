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

const Users = () => {
  const [open, setOpen] = useState(false);
  const { loading, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading)
    return <div className="text-white p-10">Cargando socios de Stamina...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestión de Socios</h1>
        <Button
          onClick={() => setOpen(true)}
          className="text-black hover:bg-lime-500 cursor-pointer"
        >
          <IconUserPlus className="mr-2" size={20} />
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

      <TableUsers />
    </div>
  );
};

export default Users;
