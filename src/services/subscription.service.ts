import type { SubscriptionPayload } from "@/interfaces";
import api from "@/api/axios.config";

export const getSubscriptions = async () => {
  const response = await api.get("/api/subscriptions");
  return response.data;
};

export const createSubscription = async (payload: SubscriptionPayload) => {
  const response = await api.post("/api/subscriptions", payload);
  return response.data;
};
