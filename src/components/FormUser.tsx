import { useForm } from "react-hook-form";

import { userSchema, type UserFormValues } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import axios from "axios";
import { toast } from "sonner";

interface FormUserProps {
  loadUsers: () => void;
  setOpen: (open: boolean) => void;
}

const FormUser = ({ loadUsers, setOpen }: FormUserProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      await axios.post("http://localhost:8080/api/users", data);
      toast.success("Socio registrado con éxito", { position: "top-center" });
      reset();
      loadUsers();
      setOpen(false);
    } catch (err) {
      console.error("Error al registrar socios", err);
      toast.error("Error al registrar el socio");
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

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Teléfono</FieldLabel>
            <Input {...register("phone")} placeholder="9 dígitos" />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel>Contraseña</FieldLabel>
            <Input
              type="password"
              {...register("password")}
              placeholder="******"
              autoComplete="off"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </Field>
        </div>

        <Field>
          <Button className="cursor-pointer hover:bg-lime-500" type="submit">
            Registrar Socio en Stamina
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormUser;
