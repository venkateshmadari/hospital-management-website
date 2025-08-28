import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AppointmentSucessfullModal = ({ open, onOpenChange }: any) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader className="flex items-center justify-center">
          <div className="h-18 w-18 rounded-full bg-green-50 flex items-center justify-center">
            <IoMdCheckmarkCircleOutline className="text-green-500 h-10 w-10" />
          </div>
          <AlertDialogTitle className="text-green-500">
            Appointment booked successfully
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <p className="text-black py-1">Note :</p>
            It will be confirmed once the doctor accepts your appointment.
            You'll receive an email notification when it's confirmed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="w-full">
          <AlertDialogAction className="cursor-pointer py-4 w-full bg-green-500 hover:bg-green-600">
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppointmentSucessfullModal;
