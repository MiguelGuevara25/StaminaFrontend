import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import type { Row } from "@tanstack/react-table";
import type { User } from "@/interfaces";

interface DialogDeleteUserProps {
  handleDesactivate: (id: number) => void;
  row: Row<User>;
}

const DialogDeleteUser = ({
  handleDesactivate,
  row,
}: DialogDeleteUserProps) => {
  const { firstName, lastName, id } = row.original;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="destructive">
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción desactivará a{" "}
            <span className="font-semibold">
              {firstName} {lastName}
            </span>{" "}
            y no aparecerá en el listado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDesactivate(id)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeleteUser;
