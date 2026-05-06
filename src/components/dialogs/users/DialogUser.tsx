import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormEditUser from "@/components/users/FormEditUser";
import FormUser from "@/components/users/FormUser";
import type { User } from "@/interfaces";

interface DialogUserProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editUser: boolean;
  selectedUser: User | null;
}

const DialogUser = ({
  open,
  setOpen,
  editUser,
  selectedUser,
}: DialogUserProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editUser ? "Editar Socio" : "Nuevo Socio"}</DialogTitle>
          <DialogDescription>
            {editUser
              ? "Modifica los datos del socio"
              : "Completa los datos para registrar un nuevo socio."}
          </DialogDescription>
        </DialogHeader>

        {editUser ? (
          <FormEditUser selectedUser={selectedUser} setOpen={setOpen} />
        ) : (
          <FormUser setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogUser;
