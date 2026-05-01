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
import { Button } from "@/components/ui/button";
import type { Subscription } from "@/interfaces";
import type { Row } from "@tanstack/react-table";

interface DialogCancelSubscriptionProps {
  cancelSubscription: (id: number) => void;
  row: Row<Subscription>;
}

const DialogCancelSubscription = ({
  cancelSubscription,
  row,
}: DialogCancelSubscriptionProps) => {
  const { user, id, status, plan } = row.original;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={status === "CANCELLED" || status === "EXPIRED"}
          className="text-red-500 border-red-300 hover:bg-red-500 hover:text-white disabled:opacity-40"
        >
          Cancelar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Cancelar suscripción?</AlertDialogTitle>
          <AlertDialogDescription>
            Se cancelará la suscripción de{" "}
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>{" "}
            al plan <span className="font-semibold">{plan.name}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Volver</AlertDialogCancel>
          <AlertDialogAction onClick={() => cancelSubscription(id)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCancelSubscription;
