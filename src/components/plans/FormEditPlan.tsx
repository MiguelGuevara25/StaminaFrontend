import type { Plan } from "@/interfaces";
import { planSchema, type PlanFormValues } from "@/schemas/plan.schema";
import { usePlansStore } from "@/store/plans.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface FormEditPlanProps {
  setOpen: (open: boolean) => void;
  selectedPlan: Plan | null;
}

const FormEditPlan = ({ setOpen, selectedPlan }: FormEditPlanProps) => {
  const { editPlan } = usePlansStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: selectedPlan?.name,
      durationDays: selectedPlan?.durationDays,
      price: selectedPlan?.price,
      description: selectedPlan?.description ?? "",
    },
  });

  const onSubmit = async (data: PlanFormValues) => {
    if (!selectedPlan) return;

    try {
      await editPlan(selectedPlan.id, data);
      toast.success("Plan actualizado con éxito", { position: "top-center" });
      setOpen(false);
    } catch (error) {
      console.error("Error al actualizar plan", error);
      toast.error("Error al actualizar el plan");
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
        </Field>

        <Button
          type="submit"
          className="w-full cursor-pointer hover:bg-lime-500"
        >
          Guardar cambios
        </Button>
      </FieldGroup>
    </form>
  );
};

export default FormEditPlan;
