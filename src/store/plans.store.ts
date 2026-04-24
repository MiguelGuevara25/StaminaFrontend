import { create } from "zustand";

import type { Plan } from "@/interfaces";
import { getPlans } from "@/services/plan.service";
import { toast } from "sonner";

interface PlansState {
  plans: Plan[];
  loading: boolean;
  fetchPlans: () => Promise<void>;
}

export const usePlansStore = create<PlansState>((set) => ({
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
}));
