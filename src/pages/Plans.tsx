import FormPlan from "@/components/FormPlan";
import PlanCard from "@/components/PlanCard";
import PlanCardSkeleton from "@/components/PlanCardSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePlansStore } from "@/store/plans.store";
import { useEffect, useState } from "react";

const Plans = () => {
  const [open, setOpen] = useState(false);
  const { plans, loading, fetchPlans } = usePlansStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Planes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Administra los planes disponibles para tus socios
          </p>
        </div>
        <Button
          className="text-black hover:bg-lime-500 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          + Nuevo Plan
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Plan</DialogTitle>
            <DialogDescription>
              Completa los datos para crear un nuevo plan.
            </DialogDescription>
          </DialogHeader>
          <FormPlan setOpen={setOpen} />
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Total planes</p>
            <p className="text-2xl font-medium mt-1">{plans.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Precio mínimo</p>
            <p className="text-2xl font-medium mt-1">
              {plans.length > 0
                ? `S/. ${Math.min(...plans.map((p) => p.price))}`
                : "—"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">Precio máximo</p>
            <p className="text-2xl font-medium mt-1">
              {plans.length > 0
                ? `S/. ${Math.max(...plans.map((p) => p.price))}`
                : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <PlanCardSkeleton key={i} />
            ))
          : plans.map((plan) => <PlanCard key={plan.id} plan={plan} />)}
      </div>
    </div>
  );
};

export default Plans;
