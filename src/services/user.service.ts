import type { EditUserFormValues } from "@/schemas/editUser.schema";
import type { UserFormValues } from "@/schemas/user.schema";

import api from "@/api/axios.config";

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const createUser = async (data: UserFormValues) => {
  const response = await api.post("/api/users", data);
  return response.data;
};

export const updateUser = async (id: number, data: EditUserFormValues) => {
  const response = await api.put(`/api/users/${id}`, data);
  return response.data;
};

export const desactivateUser = async (id: number) => {
  await api.delete(`/api/users/${id}`);
};
