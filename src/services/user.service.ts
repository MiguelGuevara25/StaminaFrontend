import api from "@/api/axios.config";

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};
