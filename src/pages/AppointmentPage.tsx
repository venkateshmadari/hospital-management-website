import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import InlineLoader from "@/components/loaders/InlineLoader";
import ErrorBlock from "@/components/ErrorBlock";
import toast from "react-hot-toast";

type AppointmentInputs = {
  speciality: string;
  doctor: string;
};

type DoctorDataTypes = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type SlotType = {
  time: string;
  available: boolean;
};

type DoctorTimeSlots = {
  date: string;
  day: string;
  slots: SlotType[];
};

type SelectedSlot = {
  date: string;
  time: string;
};

interface AppointmentPageProps {
  handleSubmit: (data: {
    doctorId: string;
    date: string;
    startTime: string;
  }) => void;
  appointmentLoading: boolean;
  appointmentError: string | null;
}

const AppointmentPage = ({
  handleSubmit: onSubmitAppointment,
  appointmentLoading,
  appointmentError,
}: AppointmentPageProps) => {
  const specialities = [
    { value: "generalPhysician", label: "General Physician" },
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedics", label: "Orthopedics" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "gynecology", label: "Gynecology" },
    { value: "oncology", label: "Oncology" },
    { value: "gastroenterology", label: "Gastroenterology" },
    { value: "urology", label: "Urology" },
    { value: "pulmonology", label: "Pulmonology" },
    { value: "nephrology", label: "Nephrology" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<AppointmentInputs>();

  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedDoctorData, setSelectedDoctorData] =
    useState<DoctorDataTypes | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const selectedSpeciality = watch("speciality");
  const selectedDoctor = watch("doctor");

  // Reset doctor and time slots when speciality changes
  useEffect(() => {
    if (selectedSpeciality) {
      resetField("doctor");
      setSelectedDoctorData(null);
      setSelectedSlot(null);
    }
  }, [selectedSpeciality, resetField]);

  const apiUrl = selectedSpeciality
    ? `/data/speciality?speciality=${selectedSpeciality}`
    : undefined;
  const getDoctorSlots = selectedDoctor
    ? `/data/timeslot/${selectedDoctor}`
    : undefined;

  const {
    data: doctorData,
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useFetchData(apiUrl);

  const {
    data: doctorTimeSlots,
    isLoading: slotsLoading,
    isError: slotsError,
  } = useFetchData(getDoctorSlots);

  const onSubmit = (data: AppointmentInputs) => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }

    onSubmitAppointment({
      doctorId: data.doctor,
      date: selectedSlot.date,
      startTime: selectedSlot.time,
    });
  };

  const handleSlotSelection = (date: string, time: string) => {
    setSelectedSlot({ date, time });
  };

  const scrollTabs = (direction: "left" | "right") => {
    if (!tabsRef.current) return;

    const scrollAmount = 200;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    tabsRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const handleDoctorChange = (doctorId: string) => {
    setValue("doctor", doctorId, { shouldValidate: true });

    // Find and store the selected doctor's data
    const doctor = doctorData?.find(
      (doc: DoctorDataTypes) => doc.id === doctorId
    );
    setSelectedDoctorData(doctor || null);
    setSelectedSlot(null);
  };

  // Animation variants with proper TypeScript typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const slideInVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="flex items-center justify-center mt-28 flex-col mb-10 min-h-[78vh] p-3">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl lg:text-3xl font-medium text-center leading-tight"
          >
            Book your appointment here!
          </motion.h1>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
            {/* Speciality Selection */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-2 w-full"
            >
              <motion.div variants={itemVariants}>
                <Label htmlFor="speciality" className="text-primary">
                  Choose your speciality
                </Label>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Select
                  onValueChange={(value) =>
                    setValue("speciality", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="cursor-pointer w-full">
                    <SelectValue placeholder="Select your speciality" />
                  </SelectTrigger>
                  <SelectContent className="w-full cursor-pointer max-h-[200px] overflow-y-auto scrollbar-hide">
                    {specialities.map(({ value, label }) => (
                      <SelectItem
                        key={value}
                        value={value}
                        className="w-full cursor-pointer "
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.speciality && (
                  <p className="text-sm text-red-500">
                    {errors.speciality.message}
                  </p>
                )}
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {selectedSpeciality && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideInVariants}
                  className="space-y-2 w-full"
                >
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="doctor" className="text-primary">
                      Choose your doctor
                    </Label>
                  </motion.div>
                  {doctorsLoading ? (
                    <motion.div variants={itemVariants} className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </motion.div>
                  ) : doctorsError ? (
                    <motion.div
                      variants={itemVariants}
                      className="p-3 bg-red-50 border border-red-200 rounded-md"
                    >
                      <p className="text-sm text-red-600">
                        Failed to load doctors. Please try again.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div variants={itemVariants}>
                      <Select
                        onValueChange={handleDoctorChange}
                        value={selectedDoctor}
                      >
                        <SelectTrigger className="cursor-pointer w-full">
                          {selectedDoctorData ? (
                            <div className="inline-flex gap-2 p-1 rounded-lg cursor-pointer items-center">
                              {selectedDoctorData?.image ? (
                                <img
                                  src={selectedDoctorData?.image}
                                  alt={selectedDoctorData?.name}
                                  className="h-7 w-7 rounded-full object-cover"
                                />
                              ) : (
                                <div className="h-7 w-7 rounded-full bg-primary/15 text-primary uppercase flex items-center justify-center text-xs">
                                  {selectedDoctorData?.name?.slice(0, 1)}
                                </div>
                              )}
                              <div>
                                <h1 className="text-sm capitalize">
                                  {selectedDoctorData.name}
                                </h1>
                              </div>
                            </div>
                          ) : (
                            <SelectValue placeholder="Select your doctor" />
                          )}
                        </SelectTrigger>
                        <SelectContent className="w-full cursor-pointer">
                          {doctorData?.length > 0 ? (
                            doctorData?.map((doctor: DoctorDataTypes) => (
                              <SelectItem
                                key={doctor.id}
                                value={doctor.id}
                                className="w-full cursor-pointer"
                              >
                                <div className="inline-flex gap-2 p-2 rounded-lg cursor-pointer">
                                  {doctor?.image ? (
                                    <img
                                      src={doctor?.image}
                                      alt={doctor?.name}
                                      className="h-9 w-9 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="h-9 w-9 rounded-full bg-primary/15 text-primary uppercase flex items-center justify-center">
                                      {doctor?.name?.slice(0, 1)}
                                    </div>
                                  )}
                                  <div className="hidden md:block">
                                    <h1 className="text-sm capitalize">
                                      {doctor.name}
                                    </h1>
                                    <p className="text-xs md:text-muted-foreground text-gray-600">
                                      {doctor.email}
                                    </p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <p className="py-5 text-sm text-center text-primary">
                              No doctors in {selectedSpeciality}
                            </p>
                          )}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                  {errors.doctor && (
                    <p className="text-sm text-red-500">
                      {errors.doctor.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Time Slots - Only show if doctor is selected */}
            <AnimatePresence>
              {selectedDoctor && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideInVariants}
                  className="space-y-4 w-full"
                >
                  <motion.div
                    variants={itemVariants}
                    className="relative -mb-3"
                  >
                    <div className="flex items-center justify-between">
                      <Label className="text-primary">Select a date</Label>
                      <div className="inline-flex gap-2 items-center">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="cursor-pointer rounded-full  z-10 bg-background"
                          onClick={() => scrollTabs("left")}
                          disabled={scrollPosition === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="cursor-pointer rounded-full  z-10 bg-background"
                          onClick={() => scrollTabs("right")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>

                  {slotsLoading ? (
                    <motion.div
                      variants={containerVariants}
                      className="space-y-4"
                    >
                      <Skeleton className="h-10 w-full" />
                      <div className="grid grid-cols-3 gap-2">
                        {[...Array(6)].map((_, i) => (
                          <Skeleton key={i} className="h-10 rounded-md" />
                        ))}
                      </div>
                    </motion.div>
                  ) : slotsError ? (
                    <motion.div
                      variants={itemVariants}
                      className="p-3 bg-red-50 border border-red-200 rounded-md"
                    >
                      <p className="text-sm text-red-600">
                        Failed to load time slots. Please try again.
                      </p>
                    </motion.div>
                  ) : doctorTimeSlots?.length > 0 ? (
                    <motion.div variants={containerVariants}>
                      <Tabs
                        defaultValue={doctorTimeSlots[0]?.date}
                        className="w-full"
                      >
                        <div>
                          <div
                            ref={tabsRef}
                            className="overflow-x-auto scrollbar-hide"
                          >
                            <TabsList className="mb-4 flex w-max px-1 h-14">
                              {doctorTimeSlots.map(
                                (timeslot: DoctorTimeSlots) => (
                                  <TabsTrigger
                                    key={timeslot.date}
                                    value={timeslot.date}
                                    className="flex flex-col select-none px-3 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
                                  >
                                    {timeslot.date}
                                    <span className="text-xs data-[state=inactive]:text-primary-foreground select-none">
                                      {timeslot.day}
                                    </span>
                                  </TabsTrigger>
                                )
                              )}
                            </TabsList>
                          </div>
                        </div>

                        {doctorTimeSlots.map(
                          (timeslot: DoctorTimeSlots, index: number) => (
                            <TabsContent
                              key={timeslot.date}
                              value={timeslot.date}
                              className="space-y-3"
                            >
                              <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="font-medium text-primary select-none"
                              >
                                Select time slot
                              </motion.h1>
                              {timeslot.slots?.length > 0 ? (
                                <motion.div
                                  className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[250px] overflow-y-auto scrollbar-hide"
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                >
                                  {timeslot.slots.map((slot, slotIndex) => (
                                    <motion.div
                                      key={slotIndex}
                                      variants={itemVariants}
                                      transition={{ delay: slotIndex * 0.05 }}
                                    >
                                      <Button
                                        type="button"
                                        variant={
                                          selectedSlot?.date ===
                                            timeslot.date &&
                                          selectedSlot?.time === slot.time
                                            ? "default"
                                            : "outline"
                                        }
                                        className={`h-10 rounded-md cursor-pointer select-none w-full ${
                                          selectedSlot?.date ===
                                            timeslot.date &&
                                          selectedSlot?.time === slot.time
                                            ? "bg-primary/15 border border-primary text-primary hover:text-white "
                                            : ""
                                        }`}
                                        disabled={!slot.available}
                                        onClick={() =>
                                          handleSlotSelection(
                                            timeslot.date,
                                            slot.time
                                          )
                                        }
                                      >
                                        {slot.time}
                                      </Button>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              ) : (
                                <p className="text-center min-h-[200px] flex items-center justify-center">
                                  No time slots available on this day
                                </p>
                              )}
                            </TabsContent>
                          )
                        )}
                      </Tabs>
                    </motion.div>
                  ) : (
                    <motion.div
                      variants={itemVariants}
                      className="p-3 bg-muted rounded-md text-center"
                    >
                      <p className="text-sm text-muted-foreground">
                        No time slots available for this doctor.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {appointmentError && <ErrorBlock error={appointmentError} />}

            <AnimatePresence>
              {selectedDoctor && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    type="submit"
                    className="w-full cursor-pointer py-3 select-none"
                    disabled={appointmentLoading || !selectedSlot}
                  >
                    {appointmentLoading ? <InlineLoader /> : "Book appointment"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentPage;
