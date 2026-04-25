import api from "@/api/axios.config";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { LoginData } from "@/interfaces";
import { useAuthStore } from "@/store/auth.store";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const FormLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post("/auth/login", data);
      const { token, email, firstName, lastName, roles } = response.data;

      if (token) {
        setAuth(token, { email, firstName, lastName, roles });
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 w-1/2">
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Stamina</h1>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter Email Address"
            required
            {...register("email", {
              required: "El correo es obligatorio",
            })}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            required
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
        </Field>
        <Field>
          <Button
            className="w-full cursor-pointer hover:bg-lime-500"
            type="submit"
          >
            Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormLogin;
