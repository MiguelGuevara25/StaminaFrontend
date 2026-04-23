import type { Subscription } from "@/interfaces";
import api from "@/api/axios.config";

export const createSubscription = async (payload: Subscription) => {
  const response = await api.post("/api/subscriptions", payload);
  return response.data;
};