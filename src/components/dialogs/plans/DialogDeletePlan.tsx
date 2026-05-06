import { usePlansStore } from "@/store/plans.store";
import type { Plan } from "@/interfaces";

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

const DialogDeletePlan = ({ plan }: { plan: Plan }) => {
  const { deletePlan } = usePlansStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-1 cursor-pointer" variant="destructive">
          Eliminar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción desactivará el plan{" "}
            <span className="font-semibold">{plan.name}</span> y no aparecerá en
            el listado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePlan(plan.id)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogDeletePlan;
