import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddImageModal from "./AddImageModal";
import { MdEdit } from "react-icons/md";

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
  const { user, updatedProfileData, updateProfileImage } = useAuth();
  const [isLoading, setIsLoading] = useState<{
    profile: boolean;
    data: boolean;
  }>({
    profile: false,
    data: false,
  });
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
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
    setIsLoading((prev) => ({
      ...prev,
      data: true,
    }));
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
      setIsLoading((prev) => ({
        ...prev,
        data: false,
      }));
    }
  };
  const handleOpenAddProfile = () => {
    setToggleModal(true);
  };

  const handleImageUpload = async (file: File) => {
    setIsLoading((prev) => ({
      ...prev,
      profile: true,
    }));
    try {
      const res = await updateProfileImage(file);
      toast.success(res.data.message);
    } catch (error: any) {
      console.error("Error updating profile image:", error);
      toast.error(error);
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        profile: false,
      }));
    }
  };

  if (isLoading.profile) {
    toast.loading("uploading profile");
  }
  console.log(user?.image, "image");
  return (
    <>
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
          <div className="flex flex-col items-center mt-6 mb-6">
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleOpenAddProfile}
            >
              <Avatar className="h-28 w-28 cursor-pointer">
                <AvatarImage
                  src={user?.image || ""}
                  alt={user?.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl select-none uppercase dark:bg-primary/20 bg-primary/5 border border-primary text-title">
                  {user?.name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>

              {/* Pencil edit icon */}
              {isHovered && (
                <div className="absolute bottom-1 right-1 bg-background p-1.5 rounded-full shadow-md cursor-pointer border">
                  <MdEdit className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
          </div>

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
                disabled={isLoading.data || !isDirty}
              >
                {isLoading.data ? (
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
      <AddImageModal
        open={toggleModal}
        onOpenChange={setToggleModal}
        onImageUpload={handleImageUpload}
      />
    </>
  );
};

export default ProfileSheet;
