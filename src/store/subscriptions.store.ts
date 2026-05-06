import { create } from "zustand";

import type { Subscription } from "@/interfaces";
import {
  cancelSubscription,
  getSubscriptions,
} from "@/services/subscription.service";
import { toast } from "sonner";

interface SubscriptionsState {
  subscriptions: Subscription[];
  loading: boolean;
  fetchSubscriptions: () => Promise<void>;
  cancelSubscription: (id: number) => Promise<void>;
}

export const useSubscriptionsStore = create<SubscriptionsState>((set) => ({
  subscriptions: [],
  loading: false,

  fetchSubscriptions: async () => {
    set({ loading: true });

    try {
      const data = await getSubscriptions();
      set({ subscriptions: data });
    } catch (error) {
      console.error("Error al cargar sucripciones", error);
      toast.error("Error al cargar las sucripciones");
    } finally {
      set({ loading: false });
    }
  },

  cancelSubscription: async (id: number) => {
    try {
      await cancelSubscription(id);
      set((state) => ({
        subscriptions: state.subscriptions.filter((p) => p.id !== id),
      }));
      toast.success("Suscripción cancelada correctamente", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error al cancelar sucripciones", error);
      toast.error("Error al cancelar la suscripción");
    }
  },
}));
