import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconUserPlus } from "@tabler/icons-react";
import TableUsers from "@/components/users/TableUsers";
import { useUsersStore } from "@/store/users.store";
import TableUserSkeleton from "@/components/users/TableUserSkeleton";
import DialogUser from "@/components/dialogs/users/DialogUser";
import type { User } from "@/interfaces";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { loading, fetchUsers } = useUsersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenDialog = (
    edit: boolean = false,
    data: User | null = null,
  ) => {
    setEditUser(edit);
    setOpen(true);
    setSelectedUser(data);
  };

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
          onClick={() => handleOpenDialog()}
        >
          <IconUserPlus size={20} />
          Nuevo Socio
        </Button>
      </div>

      {loading ? (
        <TableUserSkeleton />
      ) : (
        <TableUsers handleOpenDialog={handleOpenDialog} />
      )}

      <DialogUser
        open={open}
        setOpen={setOpen}
        editUser={editUser}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default Users;
