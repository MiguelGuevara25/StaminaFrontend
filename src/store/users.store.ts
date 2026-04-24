import { create } from "zustand";

import type { User } from "@/interfaces";
import { getUsers } from "@/services/user.service";
import { toast } from "sonner";

interface UsersState {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });

    try {
      const data = await getUsers();
      set({ users: data });
    } catch (error) {
      console.error("Error al cargar socios", error);
      toast.error("Error al cargar los socios");
    } finally {
      set({ loading: false });
    }
  },
}));
