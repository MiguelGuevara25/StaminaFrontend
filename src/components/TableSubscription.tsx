import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { es } from "date-fns/locale";
import { useSubscriptionsStore } from "@/store/subscriptions.store";
import { Badge } from "./ui/badge";

interface TableSubscriptioProps {
  isExpiringSoon: (endDate: string) => boolean;
}

const TableSubscription = ({ isExpiringSoon }: TableSubscriptioProps) => {
  const { subscriptions } = useSubscriptionsStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">ACTIVA</Badge>
        );
      case "CANCELADA":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">CANCELADA</Badge>
        );
      default:
        return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>;
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Socio</TableHead>
          <TableHead className="text-muted-foreground">Plan</TableHead>
          <TableHead className="text-muted-foreground">Inicio</TableHead>
          <TableHead className="text-muted-foreground">Vence</TableHead>
          <TableHead className="text-muted-foreground">Estado</TableHead>
          <TableHead className="text-muted-foreground text-right">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subscriptions.map((sub) => (
          <TableRow
            key={sub.id}
            className={
              isExpiringSoon(sub.endDate)
                ? "bg-yellow-50 dark:bg-yellow-950/20"
                : ""
            }
          >
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center text-xs font-medium flex-shrink-0">
                  {getInitials(sub.user.firstName, sub.user.lastName)}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {sub.user.firstName} {sub.user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {sub.user.email}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm">{sub.plan.name}</TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {format(new Date(sub.startDate), "dd/MM/yyyy", { locale: es })}
            </TableCell>
            <TableCell
              className={`text-sm font-medium ${
                isExpiringSoon(sub.endDate)
                  ? "text-yellow-600"
                  : "text-muted-foreground"
              }`}
            >
              {format(new Date(sub.endDate), "dd/MM/yyyy", { locale: es })}
            </TableCell>
            <TableCell>{getStatusBadge(sub.status)}</TableCell>
            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                disabled={sub.status === "CANCELADA"}
                className="text-red-500 border-red-300 hover:bg-red-500 hover:text-white disabled:opacity-40"
              >
                Cancelar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSubscription;
