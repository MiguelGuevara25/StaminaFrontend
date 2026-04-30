import { useUsersStore } from "@/store/users.store";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  editUserSchema,
  type EditUserFormValues,
} from "@/schemas/editUser.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/interfaces";
import { toast } from "sonner";

interface FormEditUserProps {
  selectedUser: User | null;
  setOpen: (open: boolean) => void;
}

const FormEditUser = ({ selectedUser, setOpen }: FormEditUserProps) => {
  const { editUser } = useUsersStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUserFormValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      dni: selectedUser?.dni,
      email: selectedUser?.email,
      phone: selectedUser?.phone,
    },
  });

  const onSubmit = async (data: EditUserFormValues) => {
    if (!selectedUser) return;

    try {
      await editUser(selectedUser.id, data);
      setOpen(false);
    } catch {
      toast.error("Error al actualizar el socio");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Nombre</FieldLabel>
            <Input {...register("firstName")} placeholder="Nombre" />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel>Apellido</FieldLabel>
            <Input {...register("lastName")} placeholder="Apellido" />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>DNI</FieldLabel>
            <Input {...register("dni")} placeholder="8 dígitos" maxLength={8} />
            {errors.dni && (
              <span className="text-red-500 text-xs">{errors.dni.message}</span>
            )}
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              {...register("email")}
              placeholder="correo@ejemplo.com"
              autoComplete="off"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel>Teléfono</FieldLabel>
          <Input {...register("phone")} placeholder="9 dígitos" maxLength={9} />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </Field>

        <Field>
          <Button
            className="w-full cursor-pointer hover:bg-lime-500"
            type="submit"
          >
            Guardar cambios
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormEditUser;
