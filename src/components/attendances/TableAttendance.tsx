import { useAttendancesStore } from "@/store/attendances.store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const TableAttendance = () => {
  const { attendances } = useAttendancesStore();

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-muted-foreground">Socio</TableHead>
          <TableHead className="text-muted-foreground">Fecha</TableHead>
          <TableHead className="text-muted-foreground">Hora</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendances.map((attendance) => (
          <TableRow key={attendance.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-lime-100 text-lime-800 flex items-center justify-center text-xs font-medium shrink-0">
                  {getInitials(
                    attendance.user.firstName,
                    attendance.user.lastName,
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {attendance.user.firstName} {attendance.user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {attendance.user.dni}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {format(new Date(attendance.entryDate), "dd/MM/yyyy", {
                locale: es,
              })}
            </TableCell>
            <TableCell>
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
                {format(new Date(attendance.entryDate), "HH:mm", {
                  locale: es,
                })}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableAttendance;
