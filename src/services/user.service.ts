import api from "@/api/axios.config";
import type { UserFormValues } from "@/schemas/user.schema";

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const createUser = async (data: UserFormValues) => {
  const response = await api.post("/api/users", data);
  return response.data;
}

export const desactivateUser = async (id: number) => {
  await api.delete(`/api/users/${id}`);
};
