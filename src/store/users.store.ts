import { create } from "zustand";

import { createUser, desactivateUser, getUsers } from "@/services/user.service";
import type { User } from "@/interfaces";
import { toast } from "sonner";
import type { UserFormValues } from "@/schemas/user.schema";

interface UsersState {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (data: UserFormValues) => Promise<void>;
  desactivateUser: (id: number) => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
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

  addUser: async (data) => {
    await createUser(data);
    toast.success("Socio registrado con éxito", { position: "top-center" });
    get().fetchUsers();
  },

  desactivateUser: async (id: number) => {
    try {
      await desactivateUser(id);
    } catch (error) {
      console.error("Error al desactivar socio", error);
      toast.error("Error al desactivar el socio");
    }
  },
}));
