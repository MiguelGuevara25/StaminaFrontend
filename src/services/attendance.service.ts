import api from "@/api/axios.config";
import type { Attendance } from "@/interfaces";

export const getAttendances = async (): Promise<Attendance[]> => {
  const response = await api.get("/api/attendances");
  return response.data;
};