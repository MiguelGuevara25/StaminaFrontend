import api from "@/api/axios.config";

export const getPlans = async () => {
  const response = await api.get("/api/plans");
  return response.data;
};
