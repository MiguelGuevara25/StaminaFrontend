import TableSubscription from "@/components/TableSubscription";
import TableSubscriptionSkeleton from "@/components/TableSubscriptionSkeleton";
import { useSubscriptionsStore } from "@/store/subscriptions.store";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";

const Subscripcion = () => {
  const { subscriptions, loading, fetchSubscriptions } =
    useSubscriptionsStore();

  const isExpiringSoon = (endDate: string) => {
    const days = differenceInDays(new Date(endDate), new Date());
    return days >= 0 && days <= 7;
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const total = subscriptions.length;
  const activas = subscriptions.filter((s) => s.status === "ACTIVA").length;
  const porVencer = subscriptions.filter((s) =>
    isExpiringSoon(s.endDate),
  ).length;
  const canceladas = subscriptions.filter(
    (s) => s.status === "CANCELADA",
  ).length;

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suscripciones</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Historial y estado de todas las suscripciones
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-medium mt-1">{total}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Activas</p>
          <p className="text-2xl font-medium mt-1 text-green-500">{activas}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Por vencer</p>
          <p className="text-2xl font-medium mt-1 text-yellow-500">
            {porVencer}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Canceladas</p>
          <p className="text-2xl font-medium mt-1 text-red-500">{canceladas}</p>
        </div>
      </div>

      {loading ? (
        <TableSubscriptionSkeleton />
      ) : (
        <TableSubscription isExpiringSoon={isExpiringSoon} />
      )}
    </section>
  );
};

export default Subscripcion;
