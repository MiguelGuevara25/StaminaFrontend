import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { usePlansStore } from "@/store/plans.store";

type FiltersSubscriptionProps = {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  planFilter: string;
  setPlanFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
};

const FiltersSubscription = ({
  globalFilter,
  setGlobalFilter,
  planFilter,
  setPlanFilter,
  statusFilter,
  setStatusFilter,
}: FiltersSubscriptionProps) => {
  const { plans } = usePlansStore();

  return (
    <div className="flex gap-3">
      <Input
        placeholder="Buscar por nombre..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <Select value={planFilter} onValueChange={setPlanFilter}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Plan" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">Todos los planes</SelectItem>
          {plans.map((plan) => (
            <SelectItem key={plan.id} value={plan.name}>
              {plan.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">Todos</SelectItem>
          <SelectItem value="ACTIVE">Activas</SelectItem>
          <SelectItem value="CANCELLED">Canceladas</SelectItem>
          <SelectItem value="EXPIRED">Expiradas</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltersSubscription;
