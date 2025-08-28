import AppointmentSucessfullModal from "@/components/modals/AppointmentSucessfullModal";
import { useAuth } from "@/context/AuthContext";
import axiosInstance from "@/instance/instance";
import AppointmentPage from "@/pages/AppointmentPage";
import { useState } from "react";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const { user } = useAuth();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [resetFormTrigger, setResetFormTrigger] = useState<number>(0);

  const handleBookAppointment = async (appointmentData: {
    doctorId: string;
    date: string;
    startTime: string;
  }) => {
    setLoading(true);
    setIsError(null);
    try {
      const response = await axiosInstance.post("/data/book-appointment", {
        patientId: user?.id,
        doctorId: appointmentData.doctorId,
        date: new Date(appointmentData.date).toISOString(),
        startTime: appointmentData.startTime,
      });

      if (response?.status === 201) {
        toast.success(response?.data?.message);
        setToggleModal(true);
        setResetFormTrigger(Date.now());
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;
      setIsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppointmentPage
        handleSubmit={handleBookAppointment}
        appointmentLoading={loading}
        appointmentError={isError}
        resetFormTrigger={resetFormTrigger}
      />
      <AppointmentSucessfullModal
        open={toggleModal}
        onOpenChange={setToggleModal}
      />
    </>
  );
};

export default BookAppointment;
