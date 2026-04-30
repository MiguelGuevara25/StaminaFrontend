import { create } from "zustand";
import type { Attendance } from "@/interfaces";
import { getAttendances } from "@/services/attendance.service";
import { toast } from "sonner";

interface AttendancesState {
  attendances: Attendance[];
  loading: boolean;
  fetchAttendances: () => Promise<void>;
}

export const useAttendancesStore = create<AttendancesState>((set) => ({
  attendances: [],
  loading: false,
  
  fetchAttendances: async () => {
    set({ loading: true });
    try {
      const data = await getAttendances();
      set({ attendances: data });
    } catch {
      toast.error("Error al cargar las asistencias");
    } finally {
      set({ loading: false });
    }
  },
}));