import api from "@/api/axios.config";
import type { PlanFormValues } from "@/schemas/plan.schema";

export const getPlans = async () => {
  const response = await api.get("/api/plans");
  return response.data;
};

export const createPlan = async (data: PlanFormValues) => {
  const response = await api.post("/api/plans", data);
  return response.data;
};