import AttendanceSkeleton from "@/components/attendances/AttendanceSkeleton";
import TableAttendance from "@/components/attendances/TableAttendance";
import { useAttendancesStore } from "@/store/attendances.store";
import { isThisMonth, isThisWeek, isToday } from "date-fns";
import { useEffect } from "react";

const Attendance = () => {
  const { attendances, loading, fetchAttendances } = useAttendancesStore();

  useEffect(() => {
    fetchAttendances();
  }, []);

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

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Historial de asistencias</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Registro de entradas al gimnasio
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total asistencias</p>
          <p className="text-2xl font-medium mt-1">{total}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Hoy</p>
          <p className="text-2xl font-medium mt-1 text-green-500">{today}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Esta semana</p>
          <p className="text-2xl font-medium mt-1">{thisWeek}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Este mes</p>
          <p className="text-2xl font-medium mt-1">{thisMonth}</p>
        </div>
      </div>

      {/* Tabla */}
      {loading ? <AttendanceSkeleton /> : <TableAttendance />}
    </section>
  );
};

export default Attendance;
