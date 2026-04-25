import type { Plan } from "@/interfaces";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface PlanCardProps {
  plan: Plan;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <p className="text-sm text-muted-foreground">{plan.name}</p>
        <CardTitle className="text-3xl font-medium">
          S/. {plan.price}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            / {plan.durationDays} {plan.durationDays === 1 ? "día" : "días"}
          </span>
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col gap-2 flex-1 pt-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 rounded-full bg-lime-400 shrink-0" />
          {plan.durationDays} {plan.durationDays === 1 ? "día" : "días"} de
          acceso
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-4 h-4 rounded-full bg-lime-400 shrink-0" />
          Acceso completo al gimnasio
        </div>
        {plan.description && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-4 h-4 rounded-full bg-lime-400 shrink-0" />
            {plan.description}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1" disabled>
          Editar
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          disabled
        >
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
