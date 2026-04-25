import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { planSchema, type PlanFormValues } from "@/schemas/plan.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePlansStore } from "@/store/plans.store";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

interface FormPlanProps {
  setOpen: (open: boolean) => void;
}

const FormPlan = ({ setOpen }: FormPlanProps) => {
  const { addPlan } = usePlansStore();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
  });

  const onSubmit = async (data: PlanFormValues) => {
    try {
      await addPlan(data);
      reset();
      setOpen(false);
    } catch (err) {
      console.error("Error al crear plan", err);
      toast.error("Error al crear el plan");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Nombre del plan</FieldLabel>
          <Input {...register("name")} placeholder="Ej: Plan Mensual" />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Duración (días)</FieldLabel>
            <Input
              type="number"
              {...register("durationDays")}
              placeholder="Ej: 30"
            />
            {errors.durationDays && (
              <span className="text-red-500 text-xs">
                {errors.durationDays.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel>Precio (S/.)</FieldLabel>
            <Input
              type="number"
              step="0.01"
              {...register("price")}
              placeholder="Ej: 150.00"
            />
            {errors.price && (
              <span className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </Field>
        </div>

        <Field>
          <FieldLabel>Descripción (opcional)</FieldLabel>
          <Textarea
            {...register("description")}
            placeholder="Describe brevemente el plan..."
            rows={3}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </Field>

        <Button
          type="submit"
          className="w-full cursor-pointer hover:bg-lime-500"
        >
          Crear Plan
        </Button>
      </FieldGroup>
    </form>
  );
};

export default FormPlan;
