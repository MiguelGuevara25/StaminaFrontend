import { create } from "zustand";

import { createPlan, getPlans } from "@/services/plan.service";
import type { Plan } from "@/interfaces";
import { toast } from "sonner";
import type { PlanFormValues } from "@/schemas/plan.schema";

interface PlansState {
  plans: Plan[];
  loading: boolean;
  fetchPlans: () => Promise<void>;
  addPlan: (data: PlanFormValues) => Promise<void>;
}

export const usePlansStore = create<PlansState>((set, get) => ({
  plans: [],
  loading: false,

  fetchPlans: async () => {
    set({ loading: true });

    try {
      const data = await getPlans();
      set({ plans: data });
    } catch (error) {
      console.error("Error al cargar planes:", error);
      toast.error("Error al cargar los planes");
    } finally {
      set({ loading: false });
    }
  },

  addPlan: async (data) => {
    await createPlan(data);
    toast.success("Plan creado con éxito", { position: "top-center" });
    get().fetchPlans();
  },
}));
