import { useEffect } from "react";

import { usePlansStore } from "@/store/plans.store";
import { useSubscriptionsStore } from "@/store/subscriptions.store";
import { useUsersStore } from "@/store/users.store";
import { differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { users, fetchUsers } = useUsersStore();
  const { plans, fetchPlans } = usePlansStore();
  const { subscriptions, fetchSubscriptions } = useSubscriptionsStore();

  useEffect(() => {
    fetchUsers();
    fetchPlans();
    fetchSubscriptions();
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "ACTIVO").length;
  const inactiveUsers = users.filter((u) => u.status === "INACTIVO").length;
  const activeSubs = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const cancelledSubs = subscriptions.filter(
    (s) => s.status === "CANCELLED",
  ).length;
  const expiredSubs = subscriptions.filter(
    (s) => s.status === "EXPIRED",
  ).length;
  const expiringSoon = subscriptions.filter((s) => {
    const days = differenceInDays(new Date(s.endDate), new Date());
    return days >= 0 && days <= 7 && s.status === "ACTIVE";
  }).length;

  const subsStatusData = [
    { name: "Activas", value: activeSubs, fill: "#84cc16" },
    { name: "Canceladas", value: cancelledSubs, fill: "#f59e0b" },
    { name: "Expiradas", value: expiredSubs, fill: "#ef4444" },
  ];

  const usersStatusData = [
    { name: "Activos", value: activeUsers, fill: "#84cc16" },
    { name: "Inactivos", value: inactiveUsers, fill: "#ef4444" },
  ];

  const subsByPlan = plans.map((plan) => ({
    name: plan.name,
    value: subscriptions.filter((s) => s.plan.id === plan.id).length,
    fill: "#84cc16",
  }));

  const recentSubs = [...subscriptions]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    )
    .slice(0, 5);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: "bg-green-100 text-green-800",
      CANCELLED: "bg-yellow-100 text-yellow-800",
      EXPIRED: "bg-red-100 text-red-800",
    };
    const labels: Record<string, string> = {
      ACTIVE: "Activa",
      CANCELLED: "Cancelada",
      EXPIRED: "Expirada",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  const chartConfig = {
    value: { label: "Total" },
  };

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Resumen general de Stamina
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Socios totales</p>
          <p className="text-2xl font-medium mt-1">{totalUsers}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Socios activos</p>
          <p className="text-2xl font-medium mt-1 text-green-500">
            {activeUsers}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Suscripciones activas</p>
          <p className="text-2xl font-medium mt-1 text-green-500">
            {activeSubs}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Por vencer (7d)</p>
          <p className="text-2xl font-medium mt-1 text-yellow-500">
            {expiringSoon}
          </p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Planes disponibles</p>
          <p className="text-2xl font-medium mt-1">{plans.length}</p>
        </div>
      </div>

      {/* Gráficos fila 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Estado de suscripciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-3 text-xs text-muted-foreground">
              {subsStatusData.map((entry) => (
                <span key={entry.name} className="flex items-center gap-1">
                  <span
                    className="w-2.5 h-2.5 rounded-sm inline-block"
                    style={{ background: entry.fill }}
                  />
                  {entry.name} ({entry.value})
                </span>
              ))}
            </div>
            <ChartContainer config={chartConfig} className="h-50 w-full">
              <PieChart>
                <Pie
                  data={subsStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                >
                  {subsStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Socios por estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-50 w-full">
              <BarChart data={usersStatusData} barSize={48}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {usersStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico suscripciones por plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Suscripciones por plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={subsByPlan} barSize={40}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#84cc16" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Suscripciones recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Suscripciones recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSubs.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center text-xs font-medium shrink-0">
                    {getInitials(sub.user.firstName, sub.user.lastName)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {sub.user.firstName} {sub.user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {sub.plan.name}
                    </p>
                  </div>
                </div>
                {getStatusBadge(sub.status)}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Dashboard;
