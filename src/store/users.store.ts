import { create } from "zustand";

import {
  createUser,
  desactivateUser,
  getUsers,
  updateUser,
} from "@/services/user.service";
import type { User } from "@/interfaces";
import { toast } from "sonner";
import type { UserFormValues } from "@/schemas/user.schema";
import type { EditUserFormValues } from "@/schemas/editUser.schema";

interface UsersState {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (data: UserFormValues) => Promise<void>;
  editUser: (id: number, data: EditUserFormValues) => Promise<void>;
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

  addUser: async (data: UserFormValues) => {
    await createUser(data);
    await get().fetchUsers();
  },

  editUser: async (id: number, data: EditUserFormValues) => {
    await updateUser(id, data);
    await get().fetchUsers();
  },

  desactivateUser: async (id: number) => {
    try {
      await desactivateUser(id);
      set((state) => ({
        users: state.users.filter((p) => p.id !== id),
      }));
      toast.success("Socio eliminado correctamente", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Error al eliminado socio", error);
      toast.error("Error al eliminado el socio");
    }
  },
}));
