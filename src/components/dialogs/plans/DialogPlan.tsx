import FormEditPlan from "@/components/plans/FormEditPlan";
import FormPlan from "@/components/plans/FormPlan";
import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import type { Plan } from "@/interfaces";

interface DialogPlanProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  editPlan: boolean;
  selectedPlan: Plan | null;
}

const DialogPlan = ({
  open,
  setOpen,
  editPlan,
  selectedPlan,
}: DialogPlanProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editPlan ? "Editar Plan" : "Nuevo Plan"}</DialogTitle>
          <DialogDescription>
            {editPlan
              ? "Modifica los datos del plan"
              : "Completa los datos para crear un nuevo plan."}
          </DialogDescription>
        </DialogHeader>

        {editPlan ? (
          <FormEditPlan selectedPlan={selectedPlan} setOpen={setOpen} />
        ) : (
          <FormPlan setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogPlan;
