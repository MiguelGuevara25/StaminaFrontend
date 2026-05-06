import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormSubscription from "@/components/subscriptions/FormSubscription";
import type { User } from "@/interfaces";

interface DialogAsignPlanUserProps {
  openSub: boolean;
  setOpenSub: (open: boolean) => void;
  selectedUser: User | null;
}

const DialogAsignPlanUser = ({
  openSub,
  setOpenSub,
  selectedUser,
}: DialogAsignPlanUserProps) => {
  return (
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
          <FormSubscription selectedUser={selectedUser} setOpen={setOpenSub} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogAsignPlanUser;
