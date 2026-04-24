import type { Plan, User } from "@/interfaces";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  subscriptionSchema,
  type SubscriptionFormValues,
} from "@/schemas/subscription.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { createSubscription } from "@/services/subscription.service";
import { getPlans } from "@/services/plan.service";
import { useUsersStore } from "@/store/users.store";

interface FormSubscriptionProps {
  selectedUser: User;
  setOpen: (open: boolean) => void;
}

const FormSubscription = ({ selectedUser, setOpen }: FormSubscriptionProps) => {
  const { fetchUsers } = useUsersStore();

  const [plans, setPlans] = useState<Plan[]>([]);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
  });

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar los planes");
      }
    };
    loadPlans();
  }, []);

  const onSubmit = async (data: SubscriptionFormValues) => {
    const plan = plans.find((p) => p.id === Number(data.plan));

    if (!plan) return toast.error("Plan no encontrado");

    const subscriptionPayload = {
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(addDays(data.startDate, plan.durationDays), "yyyy-MM-dd"),
      status: "ACTIVA",
      user: { id: selectedUser.id },
      plan: { id: Number(data.plan) },
    };

    try {
      await createSubscription(subscriptionPayload);
      toast.success("Suscripción asignada con éxito", {
        position: "top-center",
      });
      reset();
      fetchUsers();
      setOpen(false);
    } catch (err) {
      console.error("Error al registrar sucripciones", err);
      toast.error("Error al registrar la suscripción");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup className="space-y-1">
        <Field>
          <FieldLabel>Plan</FieldLabel>
          <Controller
            control={control}
            name="plan"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id.toString()}>
                        {plan.name} — {plan.durationDays} días — S/.{" "}
                        {plan.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.plan && (
            <span className="text-red-500 text-xs">{errors.plan.message}</span>
          )}
        </Field>

        <Field>
          <FieldLabel>Fecha de inicio</FieldLabel>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start font-normal"
                  >
                    {field.value
                      ? format(field.value, "dd 'de' MMMM yyyy", { locale: es })
                      : "Selecciona una fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    defaultMonth={field.value}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.startDate && (
            <span className="text-red-500 text-xs">
              {errors.startDate.message}
            </span>
          )}
        </Field>

        <Field>
          <Button
            className="w-full cursor-pointer hover:bg-lime-500"
            type="submit"
          >
            Asignar Suscripción
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
};

export default FormSubscription;
