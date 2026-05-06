import TableSubscription from "@/components/subscriptions/TableSubscription";
import TableSubscriptionSkeleton from "@/components/subscriptions/TableSubscriptionSkeleton";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Title from "@/shared/Title";
import { useSubscriptionsStore } from "@/store/subscriptions.store";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";

const Subscripcion = () => {
  const { subscriptions, loading, fetchSubscriptions } =
    useSubscriptionsStore();

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const isExpiringSoon = (endDate: string) => {
    const days = differenceInDays(new Date(endDate), new Date());
    return days >= 0 && days <= 7;
  };

  const total = subscriptions.length;
  const activas = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const porVencer = subscriptions.filter((s) =>
    isExpiringSoon(s.endDate),
  ).length;
  const canceladas = subscriptions.filter(
    (s) => s.status === "CANCELLED",
  ).length;
  const expiradas = subscriptions.filter((s) => s.status === "EXPIRED").length;

  const metrics = [
    {
      label: "Total",
      value: total,
    },
    {
      label: "Activas",
      value: activas,
      className: "text-green-500",
    },
    {
      label: "Por vencer",
      value: porVencer,
      className: "text-yellow-500",
    },
    {
      label: "Canceladas",
      value: canceladas,
      className: "text-yellow-500",
    },
    {
      label: "Expiradas",
      value: expiradas,
      className: "text-red-500",
    },
  ];

  return (
    <section className="p-6 space-y-6">
      <Title
        title="Suscripciones"
        subtitle="Historial y estado de todas las suscripciones"
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        {metrics.map(({ label, value, className }, index) => (
          <Card key={index} className="@container/card">
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle
                className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${className || ""}`}
              >
                {value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
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
