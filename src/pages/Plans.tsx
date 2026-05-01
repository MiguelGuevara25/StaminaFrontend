import DialogPlan from "@/components/dialogs/plans/DialogPlan";
import PlanCard from "@/components/plans/PlanCard";
import PlanCardSkeleton from "@/components/plans/PlanCardSkeleton";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const metrics = [
    {
      label: "Total planes",
      value: plans.length,
    },
    {
      label: "Precio mínimo",
      value:
        plans.length > 0
          ? `S/. ${Math.min(...plans.map((p) => p.price))}`
          : "—",
    },
    {
      label: "Precio máximo",
      value:
        plans.length > 0
          ? `S/. ${Math.max(...plans.map((p) => p.price))}`
          : "—",
    },
  ];

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

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        {metrics.map(({ label, value }, index) => (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
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
