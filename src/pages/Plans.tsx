import DialogPlan from "@/components/dialogs/plans/DialogPlan";
import PlanCard from "@/components/plans/PlanCard";
import PlanCardSkeleton from "@/components/plans/PlanCardSkeleton";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Plan } from "@/interfaces";
import Title from "@/shared/Title";
import { usePlansStore } from "@/store/plans.store";
import { useEffect, useState } from "react";

const Plans = () => {
  const [editPlan, setEditPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [open, setOpen] = useState(false);

  const { plans, loading, fetchPlans } = usePlansStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleOpenDialog = (
    edit: boolean = false,
    data: Plan | null = null,
  ) => {
    setEditPlan(edit);
    setOpen(true);
    setSelectedPlan(data);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Title
          title="Gestión de Planes"
          subtitle="Administra los planes disponibles para tus socios"
        />

        <Button
          className="text-black hover:bg-lime-500 cursor-pointer"
          onClick={() => handleOpenDialog()}
        >
          + Nuevo Plan
        </Button>
      </div>

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
          : plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                handleOpenDialog={handleOpenDialog}
              />
            ))}
      </div>

      <DialogPlan
        open={open}
        setOpen={setOpen}
        editPlan={editPlan}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default Plans;
