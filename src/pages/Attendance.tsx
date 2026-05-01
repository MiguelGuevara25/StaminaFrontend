import { useEffect } from "react";

import { useAttendancesStore } from "@/store/attendances.store";
import { isThisMonth, isThisWeek, isToday } from "date-fns";

import TableAttendanceSkeleton from "@/components/attendances/TableAttendanceSkeleton";
import TableAttendance from "@/components/attendances/TableAttendance";
import Title from "@/shared/Title";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

const Attendance = () => {
  const { attendances, loading, fetchAttendances } = useAttendancesStore();

  useEffect(() => {
    fetchAttendances();
  }, [fetchAttendances]);

  const total = attendances.length;

  const today = attendances.filter((a) =>
    isToday(new Date(a.entryDate)),
  ).length;

  const thisWeek = attendances.filter((a) =>
    isThisWeek(new Date(a.entryDate)),
  ).length;

  const thisMonth = attendances.filter((a) =>
    isThisMonth(new Date(a.entryDate)),
  ).length;

  const metrics = [
    { label: "Total asistencias", value: total },
    { label: "Hoy", value: today, className: "text-green-500" },
    { label: "Esta semana", value: thisWeek },
    { label: "Este mes", value: thisMonth },
  ];

  return (
    <section className="p-6 space-y-6">
      <Title
        title="Historial de asistencias"
        subtitle="Registro de entradas al gimnasio"
      />

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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

      {/* Tabla */}
      {loading ? <TableAttendanceSkeleton /> : <TableAttendance />}
    </section>
  );
};

export default Attendance;
