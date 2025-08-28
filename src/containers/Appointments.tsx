import useFetchData from "@/hooks/useFetchData";
import ErrorBlock from "@/components/ErrorBlock";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import formatDate from "@/lib/formatDate";
import { AppointmentStatusVariant } from "@/lib/statusVariants";
import { formatCamelCase } from "@/lib/formatCamelCase";

const AppointmentSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-5 w-40 mb-2" />
      <Skeleton className="h-4 w-24" />
    </CardHeader>
    <CardContent className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-28" />
    </CardContent>
  </Card>
);

const Appointments = () => {
  const { data, isLoading, isError } = useFetchData("/data/your-appointment");

  return (
    <div className="mt-24 mb-10 max-w-6xl mx-auto p-3">
      <h1 className="text-xl md:text-3xl text-primary text-center mb-5">
        Your Appointments
      </h1>

      {isLoading ? (
        [...Array(6)].map((_, idx) => <AppointmentSkeleton key={idx} />)
      ) : isError ? (
        <ErrorBlock error={"Something went wrong"} />
      ) : data && data.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((appointment: any, idx: number) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex items-center space-x-3">
                <Avatar className="h-11 w-11 cursor-pointer">
                  <AvatarImage
                    src={appointment.doctor.image || ""}
                    alt={appointment.doctor.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-3xl select-none uppercase dark:bg-primary/20 bg-primary/5 border border-primary text-title">
                    {appointment.doctor?.name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{appointment.doctor.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {appointment.doctor.email}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <div className="grid grid-cols-2 w-full">
                  <p className="flex flex-col">
                    <span className="text-muted-foreground">Speciality: </span>
                    {formatCamelCase(appointment.doctor.speciality)}
                  </p>
                  <p className="flex flex-col">
                    <span className="text-muted-foreground">Date: </span>
                    {formatDate(appointment.date)}
                  </p>
                </div>

                <div className="grid grid-cols-2 w-full mt-5">
                  <p className="flex flex-col">
                    <span className="text-muted-foreground">Time: </span>
                    {appointment.startTime}
                  </p>
                  <p className="flex flex-col">
                    <span className="text-muted-foreground">Status: </span>
                    <Badge
                      variant={AppointmentStatusVariant(appointment.status)}
                      className="capitalize"
                    >
                      {appointment.status?.toLowerCase()}
                    </Badge>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-primary">
          No appointments found.
        </div>
      )}
    </div>
  );
};

export default Appointments;
