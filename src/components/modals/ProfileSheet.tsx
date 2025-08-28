import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorBlock from "../ErrorBlock";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

const ProfileSheet = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) => {
  const { user, updatedProfileData } = useAuth();
  console.log(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  useEffect(() => {
    if (user && open) {
      reset({
        name: user?.name || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
      });
    }
  }, [user, open, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response: any = await updatedProfileData({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });
      if (response?.status === 200) {
        toast.success(response?.data?.data || "Updated successfully");
        onOpenChange(false);
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Update failed";
      setIsError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="font-medium lg:text-xl">
            User Information
          </SheetTitle>
          <SheetDescription>Edit your personal information</SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <div className="grid gap-4 p-4">
            <div>
              <Label htmlFor="name" className="text-muted-foreground mb-2">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter first name"
                className="w-full"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Name cannot exceed 50 characters",
                  },
                  pattern: {
                    value: /^[A-Za-z\s-]+$/,
                    message:
                      "First name can only contain letters, spaces, or hyphens",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-muted-foreground mb-2"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="number"
                placeholder="Enter 10-digit phone number"
                className="w-full"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Phone number must be exactly 10 digits",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be exactly 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be exactly 10 digits",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Read-only fields */}
            <div>
              <Label htmlFor="email" className="text-muted-foreground mb-2">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="w-full bg-muted"
                readOnly
                {...register("email")}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>
          </div>
          {isError && <ErrorBlock error={isError} />}
          <SheetFooter className="p-4 border-t mt-auto">
            <Button
              type="submit"
              className="cursor-pointer inline-flex items-center py-4"
              disabled={isLoading || !isDirty}
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
            <SheetClose asChild>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer py-4"
              >
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
